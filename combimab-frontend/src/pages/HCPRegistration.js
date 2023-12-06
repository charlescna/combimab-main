import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function UserList( {users, setUsers} ) {
  // Check if there is a query parameter "token", and if there is, store it in local storage
  const [searchParams, setSearchParams] = useSearchParams();
  const oauthToken = searchParams.get('token');
  if (oauthToken) {
      localStorage.setItem('token', oauthToken);
      searchParams.delete('token');
      setSearchParams(searchParams);
    }

    useEffect( () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch("/api/register", requestOptions)
      .then(
          
          response =>  {
              if( !response.ok) {
                  let code = response.status.toString();
                  throw new Error( `${code} ${response.statusText}`);
              }
              return response.json();

      })
        .then(users => setUsers(users))
        .catch( e => {
            console.log("Error!!!");
            console.log(e.message);
            localStorage.clear();
            return (<Navigate to="/loginPage" replace={true} />)    
        });
        
      }, [])
    
      const token = localStorage.getItem('token');


      if( !token) {
          return (<Navigate to="/Hcpregisteration" replace={true} />)
          
      }
      else {
          
            if( users == null ) return;       
      }
    }




const HCPRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    specialty: '',
  });
const [registrationSuccess, setRegistrationSuccess] = useState(false);  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const isFormValid = () => {

    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.email.includes('@') && // Check for @ in email
      formData.phoneNumber.trim() !== '' &&
      !isNaN(formData.phoneNumber) && // Check if phone number contains only numbers
      formData.address.trim() !== '' &&
      formData.specialty.trim() !== ''
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert('Please fill in all fields correctly before submitting.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, show a success message, etc.
        setRegistrationSuccess(true);
      } else {
        // Handle errors
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div >
      {registrationSuccess ? (
        <div>
          <h2>Welcome, {formData.name}! </h2>
          <p>Your registration was successful. What would you like to do next?</p>
          <Link to="/InfusionSpecification">
            <button className="GUIDANCE">Infusion Information</button>
          </Link>
          <Link to="/TreatmentCalender">
            <button className="CALENDAR">Treatment Calendar</button>
          </Link>
          <Link to="/PreparationGuidance">
           <button className="GUIDANCE">Preperation Steps</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Welcome to Combimab! Please fill in the details:</h2>
          <table class="dose-table">
            {/* Input fields for name, email, zip code, phone number, address, and specialty */}
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name"/>
            </div>

            <div>
              <label>Email:</label>
              <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email (e.g., example@example.com)"/>
            </div>

            <div>
              <label>Phone Number:</label>


              <input type="text"name="phoneNumber" value={formData.phoneNumber}onChange={handleInputChange}placeholder="Enter your phone number (numbers only)"/>
            </div>

            <div>
              <label>Address:</label>
              <input
                type="text" name="address"value={formData.address} onChange={handleInputChange}placeholder="Enter your address" />
            </div>

            <div>
              <label>Specialty:</label>
              <input
                type="text" name="specialty" value={formData.specialty} onChange={handleInputChange}placeholder="Enter your specialty"/>
            </div>

          
              <button type="submit" className="CALENDAR">
                Register
              </button>
            <div>    </div>
            
          </table>
        </form>
      )}
    </div>
  );
};

export default HCPRegistration;