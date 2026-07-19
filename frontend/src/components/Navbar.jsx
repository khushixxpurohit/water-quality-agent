import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

// Custom mark: a water drop with a gauge tick through it, echoing the
// river-gauge motif used across the dashboard. Kept as inline SVG so
// no icon library dependency is required.
function DropGaugeIcon() {
  return (
    <svg
      className="logo-icon"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dropGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#56d6e0" />
          <stop offset="100%" stopColor="#0e4750" />
        </linearGradient>
      </defs>
      <path
        d="M13 2C13 2 4.5 12.2 4.5 17.2C4.5 22.06 8.58 25 13 25C17.42 25 21.5 22.06 21.5 17.2C21.5 12.2 13 2 13 2Z"
        fill="url(#dropGradient)"
        stroke="#92e396"
        strokeWidth="1"
      />
      <line x1="8.5" y1="17.5" x2="17.5" y2="17.5" stroke="#071316" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <line x1="9.5" y1="14.5" x2="16.5" y2="14.5" stroke="#071316" strokeWidth="1.1" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <DropGaugeIcon />
        <span>AquaSentinel</span>
      </Link>

      <div className="nav-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          Home
        </Link>

        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;