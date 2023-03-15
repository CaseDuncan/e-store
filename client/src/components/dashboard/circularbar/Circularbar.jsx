import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useSelector, useDispatch } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import "./circularbar.css";

const Circularbar = () => {
  let dispatch = useDispatch();
  const { content } = useSelector((state) => state.dashboardContent);
  return (
    <div className="circular-bar">
      <div className="top-content">
        <h4 className="title">Total Revenue</h4>
      </div>
      <div className="bottom-content">
        <div className="bar-content">
          <CircularProgressbar value={65.5} text="65.5%" strokeWidth={6} maxValue={100} />
        </div>
        <p className="title">Total Sales</p>
        <p className="amount">
          Ksh.{" "}
          {content.sales?.total_sales
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
    </div>
  );
};

export default Circularbar;
