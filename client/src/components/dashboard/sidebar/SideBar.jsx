import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";


import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";

const SideBar = () => {
  let navigate = useNavigate()
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">E-store</span>
      </div>
      <hr />
      <div className="center-items">
        <ul>
          <li>
            <SpeedOutlinedIcon />
            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
          </li>
          <p className="title">MAIN</p>
          <li>
            <AccountCircleOutlined />
            <span>Users</span>
          </li>
          <li>
            <PeopleAltOutlinedIcon />
            <span>Customers</span>
          </li>
          <li>
            <Inventory2OutlinedIcon />
            <span onClick={() => navigate("/products/admin")}>Products</span>
          </li>
          <li>
            <ShoppingCartCheckoutOutlinedIcon />
            <span onClick={() => navigate("/orders")}>Orders</span>
          </li>
          <p className="title">SERVICES</p>
          <li>
            <TimelineOutlinedIcon />{" "}
            <span onClick={() => navigate("/analytics")}>Analytics</span>
          </li>
          <li>
            <MailIcon />
            <span>Mails</span>
          </li>
          <li>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlined />
            <span>Profile</span>
          </li>
          <li>
            <PowerSettingsNewOutlinedIcon />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar