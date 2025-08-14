import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MealPlanPreview.css";
import { useUser } from "@clerk/clerk-react";

const MealPlanPreview = () => {
  const { user } = useUser();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchMeals();
  }, [user]);

  const fetchMeals = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/meals/${user.id}`
      );
      setMeals(res.data.meals || []);
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  const addMealPlan = async () => {
    try {
      // ✅ match backend schema: meal + food + calories
      const sampleMeals = [
        { meal: "Lunch", food: "Salad", calories: 150 },
        { meal: "Dinner", food: "Grilled Chicken", calories: 300 },
      ];

      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/meals/${user.id}`,
        { meals: sampleMeals }
      );
      fetchMeals();
    } catch (err) {
      console.error("Error adding meals:", err);
    }
  };

  const deleteMealPlan = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/meals/${user.id}`
      );
      setMeals([]);
    } catch (err) {
      console.error("Error deleting meals:", err);
    }
  };

  return (
    <div className="meal-plan-preview">
      <h2>Today's Meal Plan 🍽️</h2>
      {meals.length === 0 ? (
        <p>No meals planned yet.</p>
      ) : (
        <ul>
          {meals.map((meal, idx) => (
            <li key={idx}>
              <strong>{meal.meal}</strong> — {meal.food} ({meal.calories} kcal)
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={addMealPlan}>Add Meal Plan</button>
        <button onClick={deleteMealPlan} style={{ marginLeft: "10px" }}>
          Delete Meal Plan
        </button>
      </div>
    </div>
  );
};

export default MealPlanPreview;
