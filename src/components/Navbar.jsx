import { useState, useEffect } from "react";
import "../styles/Navbar.css"; 


export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Brand Logo */}
        <a href="#home" className="brand">
         <img src="/aclogo.png"  alt="Tajmahal AC Service Logo"  className="brand-icon"/> 
          Tajmahal Ac service 
        </a>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
            <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#book" className="nav-cta">Book Now</a></li>
        </ul>

        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
          <span className={`theme-toggle-icon ${!isDark ? "active" : ""}`}>☀️</span>
          <span className={`theme-toggle-icon ${isDark ? "active" : ""}`}>🌙</span>
        </button>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#about"    onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#pricing"  onClick={() => setMenuOpen(false)}>Pricing</a>
        <a href="#team"     onClick={() => setMenuOpen(false)}>Team</a>
        <a href="#contact"  onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="#book" className="m-cta" onClick={() => setMenuOpen(false)}>📅 Book Now</a>
      </div>
    </>
  );
}


