import React from "react";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import "./topnav.css";
import avatar from './avatar.jpg'
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  let navigate = useNavigate()
  return (
    <div className="topNav">
      <div className="wrapper">
        <div className="search">
         <p></p>
        </div>

        <div className="items">
          <div className="item">
            <HomeOutlinedIcon onClick={ ()=>navigate('/')} />
          </div>
          <div className="item">
            <LanguageOutlinedIcon />
            English
          </div>
          <div className="item">
            <AccountCircleOutlinedIcon />
            User
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon />
          </div>
          <div className="item">
            <DarkModeOutlined />
          </div>
          <div className="item">
            <img src={avatar} alt="user" className="avatar"/>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TopNav;
