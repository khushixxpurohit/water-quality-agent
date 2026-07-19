import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        💧 AquaSentinel
      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/dashboard">Dashboard</Link>

      </div>

    </nav>
  );
}

export default Navbar;