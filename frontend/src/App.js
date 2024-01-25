import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import Landing_page from './components/Landing_page';
import theme from './components/Animations/CustomTheme';

function App() {


  return (
    <Router>
      <div>
        <Navbar/>
      
        <Routes>
          <Route path="/" element={<Landing_page />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/register" element={<RegisterPopup  />} />
        </Routes>
      
      </div>
    </Router>
  );
}

export default App;
