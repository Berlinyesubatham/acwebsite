// src/components/BookingPopup.jsx

export default function BookingPopup({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999
    }}>
      <div style={{
        background: "#111c32",
        border: "1px solid rgba(56,189,248,0.3)",
        borderRadius: "20px",
        padding: "40px 36px",
        textAlign: "center",
        maxWidth: "400px",
        width: "90%",
        boxShadow: "0 0 60px rgba(26,79,216,0.4)",
        animation: "popupIn 0.3s ease"
      }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "16px" }}>✅</div>
        <h2 style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: "1.4rem", fontWeight: 700,
          color: "#f8fafc", marginBottom: "12px"
        }}>
          Booking Received!
        </h2>
        <p style={{
          color: "#94a3b8", fontSize: "0.95rem",
          lineHeight: 1.7, marginBottom: "28px"
        }}>
          We'll call you within <strong style={{ color: "#38bdf8" }}>30 minutes</strong> to confirm your appointment.
        </p>
        <button onClick={onClose} style={{
          background: "linear-gradient(135deg, #1a4fd8, #38bdf8)",
          color: "white", border: "none",
          padding: "12px 36px", borderRadius: "10px",
          fontFamily: "'Sora', sans-serif",
          fontSize: "1rem", fontWeight: 700,
          cursor: "pointer"
        }}>
          OK 👍
        </button>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
