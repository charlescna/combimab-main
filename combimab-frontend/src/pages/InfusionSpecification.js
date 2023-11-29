import { useState } from "react";
import {Link} from "react-router-dom";
import '../App.css';


const InfusionSpecification = ()=> {
    
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
        const dose = weight * 100; //fixed does of 100 mg per kg

        const calculatedMab = dose / 2; //assume half of dose
        const calculatedNacl = dose / 2; //other half of dose
        const calculatedTotal = calculatedMab + calculatedNacl;


        const calculatedInfusionTime = 2;//e.g  infusion time in hours
        const calculatedInfusionRate = calculatedTotal / calculatedInfusionTime; // ml per hour

    setMabVolume(calculatedMab.toFixed(2));
    setNaclVolume(calculatedNacl.toFixed(2));
    setTotalVolume(calculatedTotal.toFixed(2));
    setInfusionTime(calculatedInfusionTime);
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

      <Link to="/TreatmentCalender">
        <button className="CALENDAR">CALENDAR</button>
      </Link>

      <Link to="/PreparationGuidance">
        <button className="GUIDANCE">PREPARATION</button>
      </Link>
    </div>
  );
};

export default InfusionSpecification;       