import "../styles/Coverage.css"; 
const areas = [
  "Pettai", "Palayamkottai", "Tirunelveli Town", "Melapalayam", "Sankarankovil",
  "Tenkasi", "Nanguneri", "Ambasamudram", "Perumanallur", "Kadayam",
  "Mukkudal", "Kanniyakumari", "Nagercoil", "Thoothukudi",
  "Valliyur", "Radhapuram", "Thisayanvilai", "Kayalpatnam", "Tiruchendur",
  "Srivaikuntam", "Kovilpatti", "Vilathikulam", "Ottapidaram", "Sathankulam",
  "Cheranmahadevi", "Alangulam", "Sivagiri", "Veerakeralampudur", "Shencottai",
  "Courtallam", "Papanasam", "Kallidaikurichi",
];

export default function Coverage() {
  return (
    <div style={{ padding: "0 5% 90px" }}>
      <div className="coverage-section reveal">
        <span className="section-tag">Service Coverage</span>
        <h2 className="section-title" style={{ marginBottom: "8px" }}>
          We Cover Entire Tirunelveli District
        </h2>
       <p className="section-subtitle">
  We provide doorstep AC service within <strong>150 km</strong> across Tirunelveli, 
  Thoothukudi, Tenkasi, and Kanniyakumari districts. Our technicians are stationed 
  across the region for the fastest response times.
</p>
        <div className="coverage-areas">
          {areas.map((area, i) => (
            <span className="area-chip" key={i}>📍 {area}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
