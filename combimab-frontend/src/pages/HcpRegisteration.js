import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';



const HcpRegistration = () => {
    return (
      <div>
        <h1>HCP Registeration Form</h1>
        <Link to="/InfusionSpecification" className="GUIDANCE">
          REGISTER
        </Link>

      </div>
    );
  };
  
  export default HcpRegistration;