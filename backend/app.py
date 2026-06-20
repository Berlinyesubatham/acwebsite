import pymysql
pymysql.install_as_MySQLdb()

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from dotenv import load_dotenv
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests

# Load .env variables
load_dotenv()

# Flask app
app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://www.tajmahalacservices.in",
            "https://acwebsite-vk5m.vercel.app"
        ]
    }
})

# Database URL
database_url = os.getenv("DATABASE_URL").strip()

# Database Config
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db = SQLAlchemy(app)

# Booking Model
class Booking(db.Model):
    __tablename__ = "booking"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120))
    service = db.Column(db.String(50), nullable=False)
    acBrand = db.Column(db.String(50))
    date = db.Column(db.Date, nullable=False)
    message = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "service": self.service,
            "acBrand": self.acBrand,
            "date": self.date.strftime("%Y-%m-%d") if self.date else "",
            "message": self.message,
            "status": self.status
        }

# Create tables
with app.app_context():
    try:
        db.create_all()
        print("✅ Tables created successfully!")
    except Exception as e:
        print("❌ Error creating tables:", e)

# ========== EMAIL & WHATSAPP FUNCTIONS ==========

def send_email(booking_details):
    """Send booking notification email to ADMIN via Resend"""
    try:
        api_key = os.getenv("RESEND_API_KEY")
        admin_email = os.getenv("ADMIN_EMAIL")

        if not api_key or not admin_email:
            print("⚠️ Resend API key or admin email not configured")
            return False

        subject = f"🔔 New Booking - {booking_details['service']} (ID: {booking_details['id']})"

        html_body = f"""
        <html>
        <body>
        <h2>🔔 New Booking Received!</h2>
        <p><b>Booking ID:</b> {booking_details['id']}</p>
        <p><b>Name:</b> {booking_details['name']}</p>
        <p><b>Phone:</b> {booking_details['phone']}</p>
        <p><b>Email:</b> {booking_details['email']}</p>
        <p><b>Service:</b> {booking_details['service']}</p>
        <p><b>AC Brand:</b> {booking_details['acBrand']}</p>
        <p><b>Date:</b> {booking_details['date']}</p>
        <p><b>Message:</b> {booking_details['message']}</p>
        </body>
        </html>
        """

        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "from": "bookings@tajmahalacservices.in",
                "to": [admin_email],
                "subject": subject,
                "html": html_body
            }
        )

        if response.status_code == 200:
            print(f"✅ Admin email sent to {admin_email}")
            return True
        else:
            print(f"❌ Resend error: {response.status_code} - {response.text}")
            return False

    except Exception as e:
        print(f"❌ Email error: {e}")
        return False
def send_whatsapp(booking_details):
    """Send booking notification WhatsApp to ADMIN"""
    try:
        admin_phone = os.getenv("ADMIN_WHATSAPP_NUMBER")
        
        if not admin_phone:
            print("⚠️ Admin WhatsApp number not configured")
            return False
        
        # Format phone number
        if not admin_phone.startswith("+"):
            admin_phone = "+91" + admin_phone.lstrip("0")
        
        message_body = f"""
🔔 NEW BOOKING ALERT!

👤 Name: {booking_details['name']}
📞 Phone: {booking_details['phone']}
📧 Email: {booking_details['email'] or 'Not provided'}
🔧 Service: {booking_details['service']}
🏢 Brand: {booking_details['acBrand'] or 'Not specified'}
📅 Date: {booking_details['date']}
📝 Notes: {booking_details['message'] or 'None'}

📍 Booking ID: {booking_details['id']}

⚡ ACTION: Call customer to confirm time slot ASAP!
        """.strip()
        
        # Check if TWILIO configured
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        from_number = os.getenv("TWILIO_WHATSAPP_NUMBER")
        
        if all([account_sid, auth_token, from_number]):
            url = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
            
            data = {
                "From": f"whatsapp:{from_number}",
                "To": f"whatsapp:{admin_phone}",
                "Body": message_body
            }
            
            response = requests.post(url, data=data, auth=(account_sid, auth_token))
            
            if response.status_code == 201:
                print(f"✅ Admin WhatsApp sent to {admin_phone}")
                return True
        
        print(f"ℹ️ WhatsApp API not configured - admin must check email")
        return False
    
    except Exception as e:
        print(f"⚠️ WhatsApp error: {e}")
        return False

# Health Check Route
@app.route('/api/health')
def health():
    return jsonify({"status": "ok"})

# Get All Bookings + Create Booking
@app.route('/api/bookings', methods=['GET', 'POST', 'OPTIONS'])
def bookings():

    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200


    if request.method == 'GET':
        try:
            all_bookings = Booking.query.order_by(Booking.id.desc()).all()
            return jsonify([b.to_dict() for b in all_bookings]), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500


    if request.method == 'POST':
        try:
            data = request.get_json()

            print("📤 DATA RECEIVED:", data)

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            if not data.get('name') or not data.get('phone'):
                return jsonify({"error": "Name and Phone required"}), 400


            date_obj = datetime.strptime(
                data['date'],
                '%Y-%m-%d'
            ).date()


            booking = Booking(
                name=data['name'],
                phone=data['phone'],
                email=data.get('email', ''),
                service=data.get('service', ''),
                acBrand=data.get('acBrand', ''),
                date=date_obj,
                message=data.get('message', '')
            )


            db.session.add(booking)
            db.session.commit()

            print("✅ BOOKING SAVED!")


            booking_dict = {
                "id": booking.id,
                "name": booking.name,
                "phone": booking.phone,
                "email": booking.email,
                "service": booking.service,
                "acBrand": booking.acBrand,
                "date": booking.date.strftime("%Y-%m-%d"),
                "message": booking.message
            }


            print("📧 STARTING EMAIL")
            try:
                email_sent = send_email(booking_dict)
            except Exception as e:
                print("Email skipped:", e)
                email_sent = False
            

            print("📧 EMAIL RESULT:", email_sent)

            whatsapp_sent = send_whatsapp(booking_dict)


            return jsonify({
                "success": True,
                "message": "Booking confirmed! We'll call you soon.",
                "bookingId": booking.id
            }), 201


        except Exception as e:
            print("❌ ERROR:", e)
            return jsonify({"error": str(e)}), 500
@app.route('/api/bookings/<int:id>', methods=['PATCH', 'DELETE', 'OPTIONS'])
def booking_detail(id):

    # Handle OPTIONS request
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200

    # PATCH update
    if request.method == 'PATCH':
        try:
            data = request.get_json()

            booking = Booking.query.get(id)

            if not booking:
                return jsonify({"error": "Not found"}), 404

            if 'status' in data:
                booking.status = data['status']

            db.session.commit()

            return jsonify({
                "success": True,
                "booking": booking.to_dict()
            }), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # DELETE booking
    if request.method == 'DELETE':
        try:
            booking = Booking.query.get(id)

            if not booking:
                return jsonify({"error": "Not found"}), 404

            db.session.delete(booking)
            db.session.commit()

            return jsonify({"success": True}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500


# Run App
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)