import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//image assets
import desPic from "../assets/desPic.png";
import arup from "../assets/Arup_Red_RGB.png";
import logo from "../assets/real_icon.png";

import { Alert,Collapse } from '@mui/material';

require("dotenv").config();

export default function Login() {
  const [showPw, setShowPw] = useState(false);
  const [showPic, setShowPic] = useState(true);
  const [showError, setShowError] = useState(false);
  const toggleShowPw = () => setShowPw(!showPw);
  const history = useHistory();

  useEffect(()=>{
    if(window.innerWidth<1200){
      setShowPic(false)
    }
    window.matchMedia("(min-width: 1200px)").addEventListener('change', (e)=>{
      setShowPic(e.matches)
    })}
  )

  useEffect(()=>{
    let pwInput = document.getElementById("passwordInput")
    if(showPw){
      pwInput.attributes['type'].value = "text"
    } else {
      pwInput.attributes['type'].value = "password"
    }
  }, [showPw])

  const login = async (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BN}/login`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username:e.target['username'].value, password: e.target['password'].value})
    })
      .then((res) => {
        return res.json()
      })
      .then(
        (result) => {
          if(result.data !== 'user does not exist' && result.data !== 'auth failed'){
            localStorage.setItem('token', result.data)
            localStorage.setItem('refreshToken', result.data)
            history.push('/')
          } else {
            setShowError(true)
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }
  return (
    <div className="pt-5" style={{backgroundColor:'#FFF', paddingRight:'80px', paddingLeft:'100px', height:'100vh'}} >
      <div className="row pb-3">
        <div className="col col-sm-8">
          <div className="row">
            <div className="p-2">
                <img
                  src={logo}
                  style={{ maxWidth: "100%", height: "auto", borderRadius:'15px' }}
                  alt="logo"
                  width="60px"
                  height="60px"
                />
            </div>
            <div className="p-2 d-flex align-items-end">
              <h3 className="font-weight-bold">
                LandSlide
                <br />
                Susceptibility
              </h3>
            </div>
          </div>
        </div>
        <div className="col col-sm-4 pr-5">
          <div className="h-100 d-flex justify-content-end align-items-center">
            <a href="https://www.arup.com/" rel="noreferrer" target="_blank">
              <img
                src={arup}
                style={{ maxWidth: "100%", height: "60%" }}
                alt="arup"
                width="160px"
              />
            </a>
          </div>
        </div>
      </div>
      <Collapse in={showError}>
        <Alert sx={{ mb: 2 }} severity="error">
          We could not verify your login information
        </Alert>
      </Collapse>
      <div className="row">
        <div className="col col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-5 pr-5">
          <div className="pt-4">
            <p>
              Esse nostrud excepteur aliqua Lorem cupidatat laborum. Labore sunt
              dolor adipisicing eiusmod adipisicing do officia nostrud labore
              reprehenderit consequat veniam. Ad qui minim culpa veniam nulla id
              officia sit eu consequat consectetur laborum. Sit ullamco
              excepteur aute minim irure reprehenderit id id officia. Fugiat
              Lorem est irure amet in. Id duis sit nulla dolor sit amet cillum
              dolore laboris irure elit laborum aliqua. Veniam exercitation
              cupidatat ea consectetur occaecat sunt excepteur.
            </p>
          </div>
          <div className="p-2">
            <form onSubmit={login}>
              <div className="mt-5 mb-3 pb-5">
                <label className="form-label">Username</label>
                <input type="text" id="usernameInput" className="form-control" name="username"/>
              </div>
              <div className="mb-3 pb-5">
                <div className="col col-* p-0 d-flex justify-content-between">
                  <label className="form-label">Password</label>
                  <p className="p-0 btn btn-link text-primary" onClick={toggleShowPw}>
                      {showPw ? 
                        <i className="far fa-eye"></i>
                      : 
                        <i className="far fa-eye-slash"></i>
                      }{" "}
                      Show{" "}
                  </p>
                </div>
                <input type="password" id="passwordInput" className="form-control"  name="password"/>
              </div>
              <div className="row">
                <div className="p-3">
                  <button
                    type="submit"
                    className="pl-4 pr-4 btn btn-outline-dark font-weight-bold shadow shadow-sm"
                    id="admin_login"
                  >
                    Admin Login
                  </button>
                </div>
                <div className="p-3">
                  <button
                    type="submit"
                    className="pl-4 pr-4 btn btn-primary font-weight-bold shadow shadow-sm"
                    id="user_login"
                    >
                    User Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {showPic?
        <>
        <div className="col col-xs-1">
        </div>
        <div className="description-pic col-xs-12 col-sm-12 col-md-12 col-lg-6 d-flex justify-content-end p-0 pr-5">
          <img
            src={desPic}
            style={{ borderRadius: '15px' }}
            alt="desPic"
            width="700px"
            height="650px"
          />
        </div>
        </>
        :null
      }
      </div>
      
      <p className="text-secondary">@2021 Arup All right reserved.</p>
    </div>
  );
}
