import React from "react";
import { SignUpButton, SignInButton, SignedOut } from "@clerk/clerk-react";
import "./HeroSection.css";


function HeroSection() {
  return (
    <section className="hero">
      <h1>Plan Your Diet, Achieve Your Goals</h1>
      <p>
        Get a personalized diet plan tailored to your preferences and fitness goals.
        Track your meals and stay motivated every day.
      </p>
      <div className="cta-buttons">
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="primary-btn">Get Started</button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="secondary-btn">Login</button>
          </SignInButton>
        </SignedOut>
      </div>
    </section>
  );
}

export default HeroSection;
