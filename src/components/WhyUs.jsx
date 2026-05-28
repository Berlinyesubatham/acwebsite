import "../styles/WhyUs.css";
const reasons = [
  {
    icon: "⚡",
    title: "Fast Response Time",
    desc: "We respond within 30 minutes and reach your location within 2 hours of booking. Emergency calls handled even on holidays.",
  },
  {
    icon: "🏆",
    title: "Certified Technicians",
    desc: "All our technicians are factory-trained and certified. They carry ID cards and follow a professional code of conduct.",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "No hidden charges ever. We provide a detailed written quote before starting any work. You approve before we proceed.",
  },

  {
    icon: "🔩",
    title: "Genuine Spare Parts",
    desc: "We use only original manufacturer-approved spare parts. No cheap substitutes that break down after a week.",
  },
  {
    icon: "🌟",
    title: "5-Star Rated Service",
    desc: "Consistently rated 4.9/5 across Google, Justdial, and Sulekha with over 500 verified customer reviews.",
  },
];

export default function WhyUs() {
  return (
    <section className="section reveal" id="why">
      <div className="section-header">
        <span className="section-tag">Why Choose Us</span>
        <h2 className="section-title">The CoolTech Difference</h2>
        <p className="section-subtitle">
          We don't just fix ACs — we build long-term relationships built on trust.
        </p>
      </div>
      <div className="why-grid">
        {reasons.map((r, i) => (
          <div className="why-card" key={i}>
            <div className="why-icon">{r.icon}</div>
            <div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
