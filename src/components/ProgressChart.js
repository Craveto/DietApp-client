// src/components/ProgressChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useUser } from "@clerk/clerk-react";
import "./ProgressChart.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProgressChart = () => {
  const { user } = useUser();
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/dashboard/progress/${user.id}`
        );
        setProgressData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) fetchProgress();
  }, [user]);

  const data = {
    labels: progressData.map(item => item.date),
    datasets: [
      {
        label: "Weight Progress (kg)",
        data: progressData.map(item => item.weight),
        borderColor: "#4cafef",
        backgroundColor: "#4cafef33",
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }
    ]
  };

  return (
    <div className="progress-chart">
      <h2>Progress Tracker 📈</h2>
      <Line data={data} />
    </div>
  );
};

export default ProgressChart;
