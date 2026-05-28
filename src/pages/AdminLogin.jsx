import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "tajmahal@123") {
      localStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">🛠️</div>
        <h2>Admin Login</h2>
        <p>Tajmahal AC Service</p>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="admin-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="admin-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}