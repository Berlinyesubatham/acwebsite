import "../styles/Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <img src="/nature.png" alt="" className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge fade-up">
          Available 24/7 Emergency Service
        </div>
        <h1 className="fade-up delay-1">
          Expert Repair for
          AC, Fridge & Washing Machine &amp; <br />
          <span>Installation Services</span>
        </h1>
        <p className="fade-up delay-2">
          Professional air conditioning repair, installation, and maintenance.
          Fast response times, certified technicians, and guaranteed satisfaction
          for all your cooling needs.
        </p>
        <div className="hero-actions fade-up delay-3">
          <a href="#book" className="btn-primary">📅 Book a Service</a>
          <a href="tel:+919629535900" className="btn-outline">📞 Call Now</a>
        </div>
      </div>

      <div className="hero-quote">
        <br></br>
        <p> "Cool as the mountain air, reliable as the rising sun."</p>
      </div>
    </section>
  );
}