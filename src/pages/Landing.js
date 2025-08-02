import React from "react";
// import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
// import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
        <Navbar />
      <h1>Diet Planner</h1>
      <p>Get your personalized diet plan in seconds!</p>

      
    </div>
  );
}

export default Landing;
