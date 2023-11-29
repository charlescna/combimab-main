
import '../PreperationSteps.css'
import React from 'react';
import GridLayout from 'react-grid-layout';

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


// Replace the icon property with the image property
const stepsData = [
  { image: image1, description: 'Patient Weight' },
  { image: image2, description: 'Determine how many vials are needed based on patient weight. Vials should be stored at refrigeration (2 -8C, 36 -46F), protected from light '
  },
  { image: image3, description: 'Allow vials to come room temperature (18 -25C, 64 -77F) naturally without using any heat source' },
  { image: image4, description: 'Visually inspect each vial to be sure there is no particulate or percipitate (if either, do not use)' },
  { image: image5, description: 'Using aseptic technique, withdraw the volume of Nmab corresponding to the prescribed dose) from the appropriate number of vials and add to an equal volume (1:1) of 0.9% Sodium Chloride Injection, USP, in an infusion bag\n ULTOMIRIS requires dilution to a final concentration of 50 mg/mL for the 3 mL' },
  { image: image6, description: 'Step 6: Check prescription' },
  { image: image7, description: 'Step 7: Ensure safety measures' },
  { image: image8, description: 'Step 8: Reference medical book' },
  { image: image9, description: 'Step 9: Consult medical professional' },
];

// Replace the FontAwesomeIcon component with the img component
const renderStep = (step, index) => {
  return (
    <div key={index} className="step">
      <img src={step.image} className="step-image" />
      <p className="step-description">{step.description}</p>
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
        <div key="descriptions" className="descriptions">
          {stepsData.map((step, index) => renderStep(step, index))}
        </div>
      </GridLayout>
    </div>
  );
};

export default PreparationSteps;
