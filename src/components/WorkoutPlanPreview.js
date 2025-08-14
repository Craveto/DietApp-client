import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WorkoutPlanPreview.css";
import { useUser } from "@clerk/clerk-react";

const WorkoutPlanPreview = () => {
  const { user } = useUser();
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formWorkouts, setFormWorkouts] = useState([{ name: "", duration: "", type: "" }]);

  useEffect(() => {
    if (user) fetchWorkouts();
  }, [user]);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/workouts/${user.id}`
      );
      setWorkouts(res.data.workouts || []);
    } catch (err) {
      console.error("Error fetching workouts:", err);
    }
  };

  const handleWorkoutChange = (index, field, value) => {
    const updated = [...formWorkouts];
    updated[index][field] = value;
    setFormWorkouts(updated);
  };

  const addWorkoutRow = () => {
    setFormWorkouts([...formWorkouts, { name: "", duration: "", type: "" }]);
  };

  const submitWorkoutPlan = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/workouts/${user.id}`,
        { workouts: formWorkouts }
      );
      setShowModal(false);
      setFormWorkouts([{ name: "", duration: "", type: "" }]);
      fetchWorkouts();
    } catch (err) {
      console.error("Error adding workouts:", err);
    }
  };

  const deleteWorkoutPlan = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/workouts/${user.id}`
      );
      setWorkouts([]);
    } catch (err) {
      console.error("Error deleting workouts:", err);
    }
  };

  return (
    <div className="workout-plan-preview">
      <h2>Today's Workout 💪</h2>
      {workouts.length === 0 ? (
        <p>No workouts planned yet.</p>
      ) : (
        <ul className="workout-list">
          {workouts.map((w, idx) => (
            <li key={idx} className="workout-item">
              <strong>{w.name}</strong> — {w.type} ({w.duration} mins)
            </li>
          ))}
        </ul>
      )}

      <div className="action-buttons">
        <button className="btn-primary" onClick={() => setShowModal(true)}>Add Workout</button>
        <button className="btn-danger" onClick={deleteWorkoutPlan}>Delete All Workouts</button>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Workout Plan</h3>
            {formWorkouts.map((w, idx) => (
              <div key={idx} className="workout-input-row">
                <input
                  type="text"
                  placeholder="Workout Name (e.g., Push Ups)"
                  value={w.name}
                  onChange={(e) => handleWorkoutChange(idx, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Type (e.g., Strength)"
                  value={w.type}
                  onChange={(e) => handleWorkoutChange(idx, "type", e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={w.duration}
                  onChange={(e) => handleWorkoutChange(idx, "duration", e.target.value)}
                />
              </div>
            ))}
            <button className="btn-secondary" onClick={addWorkoutRow}>
              + Add Another Workout
            </button>
            <div className="modal-actions">
              <button className="btn-primary" onClick={submitWorkoutPlan}>Save</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanPreview;
