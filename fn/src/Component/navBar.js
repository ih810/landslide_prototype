import React, { useEffect, useState } from "react";

//logo
import logo from "../assets/real_icon (2).png";
import profile from "../assets/dummy.png";
import arup from "../assets/Arup_Red_RGB.png";

export default function NavBar(props) {
  const [title, setTitle] = useState();
  useEffect(()=>{
    if(props.location === '/') setTitle('Dashboard')
    else if(props.location ==='/admin') setTitle('Admin Page')
    else if(props.location ==='/new-project') setTitle('New Project Setting')
    else if(props.location ==='/train-new-model') setTitle('Model Config')
    else if(props.location ==='/pre-train-model') setTitle('Model Selection')
    else if(props.location ==='/upload-files') setTitle('Upload Trainning Materials')
    else if(props.location ==='/validate-input') setTitle('Validate Input')
    else if(props.location ==='/view-performance') setTitle('Review Performance')
    else if(props.location ==='/view-results') setTitle('Review Prediction Results')
  })
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
          <span className="pl-4">
            <h2 style={{color: '#3F3F3F', fontWeight:700, marginBottom:0}}>
              {title}
            </h2>
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
