import { useState } from "react";
import "../styles/BookingForm.css";
import { submitBooking } from "../services/api";
import BookingPopup from "./BookingPopup";

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", service: "", acBrand: "", date: "", message: ""
  });
  const [showPopup, setShowPopup] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("🔥 clicked");

  try {
    console.log("📤 sending data:", form);

    const res = await submitBooking(form);

    console.log("✅ response:", res);

    setBookingData(res);
    setShowPopup(true);

    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      acBrand: "",
      date: "",
      message: ""
    });

  } catch (err) {
    console.log("❌ error:", err);
    alert("Booking failed: " + err.message);
  }
};

  return (
    <section className="book-section" id="book">
      <div className="book-inner">

        
        {showPopup && <BookingPopup onClose={() => setShowPopup(false)} bookingData={bookingData} />}

        <div className="section-header reveal">
          <span className="section-tag">Book a Service</span>
          <h2 className="section-title">Schedule Your Visit</h2>
          <p className="section-subtitle">
            Fill in the form below and we'll confirm your appointment within 30 minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="reveal">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input name="phone" value={form.phone} onChange={handleChange}
                placeholder="Enter your phone number" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Service Type *</label>
              <select name="service" value={form.service} onChange={handleChange} required>
                <option value="">Select a service</option>
                <option value="repair">AC Repair</option>
                <option value="installation">AC Installation</option>
                <option value="cleaning">Deep Cleaning</option>
                <option value="gas">Gas Refilling</option>
                <option value="amc">AMC Package</option>
                <option value="commercial">Commercial HVAC</option>
              </select>
            </div>
            <div className="form-group">
              <label>AC Brand</label>
              <select name="acBrand" value={form.acBrand} onChange={handleChange}>
                <option value="">Select brand</option>
                <option value="samsung">Samsung</option>
                <option value="lg">LG</option>
                <option value="daikin">Daikin</option>
                <option value="voltas">Voltas</option>
                <option value="hitachi">Hitachi</option>
                <option value="carrier">Carrier</option>
                <option value="other">All Brands</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Date *</label>
              <input name="date" type="date" value={form.date} onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} required />
            </div>
            <div className="form-group form-full">
              <label>Additional Notes</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Describe the issue or any special requirements..." />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            📅 Confirm Booking
          </button>
        </form>

      </div>
    </section>
  );
}
