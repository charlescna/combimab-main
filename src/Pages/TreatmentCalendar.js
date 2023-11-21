import React, {useState} from 'react';
import './TreatmentCalendar.css';


const TreatmentCalendar = ()=> {
    const [patientWeight, setPatientWeight] = useState('');
    const [startingDate, setStartingDate] = useState(new Date().toISOString().slice(0, 10));
    const [treatmentDuration, setTreatmentDuration] = useState('');



    //generate calendar

    const [calendar, setCalendar] = useState([]);

    // form submission and generate calendar
    const handleGenerateCalendar = () => {
        // calculate the end date based on the selected duration

        const endDate = new Date(startingDate);
        endDate.setMonth(endDate.getMonth() + parseInt(treatmentDuration));


        //Generate calendar


        const generatedCalendar = [];

        let currentDate = new Date(startingDate);
        while (currentDate <= endDate) {
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('default', { month: 'short'});
            const year = currentDate.getFullYear();

            //Check if day is Sunday and add 3 
            const adjustedDay = currentDate.getDay() === 0 ? day + 3 : day;

            generatedCalendar.push(`${adjustedDay} ${month} ${year}`);

            // Move to the next dose date (57 days later)

            currentDate.setDate(currentDate.getDate() + 57);


        }

        setCalendar(generatedCalendar);
    };



    return (
    

        <div className='treatment-calendar-page'>
            <h2>HCP Support</h2>

            <div className='form-container'>
                <label>Patient Weight</label>
                <input
                type='text'
                value={patientWeight}
                onChange={(e) => setPatientWeight(e.target.value)} />

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
                            
                            <button>Download Saftey Card</button>
                    </div>
                           

                    

    );
};
export default TreatmentCalendar;











