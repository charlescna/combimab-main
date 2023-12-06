import { useState, useEffect } from 'react';
import { Navigate ,Link } from "react-router-dom";
import '../App.css';

export function LoginPage() {
    
    const [googleURL, setGoogleURL] = useState('');

    useEffect( () => {
        fetch("/api/google/oauthURL")
        .then(
            
            response =>  {
                if( !response.ok) {
                    let code = response.status.toString();
                    throw new Error( `${code} ${response.statusText}`);
                }
                return response.json();

        })
        .then( data => setGoogleURL(data.url))
        .catch( e => {
            console.log("Error!!!");
            console.log(e.message);
            localStorage.clear();
            return (<h2>Error getting OAUTH url</h2>)    
        });
        
      }, [])


    const onLoginClicked = async () => {
        window.location.href = googleURL;
    }

    const onLogOutClicked = () => {
        localStorage.removeItem("token");
    }


    return (
        <div className="dose-table">
          <h2>Welcome to Combimab!</h2>
          <p>Please log in to access Dose Managmet</p>
          <button class="hcp-support-button" disabled={!googleURL} onClick={onLoginClicked}>
            Login with Google
          </button>
          <br />
          <button class="hcp-support-button" onClick={onLogOutClicked}>Logout</button>
          <br />
          {/* You can add a message div for success or error messages */}
        </div>
      );
    }


