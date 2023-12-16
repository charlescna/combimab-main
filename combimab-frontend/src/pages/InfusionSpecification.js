import { useState } from "react";
import {Link} from "react-router-dom";
import '../App.css';



const InfusionSpecification = ({token, setToken})=> {
    
  // Check if there is a token in local storage
  const urlParams = new URLSearchParams(window.location.search);
  const paramToken = urlParams.get('token');
  // urlParams.delete('token');consider delete token 
  console.log('Token:', paramToken);
   if( paramToken) {
    setToken(paramToken);
   }

    const [patientWeight, setPatientWeight] = useState('');
    const [mabVolume, setMabVolume] = useState('');
    const [naclVolume, setNaclVolume] = useState('');
    const [totalVolume, setTotalVolume] = useState('');
    const [infusionTime, setInfusionTime] = useState('');
    const [infusionRate, setInfusionRate] = useState('');

    const calculateDose = () => {
        //logic of calculation here
        //Assume basic and simple calc

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
    const calculatedMabVolume = numberOfVials * 30;
    const calculatedNaclVolume = calculatedMabVolume;
    const calculatedTotalVolume = calculatedMabVolume + calculatedNaclVolume;

    let calculatedInfusionTime;
    if (calculatedTotalVolume <= 120) {
      calculatedInfusionTime = 3;
    } else if (calculatedTotalVolume <= 360) {
      calculatedInfusionTime = 2;
    } else if (calculatedTotalVolume <= 720) {
      calculatedInfusionTime =1.3;
    } else if (calculatedTotalVolume <= 840) {
      calculatedInfusionTime = 1.7;
    } else if (calculatedTotalVolume <= 960) {
      calculatedInfusionTime =1.8  
      
    } 

    const calculatedInfusionRate = calculatedTotalVolume / calculatedInfusionTime;

    setMabVolume(calculatedMabVolume.toFixed(2));
    setNaclVolume(calculatedNaclVolume.toFixed(2));
    setTotalVolume(calculatedTotalVolume.toFixed(2));
    setInfusionTime(calculatedInfusionTime.toFixed(2));
    setInfusionRate(calculatedInfusionRate.toFixed(2));
  };

    return (
      
        <div className="homepage-container">
        <h1>HCP Support - Weight based</h1>
  
        <div className="calculator-bar">
          <label>Patient weight (kg): </label>
          <input
            type="number"
            value={patientWeight}
            onChange={(e) => setPatientWeight(e.target.value)}
            placeholder="patient weight in Kg"
          />
          <button onClick={calculateDose}>INFUSTION</button>
        </div>
        <table className="dose-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Weight:</td>
            <td>{patientWeight} kg</td>
          </tr>
          <tr>
            <td>Mab Volume:</td>
            <td>{mabVolume} ml</td>
          </tr>
          <tr>
            <td>Volume of 0.9% NaCl:</td>
            <td>{naclVolume} ml</td>
          </tr>
          <tr>
            <td>Total Volume (Dose):</td>
            <td>{totalVolume} ml</td>
          </tr>
          <tr>
            <td>Minimum Infusion Time (hr):</td>
            <td>{infusionTime} hours</td>
          </tr>
          <tr>
            <td>Maximum Infusion Rate (mL/hr):</td>
            <td>{infusionRate} ml/hr</td>
          </tr>
        </tbody>
      </table>
      <div>

        <Link to="/PreparationGuidance">
          <button className="GUIDANCE">Preparation Guidance</button>
        </Link>
        <Link to="/TreatmentCalender">
          <button className="CALENDAR">Treatment Calendar </button>
        </Link>
      </div>

    </div>
  );
};

export default InfusionSpecification;       