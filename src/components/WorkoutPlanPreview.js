// src/components/WorkoutPlanPreview.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WorkoutPlanPreview.css";
import { useUser } from "@clerk/clerk-react";

const WorkoutPlanPreview = () => {
  const { user } = useUser();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/workouts/${user.id}`
        );
        setWorkouts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchWorkouts();
  }, [user]);

  return (
    <div className="workout-plan-preview">
      <h2>Today's Workout 💪</h2>
      {workouts.length === 0 ? (
        <p>No workouts planned yet.</p>
      ) : (
        <ul>
          {workouts.map((w, idx) => (
            <li key={idx}>
              <strong>{w.name}</strong> - {w.duration} mins
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutPlanPreview;
