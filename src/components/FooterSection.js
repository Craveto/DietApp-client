import React from "react";
import "./FooterSection.css";

function FooterSection() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} DietApp. All rights reserved.</p>
    </footer>
  );
}

export default FooterSection;
