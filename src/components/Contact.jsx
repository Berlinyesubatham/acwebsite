import "../styles/Contact.css";
import { FaWhatsapp } from "react-icons/fa";

const hours = [
  { day: "Monday – Friday", time: "10:00 AM – 7:00 PM", open: true },
  { day: "Saturday",        time: "10:00 AM – 7:00 PM", open: true },
  { day: "Sunday",          time: "10:00 AM – 12:00 PM", open: true },
  { day: "Emergency",       time: "24 / 7",             open: true },
];

export default function Contact() {
  return (
    <section className="section reveal" id="contact">
      <div className="contact-grid">
        {/* Left: Contact Info */}
        <div className="contact-info">
          <p className="section-tag">Contact Us</p>
          <h2>Get in Touch</h2>
          <p>
            Have a question or need urgent help? Call us, WhatsApp us, or
            drop by our office. We're always happy to assist.
          </p>
          <div className="contact-items">
            <div className="contact-item">
              <div className="c-icon">📞</div>
              <div>
                <div className="c-label">Phone</div>
                <div className="c-value">
                  <a href="tel:+919629535900">+91 96295 35900 </a>
                </div>
              </div>
            </div>
         <div className="contact-item">
  <div className="c-icon">
    <FaWhatsapp />
  </div>
  <div>
    <div className="c-label">WhatsApp</div>
    <div className="c-value">
      <a
        href="https://wa.me/919629535900"
        target="_blank"
        rel="noreferrer"
      >
        +91 96295 35900
      </a>
    </div>
  </div>
</div>
            <div className="contact-item">
              <div className="c-icon">✉️</div>
              <div>
                <div className="c-label">Email</div>
                <div className="c-value">
                  <a href="mailto:tajmahalacservices@gmail.com">tajmahalacservices@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="contact-item">
              <div className="c-icon">📍</div>
              <div>
                <div className="c-label">Address</div>
                <div className="c-value">39 mpg 5th North street,Pettai – 627004</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Business Hours */}
        <div className="hours-grid">
          <h4>🕐 Business Hours</h4>
          {hours.map((h, i) => (
            <div className="hours-row" key={i}>
              <span className="hours-day">{h.day}</span>
              <span className={`hours-time ${h.open ? "open" : "closed"}`}>{h.time}</span>
            </div>
          ))}
          <div style={{ marginTop: "24px" }}>
            <a href="#book" className="btn-primary" style={{ display: "flex", justifyContent: "center" }}>
              📅 Book a Service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
