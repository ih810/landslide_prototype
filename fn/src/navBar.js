import React from "react";

//logo
import logo from "./assets/real_icon (2).png";
import profile from "./assets/dummy.png";
import arup from "./assets/Arup_Red_RGB.png";

export default function NavBar(props) {

  return (
      <div className='NavBar row bg-white shadow h-0 fixed-top' style={{zIndex:2000}}>
        <div className="col col-8 d-flex flex-row align-items-center">
          <span className="pl-3 pt-2 pb-2">
            <a href="/">
            <img
              src={logo}
              style={{ width: "60px", height: "60px" }}
              alt="logo"
            />
            </a>
          </span>
        </div>
        <div className="col col-4 d-flex flex-row-reverse align-items-center">
        <span className="pr-3 d-flex align-items-center">
            <img
              src={arup}
              style={{ width: "80px", height: "20px" }}
              alt="arup"
            />
          </span>
          <span className="userIcon pl-1 pr-1">
            <img 
            src={profile}
            style={{ width: "40px", height: "40px" }}
            alt="profile"
            />
          </span>
          <span className="bellButton pl-1 pr-1">
            <i className="fas fa-bell fa-lg text-secondary"></i>
          </span>
          <span className="homeButton pl-1 pr-1">
          <a href="/">
            <i className="fas fa-home fa-lg text-secondary"></i>
          </a>
          </span>
        </div>
      </div>
  );
}
