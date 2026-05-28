import "../styles/About.css";
const features = [
  "Certified & trained technicians",
  "All major AC brands serviced",
  "Genuine spare parts used",
  "Transparent pricing — no hidden costs",
  "Same-day service available",
  
];

export default function About() {
  return (
    <section className="section reveal" id="about">
      <div className="about-grid">
        {/* Image Side */}
        <div className="about-img-wrap">
          
  <img
    src="/client image.png"
    alt="Profile"
    className="about-img"
  />
          <div className="about-badge">
            <span className="num">10+</span>
            Years of<br />Excellence
          </div>
        </div>

        {/* Text Side */}
        <div className="about-text">
          <p className="section-tag">About Us</p>
          <h2>Tirunelveli's Most Trusted AC Service Provider</h2>
          <p>
            Since 2016, Tajmahal AC has been the go-to choice for residential and
            commercial air conditioning services in Tirunelveli and surrounding areas.
            We combine technical expertise with genuine customer care.
          </p>
          <p>
            Our team of certified technicians is equipped with the latest tools
            and genuine spare parts to ensure your AC runs at peak performance.
          </p>
          <ul className="feature-list">
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <a href="#book" className="btn-primary" style={{ display: "inline-flex" }}>
            📅 Book a Service Today
          </a>
        </div>
      </div>
    </section>
  );
}
