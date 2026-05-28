import "../styles/Services.css";
const services = [
  {
     icon: "/acinstall.jpeg",

    title: "AC Repair & Diagnosis",
    desc: "Fast and accurate diagnosis of all AC problems. Our technicians fix cooling issues, compressor faults, electrical problems, and more with genuine parts.",
    tags: ["All Brands", "Same Day"],
  },
  {
       icon: "/ac.jpg",
    title: "AC Installation",
    desc: "Professional installation of split, window, and cassette ACs. We ensure perfect placement, tight connections, and optimal performance from day one.",
    tags: ["Split AC", "Window AC", "Cassette"],
  },
  {
    icon: "/washing.jpg",
    title: "Deep Cleaning & Service",
    desc: "Thorough cleaning of filters, coils, drain pipes, and blower fan. Improve air quality and efficiency with our professional deep-clean service.",
    tags: ["Filter Clean", "Coil Wash", "Gas Check"],
  },
  {
    icon: "/gas.jpg",
    title: "Gas Refilling (Regas)",
    desc: "Low cooling? We check for leaks, repair them, and refill with the correct refrigerant gas — R22, R32, or R410A — to restore full cooling power.",
    tags: ["R22", "R32", "R410A"],
  },
  {
    icon: "/hvac.jpg",
    title: "Commercial HVAC",
    desc: "Complete HVAC solutions for offices, shops, hospitals, and factories. Annual maintenance contracts available for businesses with multiple units.",
    tags: ["AMC", "Central AC", "Industrial"],
  },
 
];

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-header reveal">
        <span className="section-tag">What We Do</span>
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Complete air conditioning solutions — from repair to installation — for homes and businesses.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <div className="service-card reveal" key={i}>
{s.icon.startsWith("/") 
  ? <img src={s.icon} alt={s.title} className="service-icon-img" /> 
  : <span className="service-icon">{s.icon}</span>
}
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((t, j) => (
                <span className="tag" key={j}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
