import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpButton, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import "./Navbar.css";
// import Profile from "../pages/Profile";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h2 className="logo">DietApp</h2>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <SignedOut>
          <SignUpButton mode="modal">
            <button onClick={() => setMenuOpen(false)}>Sign Up</button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button onClick={() => setMenuOpen(false)}>Login</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}> Profile </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
