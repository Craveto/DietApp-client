// src/components/QuickSummary.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuickSummary.css";
import { useUser } from "@clerk/clerk-react";

const QuickSummary = () => {
  const { user } = useUser();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/summary/${user.id}`
        );
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchSummary();
  }, [user]);

  if (!summary) return <div>Loading summary...</div>;

  return (
    <div className="quick-summary">
      <h2>Welcome back, {user.firstName} 👋</h2>
      <p>Calories consumed today: {summary.calories} kcal</p>
      <p>Progress: {summary.progress}%</p>
      <div className="progress-bar">
        <div style={{ width: `${summary.progress}%` }}></div>
      </div>
    </div>
  );
};

export default QuickSummary;
