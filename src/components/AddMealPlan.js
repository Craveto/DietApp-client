import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { saveMealPlan } from "../services/mealService"; // Import from mealService.js

export default function AddMealPlan() {
  const { user } = useUser();
  const userId = user?.id;

  const [meals, setMeals] = useState([{ meal: "", food: "", calories: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...meals];
    updated[index][field] = value;
    setMeals(updated);
  };

  const addMealRow = () => {
    setMeals([...meals, { meal: "", food: "", calories: "" }]);
  };

  const handleSave = async () => {
    if (!userId) {
      alert("Please log in first");
      return;
    }
    try {
      await saveMealPlan(userId, meals); // Call service function
      alert("Meal plan saved!");
    } catch {
      alert("Error saving meal plan");
    }
  };

  return (
    <div>
      <h2>Add Meal Plan</h2>
      {meals.map((m, i) => (
        <div key={i}>
          <input
            placeholder="Meal (Breakfast/Lunch)"
            value={m.meal}
            onChange={e => handleChange(i, "meal", e.target.value)}
          />
          <input
            placeholder="Food"
            value={m.food}
            onChange={e => handleChange(i, "food", e.target.value)}
          />
          <input
            type="number"
            placeholder="Calories"
            value={m.calories}
            onChange={e => handleChange(i, "calories", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addMealRow}>+ Add Another Meal</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
