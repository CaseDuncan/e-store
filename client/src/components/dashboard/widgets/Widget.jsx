import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./widget.css";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { getDashboardContent } from "../../../features/dashboard/DashboardSlice";

const Widget = ({ type }) => {
  let data; 
  let dispatch = useDispatch()
  const { content } = useSelector((state) => state.dashboardContent)
  useEffect(() => {
    dispatch(getDashboardContent())
  },[dispatch])

  switch (type) {
    case "users":
      data = {
        title: "Users",
        isMoney: false,
        total: content.users,
        link: "view all users",
        icon: (
          <AccountCircleOutlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
              cursor: "pointer",
            }}
          />
        ),
      };
      break;
    case "revenue":
      data = {
        title: "Revenue",
        total: content.sales?.total_sales
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        isMoney: true,
        link: "orders",
        icon: (
          <AccountCircleOutlined
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
              cursor: "pointer",
            }}
          />
        ),
      };
      break;
    case "customers":
      data = {
        title: "Customers",
        total: content.customers,
        isMoney: false,
        link: "orders",
        icon: (
          <AccountCircleOutlined
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
              cursor: "pointer",
            }}
          />
        ),
      };
      break;
    case "orders":
      data = {
        title: "Orders",
        total:content.orders,
        isMoney: false,
        link: "orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218,165,32,0.2)",
              cursor: "pointer",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="count">
          {data.total}
        </span>
        <span className="link">
          <Link to={"/users"}>view all {data.title}</Link>
        </span>
      </div>
      <div className="right">
        <p></p>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
