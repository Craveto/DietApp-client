import React, { useState, useEffect } from "react";
import axios from "axios";  
import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const { user } = useUser();

  const [preferences, setPreferences] = useState({
    age: "",
    height: "",
    weight: "",
    goal: "",
    allergies: "",
    dietType: ""
  });

  const API_BASE = process.env.REACT_APP_API_BASE_URL;
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/profile/${user.id}`);
      if (res.data) setPreferences(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (user) fetchProfile();
}, [user]);


  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${API_BASE}/api/profile`, {
      userId: user.id, // Clerk user ID
      ...preferences,
    });
    alert("Preferences saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Error saving preferences!");
  }
};

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="user-header">
            <img src={user.imageUrl} alt="User" />
            <div>
              <h2>{user.fullName}</h2>
              <p>{user.primaryEmailAddress.emailAddress}</p>
            </div>
          </div>

          <form className="preferences-form" onSubmit={handleSubmit}>
            <h3>Update Your Preferences</h3>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={preferences.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={preferences.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={preferences.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Goal</label>
              <select name="goal" value={preferences.goal} onChange={handleChange} required>
                <option value="">Select Goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div className="form-group">
              <label>Allergies (optional)</label>
              <input
                type="text"
                name="allergies"
                placeholder="e.g. peanuts, gluten"
                value={preferences.allergies}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Diet Type</label>
              <select name="dietType" value={preferences.dietType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="none">No preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="keto">Keto</option>
              </select>
            </div>

            <button type="submit">💾 Save Preferences</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
