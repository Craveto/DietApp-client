import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MealPlanPreview from "../components/MealPlanPreview";
import WorkoutPlanPreview from "../components/WorkoutPlanPreview";
import ProgressChart from "../components/ProgressChart";
import "./Dashboard.css";

// import QuickSummary from "../components/QuickSummary";

function Dashboard() {
  const { user } = useUser();
  const [preferences, setPreferences] = useState(null);
  const [dietPlan, setDietPlan] = useState([]);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/profile/${user.id}`);
        if (res.data) {
          setPreferences(res.data);
          generateDietPlan(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (user) fetchPreferences();
  }, [user]);

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
            {/* Quick Stats Section */}
            <section className="quick-stats">
              <h2>Hi {user.firstName || user.fullName},</h2>
              <p>
                Goal: <strong>{preferences.goal.replace("_", " ")}</strong> | Diet:{" "}
                <strong>{preferences.dietType}</strong>
              </p>
            </section>

            {/* Meal Plan Preview */}
            <section className="dashboard-section">
              <h3>Your Daily Diet Plan</h3>
              <MealPlanPreview dietPlan={dietPlan} />
              
            </section>

            {/* Workout Plan Preview */}
            <section className="dashboard-section">
              <h3>Suggested Workouts</h3>
              <WorkoutPlanPreview />
            </section>

            {/* Progress Tracking */}
            <section className="dashboard-section">
              <h3>Your Progress</h3>
              <ProgressChart />
            </section>

            {/* <QuickSummary /> */}
          </>
        ) : (
          <p className="loading">Loading your preferences...</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
