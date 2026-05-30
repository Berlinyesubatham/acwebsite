import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-brand">
          <a href="#home" className="brand">
            <span className="brand-icon">❄️</span>
            Tajmahal Ac services
          
          </a>
          <p>
            Tirunelveli most trusted Tajmahal service provider since 2016.
            Certified technicians, genuine parts, and guaranteed satisfaction.
          </p>
          <div className="footer-social">
            <a href="#" className="social-btn" aria-label="Facebook">📘</a>
            <a href="#" className="social-btn" aria-label="Instagram">📸</a>
            <a href="https://wa.me/919629535900" className="social-btn" aria-label="WhatsApp">💬</a>
            <a href="#" className="social-btn" aria-label="YouTube">▶️</a>
          </div>
        </div>

        {/* Services Column */}
        <div className="footer-col">
          <h5>Services</h5>
          <ul className="footer-links">
            <li><a href="#services">AC Repair</a></li>
            <li><a href="#services">AC Installation</a></li>
            <li><a href="#services">Deep Cleaning</a></li>
            <li><a href="#services">Gas Refilling</a></li>
            <li><a href="#services">AMC Package</a></li>
            <li><a href="#services">Commercial HVAC</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-col">
          <h5>Company</h5>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col">
          <h5>Contact</h5>
          <ul className="footer-links">
            <li><a href="tel:+919629535900">📞 +91 96295 35900</a></li>
            <li><a href="https://wa.me/919629535900">💬 WhatsApp Us</a></li>
            <li><a href="mailto:info@cooltech.ac">✉️ tajmahalacservices@gmail.com</a></li>
            <li><a href="#contact">📍 Tirunelveli, TN</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2016 Tajmahal Ac Services. All rights reserved.</p>
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem" }}>Privacy Policy</a>
          <a href="#" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.82rem" }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
