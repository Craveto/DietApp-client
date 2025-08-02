import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState(null);
  const [dietPlan, setDietPlan] = useState([]);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/profile/${user.id}`);
        if (res.data) {
          setPreferences(res.data);
          generateDietPlan(res.data); // Generate plan when preferences load
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) fetchPreferences();
  }, [user]);

  // Generate diet plan based on preferences
  const generateDietPlan = (prefs) => {
    if (!prefs) return;

    const plans = {
      weight_loss: [
        { meal: "Breakfast", food: "Oats with fruits", calories: 300 },
        { meal: "Lunch", food: "Grilled chicken & veggies", calories: 450 },
        { meal: "Dinner", food: "Soup & salad", calories: 350 },
      ],
      muscle_gain: [
        { meal: "Breakfast", food: "Eggs & toast", calories: 500 },
        { meal: "Lunch", food: "Chicken, rice & broccoli", calories: 600 },
        { meal: "Dinner", food: "Steak & potatoes", calories: 550 },
      ],
      maintenance: [
        { meal: "Breakfast", food: "Smoothie & granola", calories: 400 },
        { meal: "Lunch", food: "Fish with quinoa", calories: 500 },
        { meal: "Dinner", food: "Pasta & salad", calories: 500 },
      ],
    };

    setDietPlan(plans[prefs.goal] || []);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {preferences ? (
          <>
            <h2>Hi {user.firstName || user.fullName},</h2>
            <p>
              Goal: <strong>{preferences.goal.replace("_", " ")}</strong> | Diet:{" "}
              <strong>{preferences.dietType}</strong>
            </p>

            <div className="diet-plan">
              <h3>Your Daily Diet Plan</h3>
              {dietPlan.length > 0 ? (
                <div className="diet-cards">
                  {dietPlan.map((item, index) => (
                    <div className="diet-card" key={index}>
                      <h4>{item.meal}</h4>
                      <p>{item.food}</p>
                      <span>{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No plan available. Please update your preferences.</p>
              )}
            </div>
          </>
        ) : (
          <p className="loading">Loading your preferences...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
