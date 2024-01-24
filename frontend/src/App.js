import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import Landing_page from './components/Landing_page';
import theme from './components/Animations/CustomTheme';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  return (
    <Router>
      <div>
        <Navbar onLoginOpen={handleLoginOpen} onRegisterOpen={handleRegisterOpen} />
      
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
