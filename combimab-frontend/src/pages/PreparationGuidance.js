import React from 'react';
import GridLayout from 'react-grid-layout';
import {Link} from "react-router-dom";
// Import the images from the src/Images folder
import image1 from '../Images/image1.png';
import image2 from '../Images/image2.png';
import image3 from '../Images/image3.png';
import image4 from '../Images/image4.png';
import image5 from '../Images/image5.png';
import image6 from '../Images/image6.png';
import image7 from '../Images/image7.png';
import image8 from '../Images/image8.png';
import image9 from '../Images/image9.png';
import '../PreperationSteps.css';

// Replace the icon property with the image property
const stepsData = [
  { image: image1, description: 'Patient Weight' },
  { image: image2, description: 'Determine how many vials are needed based on patient weight.\n Vials should be stored at refrigeration (2 -8C, 36 -46F), protected from light '
  },
  { image: image3, description: 'Allow vials to come room temperature (18 -25C, 64 -77F) naturally without using any heat source' },
  { image: image4, description: 'Visually inspect each vial to be sure there is no particulate or precipitate (if either, do not use)' },
  { image: image5, description: 'Using aseptic technique, withdraw the volume of Nmab corresponding to the prescribed dose) ' },
  { image: image6, description: 'Gently mix the solution by swirling (do not shake or introduce air bubbles)' },
  { image: image7, description: 'Administer the solution immediately to the patient through a 0.2 or 0.22 micron filter' },
  { image: image8, description: 'The length of infusion time will vary based on the dose as determined by the patient\'s weight ' },
  { image: image9, description: 'Monitor patient for 1 hour following infusion to ensure no signs or symptoms of an infusion-related reaction occur' },
];


const renderStep = (step, index) => {
  return (
    <div key={index} className="step">
      <img src={step.image} className="step-image" alt={`Step ${index + 1}`} />
      <div className="step-description">{step.description}</div>
    </div>
  );
};

// The main component that renders the grid layout with two columns
const PreparationSteps = () => {
  // The layout configuration for the grid
  const layout = [
    { i: 'images', x: 0, y: 0, w: 6, h: 10 },
    { i: 'descriptions', x: 6, y: 0, w: 6, h: 10 }
  ];

  return (
    <div className="container">
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30}>
        <div key="images" className="images">
          {stepsData.map((step, index) => renderStep(step, index))}
        </div>  
      </GridLayout>   
      <div className="buttons-containerp">
      <Link to="/InfusionSpecification">
        <button className="CALENDAR">Infusion Calculation</button>
      </Link>

      <Link to="/TreatmentCalender">
        <button className="GUIDANCE">Treatment Calendar</button>
      </Link>
    </div>
  </div>
);
};

export default PreparationSteps;