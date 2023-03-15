import React, {useState, useEffect} from "react";
import SideBar from "./sidebar/SideBar";
import './dashboard.css'
import Widget from "./widgets/Widget";
import TopNav from "./topnav/TopNav";
import Circularbar from "./circularbar/Circularbar";
import Doughnurt from "./doghnurt/Doughnurt";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Dashboard = ({ children }) => {
  const { user, message } = useSelector((state) => state.auth);
  let navigate = useNavigate();
  
  useEffect(() => {
    if (!user.is_admin) {
       toast.error("Unauthorized!", {
         position: toast.POSITION.TOP_CENTER,
       });
       navigate("/login");
    }
  })
  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="dashboard-content">
          <TopNav />
          <div className="widgets">
            <Widget type={"users"} />
            <Widget type={"customers"} />
            <Widget type={"revenue"} />
            <Widget type={"orders"} />
          </div>
          {children}
          <div className="charts">
            <Circularbar />
            <Doughnurt />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
