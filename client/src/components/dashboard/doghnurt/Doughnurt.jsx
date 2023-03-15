import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getSalesAnalysis } from "../../../features/sales/SalesSlice";

ChartJS.register(ArcElement, Tooltip, Legend);
import "./doughnurt.css";

const Doughnurt = () => {
  let dispatch = useDispatch();
  const { salesData } = useSelector((state) => state.salesAnalysis);
  useEffect(() => {
    dispatch(getSalesAnalysis());
  }, [dispatch]);

  const data = {
    datasets: [
      {
        data: [
          salesData.electronics?.total_sales_electronics,
          salesData.phones?.total_sales_phones,
          salesData.shoes?.total_sales_shoes,
          salesData.watches?.total_sales_watches,
          salesData.clothing?.total_sales_clothing,
          salesData.jewellery?.total_sales_jewellery,
        ],
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
    <div className="doughnurt">
      <h4>Sales Analysis</h4>
      <div className="chart-content">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Doughnurt;
