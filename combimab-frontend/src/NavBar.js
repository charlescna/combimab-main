import { Link } from "react-router-dom"
import React,{useState, useEffect} from "react";
import './App.css';



const NavBar = ({token, setToken}) => {



  /*useEffect( () => {
      setToken(localStorage.getItem("token"))
  }, [token])*/

   if( token ) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color">
        <div className="container-fluid justify-content-center">
          <Link className="navbar-brand" to="/">Combimab</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav max-auto">

              <li className="navbar-brand">
                <Link className="nav-link" to="/About">About</Link>
              </li>
              <li className="navbar-brand">
                <Link className="nav-link" to="/" onClick={ ()=>{setToken(null);}}>log Out</Link>
              </li>
              <li className="navbar-brand">
                <Link className="nav-link" to="/InfusionSpecification">Infusion Calculation</Link>
              </li>
              <li className="navbar-brand">
              <Link className="nav-link" to="/PreparationGuidance">
              Preparation Guidance
              </Link>
              </li>
              <li className="navbar-brand">
                <Link className="nav-link" to="/TreatmentCalender">
                Treatment Calendar 
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );

   }
   else {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar-color">
        <div className="container-fluid justify-content-center">
          <Link className="navbar-brand" to="/">Combimab</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav max-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/About">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/loginpage">Google Log In</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
   }
  };
  
  
  
    

export default NavBar