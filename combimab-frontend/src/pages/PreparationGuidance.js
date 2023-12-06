import { Link } from "react-router-dom";

const PreparationGuidance = () => {
    return (
      <div>
        <h1>Step by step guidance for preparation</h1>
        <div>
          <Link to="/TreatmentCalender">
            <button className="CALENDAR">Treatment Calendar</button>
          </Link>
          <Link to="/InfusionSpecification">
            <button className="GUIDANCE">Infusion information</button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default PreparationGuidance;
  