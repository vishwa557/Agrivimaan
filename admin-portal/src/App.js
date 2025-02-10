import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import PilotCreation from './components/PilotCreation'
import Login from './components/Login'
import LandingPage from './components/Landingpage/LandingPage';
import Home from './components/Admin/Home';
import Orders from './components/Admin/Orders';
import Customers from './components/Admin/Customers';
import RepairRequests from './components/Admin/RepairRequests';
import SprayingRequests from './components/Admin/SprayingRequests';
import Pilots from './components/Admin/Pilots';
// import './App.css'

function App() {
  const [orderCount, setOrderCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0);
  const [pilotsCount, setPilotsCount]= useState(0)
  const [repaireRequestCount, setRepaireRequestCount] = useState(0);
  const [sprayingRequestCount, setSprayingRequestCount] = useState(0);
  const token = localStorage.getItem('accessToken');

  return (
    <Router>
     <Navbar/>
     
     <Routes>
     {token?(<Route path="/" element={<Home orderCount={orderCount} usersCount={usersCount} pilotsCount={pilotsCount} repaireRequestCount={repaireRequestCount} sprayingRequestCount={sprayingRequestCount}/>} />)
     :(<Route path="/landing_page" element={<LandingPage/>}/>)}
     <Route path="/login" element={<Login />} />
     <Route path='/pilot-creation' element = {<PilotCreation />}/>
     <Route path="/orders" element={<Orders orderCount={orderCount} setOrderCount={setOrderCount}/>} />
     <Route path="/customers" element={<Customers usersCount={usersCount} setUsersCount={setUsersCount}/>} />
     <Route path="/repair-request" element={<RepairRequests repaireRequestCount={repaireRequestCount} setRepaireRequestCount ={setRepaireRequestCount}/>} />
     <Route path="/spraying-request" element={<SprayingRequests sprayingRequestCount={sprayingRequestCount} setSprayingRequestCount={setSprayingRequestCount}/>} />
     <Route path="/pilots" element={<Pilots pilotsCount={pilotsCount}  setPilotsCount={setPilotsCount}/>} />
     </Routes>
   
     </Router>
   
  );
}

export default App;


 