import React from "react";
import "./FooterSection.css";

function FooterSection() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Diet Planner. All rights reserved.</p>
    </footer>
  );
}

export default FooterSection;
