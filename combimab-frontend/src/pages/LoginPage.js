import { useState, useEffect } from 'react';
import { Navigate ,Link } from "react-router-dom";
// import mongoose from 'mongoose';
// import { connectToDatabase,getCollection } from './db.js';
import '../App.css';

export function LoginPage() {
    
    const [googleURL, setGoogleURL] = useState('');
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    useEffect( () => {
      fetch("/api/google/oauthURL")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then( (data) => setGoogleURL(data.url))
        .catch( e => {
            // console.log("Error!!!");
            // console.log(e.message);     
          
        });
        
     

      const oauthToken = new URLSearchParams(window.location.search).get('token');
      if (oauthToken) {
        fetch('/api/checkRegistration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: oauthToken }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.isUserRegistered) {
              setIsUserRegistered(true);
              <Navigate to="/InfusionSpecification.js" replace={true} />
            } else {
              setIsUserRegistered(false);
            }
          })
          .catch((error) => {
            console.error('Error checking registration:', error);
           
          });
      }
    }, []);

    const onLoginClicked = async () => {
        window.location.href = googleURL;
    }



    return (
        <div className="dose-table">
          <h2>Welcome to Combimab!</h2>
          <p>Please log in to access Dose Managmet</p>
          {isUserRegistered ? (
        <div>
          <p>User is already registered. Redirecting...</p>
          <Link to="/InfusionSpecification.js">Explore the Options</Link>
        </div>
      ) : (
        <button className="hcp-support-button" disabled={!googleURL} onClick={onLoginClicked}>
          Login with Google
        </button>
      )}

    </div>
  );
}


