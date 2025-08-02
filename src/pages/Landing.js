import React from "react";
// import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import FeaturesSection from "../components/FeaturesSection";
import FooterSection from "../components/FooterSection";
// import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
        <Navbar />
        <HeroSection />
        <BenefitsSection />
        <FeaturesSection />
        <FooterSection />


      
    </div>
  );
}

export default Landing;
