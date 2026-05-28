import "../styles/StatsBar.css";

const stats = [
  { num: "5000+", label: "Happy Customers" },
  { num: "10+",   label: "Years Experience" },
  { num: "24/7",  label: "Emergency Support" },
  { num: "100%",  label: "Satisfaction Rate" },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div className="stat-item reveal" key={i}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
