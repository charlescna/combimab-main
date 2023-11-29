import React, { useState } from "react";
import { Link ,Navigate,useNavigate} from "react-router-dom";
import '../App.css';



const HcpRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    speciality: '',
    zipcode: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState('');

  const history = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data);
        setRegistrationMessage('User registered successfully');
        Navigate('/InfusionSpecification');
      } else {
        console.error('Error registering user');
        setRegistrationMessage('Error registering user');
        
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationMessage('Error registering user');
      
    }
  };
  
    return (
      <div className="homepage-container">
        <h1>HCP Registeration Form</h1>
        {registrationMessage && <p>{registrationMessage}</p>}
        <form onSubmit={handleSubmit}>
        <label className="form-label">
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}className="form-input" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange}className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Phone Number:
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Speciality:
          <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} className="form-input"/>
        </label>
        <br />
        <label className="form-label">
          Zipcode:
          <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} className="form-input" />
        </label>
        <br />
        <button type="REGISTER" className="GUIDANCE">REGISTER</button>
      </form>

        <Link to="/InfusionSpecification" className="GUIDANCE">
          Calcuate Infusion
        </Link>

      </div>
    );
  };
  
  export default HcpRegistration;
  