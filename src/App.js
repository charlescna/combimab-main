import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import HcpRegistration from "./Pages/HcpRegistration";
import TreatmentCalendar from './Pages/TreatmentCalendar';
import Preperation from "./Pages/Preperation";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
 
          <div id= "page-body" >
              <Routes>
                <Route path ="/" element={<HomePage/>} />
              </Routes>
          </div>
 
          <div id="Calculation">
            <Routes>
              <Route path="/hcp-support-button" element={<HcpRegistration/>}/>
            </Routes>
          </div>

          <div id="prep">
            <Routes>
              <Route path="/PreparationGuidance" element={<Preperation />} />
            </Routes>
          </div>

          <div id="calendar">
            <Routes>
              <Route path="/treatment-calendar" element={<TreatmentCalendar />} />
            </Routes>

          </div>


        </div>
      </BrowserRouter>
 
  );
}
export default App;
