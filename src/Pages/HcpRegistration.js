import { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

const HcpRegistration = () => {

    const [patientWeight, setPatientWeight] = useState('');
    const [mabVol, setMabVol] = useState('');
    const [naclVol, setNaclVol] = useState('');
    const [totalVol, setTotalVol] = useState('');
    const [infusionTime, setInfusionTime] = useState('');
    const [infusionRate, setInfusionRate] = useState('');

    const calDose = () => {


        const weight = parseFloat(patientWeight);
        const dose = weight * 100;     //fixed dose of 100 mg per kg

        const calMab = dose/2;  //half of dose for mab and other half nacl
        const calNacl = dose/2;
        const calTotal = calMab + calNacl;

        const calInfusionTime = 2; //time in hours
        const calInfusionRate = calTotal / calInfusionTime;  //ml per hour

        setMabVol(calMab.toFixed(2));
        setNaclVol(calNacl.toFixed(2));
        setTotalVol(calTotal.toFixed(2));
        setInfusionTime(calInfusionTime);
        setInfusionRate(calInfusionRate.toFixed(2));


    };


    return (

        <div className="homepage-container">
        <h1>HCP - Weight based</h1>

        <div className="calculator-bar">
            <label>Patient weight (kg): </label>
            <input
            type="number"
            value={patientWeight}
            onChange={(e) => setPatientWeight(e.target.value)}
            placeholder="patient weight in kg"/>

            <button onClick={calDose}>INFUSION</button>

        
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
                    <td>Weight</td>
                    <td>{patientWeight} Kg</td>
                </tr>

                <tr>
                    <td>Mab Volume</td>
                    <td>{mabVol} ml</td>
                </tr>

                <tr>
                    <td>Volume of 0.9% NaCl:</td>
                    <td>{naclVol} ml</td>
                </tr>

                <tr>
                    <td>Total Volume (Dose):</td>
                    <td>{totalVol} ml</td>
                </tr>
                
                <tr>
                    <td>Minimum Infusion Time (hr):</td>
                    <td>{infusionTime} hours</td>
                </tr>

                <tr>
                    <td>Maximum Infusion Rate (ml/hr)</td>
                    <td>{infusionRate} ml/hr</td>
                </tr>

            </tbody>
        </table>



        <Link to="/treatment-calendar">
        <button className="CALENDAR">CALENDAR</button>
      </Link>

      <Link to="/PreparationGuidance">
        <button className="GUIDANCE">PREPARATION</button>
      </Link>
    </div>



        

    );



};

export default HcpRegistration;