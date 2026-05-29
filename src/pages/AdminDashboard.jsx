import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const STATUS_META = {
  pending:   { color: "amber",  icon: "⏳", label: "Pending"   },
  confirmed: { color: "teal",   icon: "✓",  label: "Confirmed" },
  completed: { color: "blue",   icon: "✔",  label: "Completed" },
  cancelled: { color: "red",    icon: "✕",  label: "Cancelled" },
};

const SERVICE_ICONS = {
  "AC Service":     "❄️",
  "AC Repair":      "🔧",
  "AC Installation": "🏠",
  "Gas Refill":     "💨",
};

export default function AdminDashboard() {
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filterStatus, setFilter] = useState("all");
  const [search, setSearch]       = useState("");
  const [toast, setToast]         = useState(null);
  const navigate                  = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin_auth")) {
      navigate("/admin");
      return;
    }
    fetchBookings();
  }, []);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchBookings = async () => {
    try {
      const res  = await fetch("https://tajmahal-acwebiste-5.onrender.com/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      showToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`https://tajmahal-acwebiste-5.onrender.com/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      showToast(`Status updated to ${status}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("Update failed", "error");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking? This cannot be undone.")) return;
    try {
      await fetch(`https://tajmahal-acwebiste-5.onrender.com/api/bookings/${id}`, {
        method: "DELETE",
      });
      setBookings((prev) => prev.filter((b) => b.id !== id));
      showToast("Booking deleted");
    } catch (err) {
      console.error("Failed to delete:", err);
      showToast("Delete failed", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin");
  };

  const filtered = bookings.filter((b) => {
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      b.name.toLowerCase().includes(q) || b.phone.includes(search);
    return matchStatus && matchSearch;
  });

  const counts = {
    all:       bookings.length,
    pending:   bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="ad-root">

      {/* Toast */}
      {toast && (
        <div className={`ad-toast ad-toast--${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-brand">
          <span className="ad-sidebar-icon">❄</span>
          <div>
            <p className="ad-sidebar-title">Tajmahal AC</p>
            <p className="ad-sidebar-sub">Admin Panel</p>
          </div>
        </div>

        <nav className="ad-sidebar-nav">
          <p className="ad-sidebar-section-label">Bookings</p>
          {Object.entries(counts).map(([key, val]) => (
            <button
              key={key}
              className={`ad-sidebar-item ${filterStatus === key ? "ad-sidebar-item--active" : ""}`}
              onClick={() => setFilter(key)}
            >
              <span className="ad-sidebar-item-dot" data-status={key} />
              <span className="ad-sidebar-item-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </span>
              <span className="ad-sidebar-item-count">{val}</span>
            </button>
          ))}
        </nav>

        <button className="ad-sidebar-logout" onClick={handleLogout}>
          <span>⇠</span> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="ad-main">

        {/* Top bar */}
        <div className="ad-topbar">
          <div>
            <h1 className="ad-topbar-title">
              {filterStatus === "all" ? "All Bookings" : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Bookings`}
            </h1>
            <p className="ad-topbar-sub">{filtered.length} record{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
          <div className="ad-topbar-actions">
            <div className="ad-search">
              <span className="ad-search-icon">⌕</span>
              <input
                type="text"
                placeholder="Search name or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ad-search-input"
              />
              {search && (
                <button className="ad-search-clear" onClick={() => setSearch("")}>✕</button>
              )}
            </div>
            <button className="ad-refresh-btn" onClick={fetchBookings} title="Refresh">
              ↻
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="ad-state">
            <div className="ad-spinner" />
            <p>Loading bookings…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ad-state">
            <span className="ad-state-icon">📭</span>
            <p>No bookings match your filters.</p>
            <button className="ad-state-reset" onClick={() => { setFilter("all"); setSearch(""); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="ad-table-wrapper">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Service</th>
                  <th>Brand</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="ad-table-row">
                    <td className="ad-cell-id">#{b.id}</td>
                    <td className="ad-cell-name">
                      <div className="ad-name-inner">
                        <div className="ad-avatar">
                          {b.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{b.name}</span>
                      </div>
                    </td>
                    <td className="ad-cell-contact">
                      <div className="ad-contact-inner">
                        <a href={`tel:${b.phone}`} className="ad-phone">{b.phone}</a>
                        {b.email && <span className="ad-email">{b.email}</span>}
                      </div>
                    </td>
                    <td className="ad-cell-service">
                      <div className="ad-service-inner">
                        <span className="ad-service-icon">{SERVICE_ICONS[b.service] || "🔩"}</span>
                        {b.service}
                      </div>
                    </td>
                    <td className="ad-cell-brand">{b.acBrand || <span className="ad-nil">—</span>}</td>
                    <td className="ad-cell-date">
                      <span className="ad-date-pill">{b.date}</span>
                    </td>
                    <td className="ad-cell-msg">
                      {b.message || <span className="ad-nil">—</span>}
                    </td>
                    <td className="ad-cell-status">
                      <span className={`ad-badge ad-badge--${b.status}`}>
                        {STATUS_META[b.status]?.icon} {b.status}
                      </span>
                    </td>
                    <td className="ad-cell-actions">
                      <div className="ad-actions-inner">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="ad-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          className="ad-delete-btn"
                          onClick={() => deleteBooking(b.id)}
                          title="Delete booking"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
