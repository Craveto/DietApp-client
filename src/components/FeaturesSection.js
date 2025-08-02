import React from "react";
import "./FeaturesSection.css";

function FeaturesSection() {
  return (
    <section className="features">
      <div className="feature-card">
        <h3>🎯 Personalized Plans</h3>
        <p>Get diet plans that match your fitness goal and preferences.</p>
      </div>
      <div className="feature-card">
        <h3>📊 Track Your Progress</h3>
        <p>Monitor your calorie intake and progress every week.</p>
      </div>
      <div className="feature-card">
        <h3>🥗 Smart Suggestions</h3>
        <p>Receive healthy meal ideas and diet tips to stay consistent.</p>
      </div>
    </section>
  );
}

export default FeaturesSection;
