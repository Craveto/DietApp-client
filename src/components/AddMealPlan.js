import { useState } from "react";
import axios from "axios";

export default function AddMealPlan({ userId }) {
  const [meals, setMeals] = useState([{ meal: "", food: "", calories: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...meals];
    updated[index][field] = value;
    setMeals(updated);
  };

  const addMealRow = () => {
    setMeals([...meals, { meal: "", food: "", calories: "" }]);
  };

  const saveMealPlan = async () => {
    await axios.post(`/api/dashboard/meals/${userId}`, { meals });
    alert("Meal plan saved!");
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
      <button onClick={saveMealPlan}>Save</button>
    </div>
  );
}