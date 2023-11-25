
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

function HomePage() {
  const [patientWeight, setPatientWeight] = useState('');
  const [generatedDose, setGeneratedDose] = useState('');

  const handleCalculate = () => {
    const dose = '**Numb***';
    setGeneratedDose(dose);
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
                <th>{generatedDose} mg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 mg/mL formulation vials</td>
                <td>{generatedDose} 100 mg/mL formulation vials</td>
              </tr>
            </tbody>
          </table>
          <p>For Health Care professionals support to have infusion specifications</p>
          <p>Steps for preparation, Calendar generation please click HCP Support </p>

          <button className="hcp-support-button"> 
            HCP Support
          </button>

          <p className="disclaimer">This web App is not for medical purpose. All information here is dummy data and is done as a project for students in CAN for CP3540.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

