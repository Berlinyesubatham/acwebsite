import "../styles/Testimonials.css";
const testimonials = [
  {
    stars: "★★★★★",
    text: "Excellent service! The technician came within 2 hours of booking and fixed my AC in under an hour. Very professional and the price was fair. Highly recommended!",
    initial: "R",
    name: "Ramesh M",
    area: "Thirunelveli, Tamil Nadu",
  },
  {
    stars: "★★★★★",
    text: "Got my AC deep cleaned and gas refilled. The difference is amazing — it cools so much better now. They were on time and explained everything clearly. Will book again.",
    initial: "P",
    name: "Priya S",
    area: "Palladam, Tamil Nadu",
  },
  {
    stars: "★★★★☆",
    text: "Booked the AMC package for our office with 4 ACs. The team did a thorough job. Monthly check-ups give us peace of mind. Good value for money.",
    initial: "K",
    name: "Karthik R",
    area: "Thirunelveli Industrial Area",
  },
  {
    stars: "★★★★★",
    text: "My AC stopped working on a Sunday night. I called CoolTech and they sent a technician within the hour. Compressor issue fixed by midnight. Lifesavers!",
    initial: "S",
    name: "Selvi A",
    area: "Avinashi, Tamil Nadu",
  },
  {
    stars: "★★★★★",
    text: "Installed a new split AC. The team was neat, didn't damage any walls, and cleaned up everything after. Installation was done perfectly. Very happy!",
    initial: "V",
    name: "Vijay B",
    area: "Dharapuram, Tamil Nadu",
  },
  {
    stars: "★★★★★",
    text: "Best AC service in Tirunelveli! Transparent pricing, no surprise charges. They found the exact issue and fixed it properly. Technicians are very knowledgeable.",
    initial: "M",
    name: "Meena K",
    area: "Kangeyam, Tamil Nadu",
  },
];

export default function Testimonials() {
  return (
    <section className="section reveal" id="testimonials">
      <div className="section-header">
        <span className="section-tag">Reviews</span>
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Over 5,000 satisfied customers across Tirunelveli and surrounding areas.
        </p>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <div className="stars">{t.stars}</div>
            <p className="testimonial-text">"{t.text}"</p>
            <div className="reviewer">
              <div className="reviewer-avatar">{t.initial}</div>
              <div>
                <div className="reviewer-name">{t.name}</div>
                <div className="reviewer-area">{t.area}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
