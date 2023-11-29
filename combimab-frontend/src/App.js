

import './App.css';
import HomePage from "./pages/HomePage";
import InfusionSpecification from './pages/InfusionSpecification';
import {BrowserRouter, Route, Routes} from "react-router-dom";


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
              <Route path='/hcp-support' element={<InfusionSpecification/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>

  );
}
export default App;
