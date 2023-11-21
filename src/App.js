import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import HcpRegistration from "./Pages/HcpRegistration";


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
              <Route path='/hcp-support' element={<HcpRegistration/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
 
  );
}
export default App;
