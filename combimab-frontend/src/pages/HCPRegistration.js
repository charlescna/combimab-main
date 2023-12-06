import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


// export function UserList( {users, setUsers} ) {
//   // Check if there is a query parameter "token", and if there is, store it in local storage
//   const [searchParams, setSearchParams] = useSearchParams();
//   const oauthToken = searchParams.get('token');
//   if (oauthToken) {
//       localStorage.setItem('token', oauthToken);
//       searchParams.delete('token');
//       setSearchParams(searchParams);
//     }

//     useEffect( () => {
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'));

//       const requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow',
//       };

//       fetch("/api/users", requestOptions)
//       .then(
          
//           response =>  {
//               if( !response.ok) {
//                   let code = response.status.toString();
//                   throw new Error( `${code} ${response.statusText}`);
//               }
//               return response.json();

//       })
//         .then(users => setUsers(users))
//         .catch( e => {
//             console.log("Error!!!");
//             console.log(e.message);
//             localStorage.clear();
//             return (<Navigate to="/loginPage" replace={true} />)    
//         });
        
//       }, [])
    
//       const token = localStorage.getItem('token');


//       if( !token) {
//           return (<Navigate to="/InfusionSpecification" replace={true} />)
          
//       }
//       else {
          
//             if( users == null ) return;       
//       }
//     }




const HCPRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    specialty: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        // Handle success, show a success message, etc.
        console.log('Registration successful!');
      } else {
        // Handle errors
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Welcome!to Combimab Please fill in the details:</h2>
    <form onSubmit={handleSubmit}>
      <table className="dose-table">  </table>
        {/* Input fields for name, email, zip code, phone number, address, and specialty */}
        <div>
     
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
        </div>



        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </div>

        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        </div>

        <div>
          <label>Specialty:</label>
          <input type="text" name="specialty" value={formData.specialty} onChange={handleInputChange} />
        </div>
   
      <button type="submit" className="CALENDAR">Register</button>    
    </form>  

    <Link to="/loginpage">
      <button type="submit" className="GUIDANCE">Google Sgin in</button>
    </Link>
 
      
    </div>
  );
};

export default HCPRegistration;
