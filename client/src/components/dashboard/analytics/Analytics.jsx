import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement,BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../Dashboard";

ChartJS.register(BarElement, Tooltip, Legend);
const Analytics = () => {
  const data = {
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60],
        backgroundColor: ["red", "blue", "green", "yellow", "aqua", "purple"],
      },
    ],
    labels: [
      "Electronics",
      "Phones",
      "Shoes",
      "Watches",
      "Clothing",
      "Jewellery",
    ],
  };
  return (
    <>
      <Dashboard>
        <div>
          <Bar data={data} />
          
        </div>
      </Dashboard>
    </>
  );
};

export default Analytics;
