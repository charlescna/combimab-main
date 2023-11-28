import React, { useState } from "react";
import {Link} from 'react-router-dom';
import '../App.css';
import '../TreatmentCalendar.css';
const TreatmentCalendar = () => {
  const [patientWeight, setPatientWeight] = useState('');
  const [startingDate, setStartingDate] = useState(new Date().toISOString().slice(0, 10));
  const [treatmentDuration, setTreatmentDuration] = useState('');
  const [calendar, setCalendar] = useState([]);
  const [calendarGenerated, setCalendarGenerated] = useState(false); // New state for user feedback

  const handleGenerateCalendar = () => {
    if (!validateInputs()) {
      return; // Stop execution if inputs are invalid
    }

    const endDate = new Date(startingDate);
    endDate.setMonth(endDate.getMonth() + parseInt(treatmentDuration));

    const generatedCalendar = [];
    let currentDate = new Date(startingDate);

    while (currentDate <= endDate) {
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      const adjustedDay = currentDate.getDay() === 0 ? day + 3 : day;

      generatedCalendar.push(`${adjustedDay} ${month} ${year}`);
      currentDate.setDate(currentDate.getDate() + 57);
    }

    setCalendar(generatedCalendar);
    setCalendarGenerated(true); // Set state to true after generating calendar
  };

  const validateInputs = () => {
    // Validate patient weight
    const weightRegex = /^\d*\.?\d*$/;
    if (!weightRegex.test(patientWeight)) {
      alert('Please enter a valid patient weight.');
      return false;
    }

    // Validate starting date
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startingDate)) {
      alert('Please enter a valid starting date.');
      return false;
    }

    // Validate treatment duration
    if (!treatmentDuration) {
      alert('Please select a treatment duration.');
      return false;
    }

    return true;
  };

  return (
    <div className='treatment-calendar-page'>
      <h2>HCP Support</h2>

      {/*Add a back button to go to the home page */}

      <Link to='/'>
        <button className="back-button">Back to Home</button>
      </Link>

      <div className='form-container'>
        <label>Patient Weight</label>
        <input
          type='text'
          value={patientWeight}
          onChange={(e) => setPatientWeight(e.target.value)}
        />

        <label>Starting Date</label>
        <input
          type='date'
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
        />

        <label>Treatment Duration</label>
        <select
          value={treatmentDuration}
          onChange={(e) => setTreatmentDuration(e.target.value)}
        >
          <option value=''>Select Duration</option>
          <option value='6'>6 Months</option>
          <option value='12'>12 Months</option>
          <option value='18'>18 Months</option>
          <option value='24'>24 Months</option>
        </select>

        <button onClick={handleGenerateCalendar}>Generate Calendar</button>
      </div>

      {calendarGenerated && (
        <div>
          <div className='calendar-container'>
            <h2>Treatment Regimen Calendar</h2>
          </div>

          <div className='calendar'>
            {calendar.map((date, index) => (
              <div key={index} className='calendar-date'>
                {date}
              </div>
            ))}
          </div>

          <button>Download Safety Card</button>
        </div>
      )}
    </div>
  );
};

export default TreatmentCalendar;

