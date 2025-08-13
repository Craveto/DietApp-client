// client/src/services/mealService.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Save or update meal plan
export const saveMealPlan = async (userId, meals) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/meals/${userId}`, { meals });
    return response.data;
  } catch (error) {
    console.error("Error saving meal plan:", error);
    throw error;
  }
};

// Get meal plan
export const getMealPlan = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/meals/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching meal plan:", error);
    throw error;
  }
};
