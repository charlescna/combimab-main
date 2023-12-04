


import { useState, useEffect } from 'react';
import { Navigate ,Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import '../App.css';
const HomePage = ()=> 
    {
  const [patientWeight, setPatientWeight] = useState('');
  const [generatedDose, setGeneratedDose] = useState('');
  const handleCalculate = () => {
      const weight = parseFloat(patientWeight);
      if (isNaN(weight)) {
        alert("Please enter a valid weight.");
        return;
      }
    
      let dose;
    
      if (weight >= 5 && weight <= 20) {
        dose = 600;
      } else if (weight >= 21 && weight <= 40) {
        dose = 1800;
      } else if (weight >= 41 && weight <= 60) {
        dose = 3600;
      } else if (weight >= 61 && weight <= 80) {
        dose = 4200;
      } else if (weight > 80) {
        dose = 4800;
      } else {
        alert("Invalid weight range.");
        return;
      }    
      const numberOfVials = Math.ceil(dose / 300);     
      setGeneratedDose({ dose, numberOfVials });
    };
  return (
    <div className="homepage-container">
      <h1>Combimab Rare Disease Dose Management App</h1>
      <div className="box">
        <img src="HomePagePhoto.png" alt="Bio" />

            <div className="box-content">
              <h2>COMBIMAB IS</h2>
              <p>Weight-based Nmab® 300 mg/3mL dosing calculator for patients with PN</p>
              <div className="calculator-bar">
                <label>Patient weight:</label>
                <input
                  type="text"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(e.target.value)}
                  placeholder="patient weight in Kg"
                />
                <button onClick={handleCalculate}>CALCULATE</button>
              </div>
          <table className="dose-table">
            <thead>
              <tr>
                <th>Dose (mg)</th>
                <th>{generatedDose.dose} mg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 mg/mL formulation vials</td>
                <td>{generatedDose.numberOfVials} vials of 100 mg/mL formulation </td>
              </tr>
            </tbody>
          </table>
          <p>For Health Care professionals support to have infusion specifications</p>
          <p>Steps for preparation, Calendar generation please login </p>
          <Link to="/loginpage">
            <button className="hcp-support-button">login</button>
          </Link>       
          <p className="disclaimer">This web App is not for medical purpose. All information here is dummy data and is done as a project for students in CAN for CP3540.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

