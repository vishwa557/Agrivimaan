// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import MyCarousel from './components/Carousel';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup'; // Assuming you have a RegisterPopup component
import Landing_page from './components/Landing_page';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  return (
    <Router>
      <div>
        <Navbar onLoginOpen={handleLoginOpen} onRegisterOpen={handleRegisterOpen} />
        <MyCarousel />
        <Landing_page />

        <LoginPopup open={loginOpen} onClose={handleLoginClose} />
        <RegisterPopup open={registerOpen} onClose={handleRegisterClose} />
      </div>
    </Router>
  );
}

export default App;
