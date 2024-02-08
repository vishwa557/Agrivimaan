import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import Landing_page from './components/Landing_page';
import theme from './components/Animations/CustomTheme';
import ServiceRequestForm from './components/ServiceRequestForm'
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import DroneRepairForm from './components/DroneRepairForm';
import DroneSprayingForm from './components/DroneSprayingForm';
import DroneList from './components/Products';
import ShoppingCart from './components/ShoppingCart';

export const store = createContext();
function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <div>
        <Navbar/>
        {/* <store.Provider value={[cartItems, setCartItems]}>
          <DroneList />
          <ShoppingCart />
          </store.Provider> */}
      
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/service-1" element={<ServiceRequestForm />} />
          <Route path="/register" element={<RegisterPopup  />} />
          <Route path="/drone-repair-form" element={<DroneRepairForm  />} />
          <Route path="/drone-spraying-form" element={<DroneSprayingForm  />} />
          <Route path="/drones" element={<DroneList c/>} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
         
          {/* <Route path="/success/:successMessage" element={<Success />} /> */}

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
