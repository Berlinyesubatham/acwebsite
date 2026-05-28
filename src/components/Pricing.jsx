import "../styles/Pricing.css";
const plans = [
  {
    icon: "/basic.jpg",
    title: "Basic Service",
    from: "Starting from",
    amount: "₹500",
    note: "Per unit · One-time visit",
    featured: false,
    items: [
      "Filter cleaning",
      "Pressure check",
      "Performance test",
      "Basic diagnosis",
      "Service report",
    ],
  },
  {
    icon: "cln.jpg",
    title: "Deep Clean + Gas",
    from: "Starting from",
    amount: "₹1,200",
    note: "Per unit · Most Popular",
    featured: true,
    items: [
      "Full deep cleaning",
      "Gas top-up (R22/R32)",
      "Leak detection",
      "Electrical check",
      
    ],
  },
  {
    icon: "/full.jpg",
    title: "Full service",
    from: "Starting from",
    amount: "₹2,200",
    note: "Per unit · Annual",
    featured: false,
    items: [
      "2 free services/year",
      "Priority scheduling",
      "10% off repairs",
      "Form wash cleaning",
      
    ],
  },
];



export default function Pricing() {
  return (
    <section className="section reveal" id="pricing">
      <div className="section-header">
        <span className="section-tag">Pricing</span>
        <h2 className="section-title">Transparent Pricing</h2>
        <p className="section-subtitle">
          No hidden charges. What you see is what you pay.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <div className={`price-card ${p.featured ? "featured" : ""}`} key={i}>
            {p.featured && <div className="featured-label">POPULAR</div>}
            {/* <span className="price-icon">{p.icon}</span> */}
                 <div className="price-icon">
              <img
                src={p.icon}
                alt={p.title}
                className="pricing-image"
              />
            </div>
            <h3>{p.title}</h3>
            <div className="price-from">{p.from}</div>
            <div className="price-amount">{p.amount}</div>
            <div className="price-note">{p.note}</div>
            <ul className="price-list">
              {p.items.map((item, j) => (
                <li key={j}><span>✓</span> {item}</li>
              ))}
            </ul>
            <a href="#book" className="btn-primary" style={{ display: "flex", justifyContent: "center" }}>
              Book This Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
