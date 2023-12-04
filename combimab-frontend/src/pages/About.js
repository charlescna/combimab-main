
import { Navigate ,Link } from "react-router-dom";

import '../App.css';

const About = ()=> 
{
    return(
    <div className="homepage-container">
      <h1>Combimab is web App For Rare disease PN dose Managment of the Mab medication </h1>
      <h1>To get HCP Support and calcuate the doses specification please go to log in page</h1>

        <Link to="/loginpage">
            <button className="hcp-support-button">log in</button>
        </Link>


    </div>
 );
}
export default About;
