// src/components/MealPlanPreview.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MealPlanPreview.css";
import { useUser } from "@clerk/clerk-react";

const MealPlanPreview = () => {
  const { user } = useUser();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/meals/${user.id}`
        );
        setMeals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchMeals();
  }, [user]);

  return (
    <div className="meal-plan-preview">
      <h2>Today's Meal Plan 🍽️</h2>
      {meals.length === 0 ? (
        <p>No meals planned yet.</p>
      ) : (
        <ul>
          {meals.map((meal, idx) => (
            <li key={idx}>
              <strong>{meal.name}</strong> - {meal.calories} kcal
            </li>
          ))}
        </ul>
      )}
     
    </div>
   
  );
};

export default MealPlanPreview;
