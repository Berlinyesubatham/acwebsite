import "../styles/Team.css";
const team = [
  {
    image: "/client image.png",
    name: "I. Satham Ussain",
    role: "Senior AC Technician",
    exp: "10+ years experience · Certified in R32 & R410A refrigerants",
    badges: ["Split AC", "VRF", "Inverter"],
  },
  {
    image: "/images/ussain.jpg",
    name: "Murugan S",
    role: "Installation Specialist",
    exp: "8+ years experience · Expert in commercial HVAC systems",
    badges: ["Commercial", "Cassette", "Duct AC"],
  },

];

export default function Team() {
  return (
    <section className="section reveal" id="team">
      <div className="section-header">
        <span className="section-tag">Our Team</span>
        <h2 className="section-title">Meet Our Technicians</h2>
        <p className="section-subtitle">
          Certified professionals committed to quality workmanship.
        </p>
      </div>
      <div className="tech-grid">
        {team.map((t, i) => (
          <div className="tech-card" key={i}>
           <div className="tech-img">
  <img
    src={t.image}
    alt={t.name}
    className="tech-photo"
  />
</div>
            <div className="tech-info">
              <h4>{t.name}</h4>
              <span className="tech-role">{t.role}</span>
              <p className="tech-exp">{t.exp}</p>
              <div className="tech-badges">
                {t.badges.map((b, j) => (
                  <span className="tag" key={j}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
