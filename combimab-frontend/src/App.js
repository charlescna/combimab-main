

import './App.css';
import NavBar from './NavBar';
import HomePage from "./pages/HomePage";
import { LoginPage } from './pages/LoginPage';

import About from './pages/About';
import InfusionSpecification from './pages/InfusionSpecification';
import HcpRegisteration from './pages/HcpRegisteration';
import PreparationGuidance from './pages/PreparationGuidance';
import TreatmentCalnder from './pages/TreatmentCalender';
import NotFoundPage from './pages/NotFoundPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserList } from './pages/HcpRegisteration';
import { useState } from 'react';


function App(){

const [users, setUsers] = useState(null);

  return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <div id= "page-body" >
            <Routes>
              <Route path ="/" element={<HomePage/>} />
              <Route path="/About" element={<About/>} /> 
              <Route path="/loginpage" element={<LoginPage/>} /> 
              <Route path="/Hcpregisteration" element={<HcpRegisteration />} />
              <Route path="/InfusionSpecification" element={<InfusionSpecification />} />
              <Route path="/PreparationGuidance" element={<PreparationGuidance />} />
              <Route path="/TreatmentCalender" element={<TreatmentCalnder/>} />  
              <Route path="*" element={<NotFoundPage/>} />
              {/* <Route path="/HcpRegisteration" element={<UserList users={users} setUsers={setUsers}/>}/> */}
                              
            </Routes>
          </div>
        </div>
      </BrowserRouter>

  );
}
export default App;
