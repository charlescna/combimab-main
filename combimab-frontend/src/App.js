

import './App.css';
import HomePage from "./pages/HomePage";
import InfusionSpecification from './pages/InfusionSpecification';
import HcpRegisteration from './pages/HcpRegisteration';
import PreparationGuidance from './pages/PreparationGuidance';
import TreatmentCalnder from './pages/TreatmentCalender';
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <div id= "page-body" >
            <Routes>
              <Route path ="/" element={<HomePage/>} />
              <Route path="/HcpRegisteration" element={<HcpRegisteration />} />
              <Route path="/InfusionSpecification" element={<InfusionSpecification />} />
              <Route path="/PreparationGuidance" element={<PreparationGuidance />} />
              <Route path="/TreatmentCalender" element={<TreatmentCalnder/>} />        
            </Routes>
          </div>
        </div>
      </BrowserRouter>

  );
}
export default App;
