
import { Navigate ,Link } from "react-router-dom";

import '../App.css';

const About = ()=> 
{
  return (
    <div className="homepage-container">
      <h1>Combimab Rare Disease Dose Management App</h1>
      <div className="box">
        <img src="HomePagePhoto.png" alt="Bio" />
        <div className="box-contenta">
          <p>
            Living with a rare disease like (PN) poses its challenges, but the more knowledge you acquire about PN, the better equipped you become to manage its impact on your life.
          </p>
        </div>

        <div className="box-contenta">
          <p>
            Nmab® 300 mg/3m is a breakthrough in long-acting medication, strategically designed to effectively control the symptoms of PN.
          </p>
        </div>

        <div className="box-contenta">
          <p>
            Introducing Combimab, a Web App tailored for Dose Management. This tool offers unparalleled convenience, enabling you to effortlessly calculate dose infusions, access detailed specifications, follow step-by-step preparation guides, and generate personalized dosing schedule calendars.
          </p>
        </div>

        <div className="box-contenta">
          <p>
            Ready to elevate your healthcare experience? To gain Health Care Professional Support and access detailed dose specifications, simply navigate to our login page.
          </p>
          <Link to="/loginpage">
            <button className="hcp-support-button">Google Log in</button>
          </Link>
      </div>
      </div>
    </div>

  );
  
}
export default About;
