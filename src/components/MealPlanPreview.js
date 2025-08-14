import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MealPlanPreview.css";
import { useUser } from "@clerk/clerk-react";

const MealPlanPreview = () => {
  const { user } = useUser();
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formMeals, setFormMeals] = useState([{ meal: "", food: "", calories: "" }]);

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

  const handleMealChange = (index, field, value) => {
    const updated = [...formMeals];
    updated[index][field] = value;
    setFormMeals(updated);
  };

  const addMealRow = () => {
    setFormMeals([...formMeals, { meal: "", food: "", calories: "" }]);
  };

  const submitMealPlan = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/meals/${user.id}`,
        { meals: formMeals }
      );
      setShowModal(false);
      setFormMeals([{ meal: "", food: "", calories: "" }]);
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
        <ul className="meal-list">
          {meals.map((meal, idx) => (
            <li key={idx} className="meal-item">
              <strong>{meal.meal}</strong> — {meal.food} ({meal.calories} kcal)
            </li>
          ))}
        </ul>
      )}

      <div className="action-buttons">
        <button className="btn-primary" onClick={() => setShowModal(true)}>Add Meal Plan</button>
        <button className="btn-danger" onClick={deleteMealPlan}>Delete Meal Plan</button>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Meal Plan</h3>
            {formMeals.map((m, idx) => (
              <div key={idx} className="meal-input-row">
                <input
                  type="text"
                  placeholder="Meal (e.g., Lunch)"
                  value={m.meal}
                  onChange={(e) => handleMealChange(idx, "meal", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Food (e.g., Salad)"
                  value={m.food}
                  onChange={(e) => handleMealChange(idx, "food", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={m.calories}
                  onChange={(e) => handleMealChange(idx, "calories", e.target.value)}
                />
              </div>
            ))}
            <button className="btn-secondary" onClick={addMealRow}>
              + Add Another Meal
            </button>
            <div className="modal-actions">
              <button className="btn-primary" onClick={submitMealPlan}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanPreview;
