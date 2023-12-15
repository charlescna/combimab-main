

import './App.css';
import NavBar from './NavBar';
import HomePage from "./pages/HomePage";
import { LoginPage } from './pages/LoginPage';

import About from './pages/About';
import InfusionSpecification from './pages/InfusionSpecification';
import HCPRegistration from './pages/HCPRegistration'
import PreparationGuidance from './pages/PreparationGuidance';
import TreatmentCalnder from './pages/TreatmentCalender';
import NotFoundPage from './pages/NotFoundPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserList } from './pages/HCPRegistration';
import { useState } from 'react';


function App(){

// const [users, setUsers] = useState(null);
    //const [token, setToken] = useState(null)
  const useToken = () => {
    const [token, setTokenInternal] = useState(()=> {
      return localStorage.getItem('token');
    });

    const setToken = newToken => {
      if( newToken ) {
        localStorage.setItem('token', newToken);
      }
      else {
        localStorage.clear();
      }
      setTokenInternal(newToken);
    }
    return [token, setToken];
  }

  const [token, setToken] = useToken();

  return (
      <BrowserRouter>
        <div className="App">
          <NavBar token={token} setToken={setToken}/>
          <div id= "page-body" >
            <Routes>
              <Route path ="/" element={<HomePage/>} />
              <Route path="/About" element={<About/>} /> 
              <Route path="/loginpage" element={<LoginPage/>} /> 
              <Route path="/Hcpregisteration" element={< HCPRegistration token={token} setToken={setToken}/>} />
              <Route path="/InfusionSpecification" element={<InfusionSpecification token={token} setToken={setToken}/>} />
              <Route path="/PreparationGuidance" element={<PreparationGuidance />} />
              <Route path="/TreatmentCalender" element={<TreatmentCalnder/>} />  
              <Route path="*" element={<NotFoundPage/>} />
              
                              
            </Routes>
          </div>
        </div>
      </BrowserRouter>

  );
}
export default App;
