
import { Navigate ,Link } from "react-router-dom";

import '../App.css';

const About = ()=> 
{
    return(
    <div className="homepage-container">
    <h1>
      Living with a rare disease like (PN) can be a challenge, but the more you know about PN, the better you may be able to manage
    </h1>
    <h2>
      Nmab® 300 mg/3m is designed for long-acting medication to control PN symptoms
    </h2>
    <h2>
      Combimab is a Web App for Dose Management, providing a very convenient tool to calculate dose infusions, specifications, and steps for preparation, and generate dosing schedule calendars
    </h2>
    <h2>
      To get HCP Support and calculate dose specifications, please go to the login page
    </h2>

      <Link to="/loginpage">
        <button className="hcp-support-button">Google Sgin in</button>
      </Link>  

    </div>
 );
}
export default About;
