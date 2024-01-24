// Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Transition from './Animations/Transitions';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        phoneNumber,
        password,
      });

      console.log('Login response:', response.data);
      if (response.status === 200) {
        const data = response.data;
        console.log(data);

        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLoginClose =() => {
    setOpen(false);
    navigate('/');
  }

  const handleRegisterRedirect = () => {
    // You can use the navigate function to redirect to the registration page
    navigate('/register');
  };

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle>
        <Typography variant="h5" color="primary" className='text-black'>
          Welcome Back!
        </Typography>
        Login
      </DialogTitle>
      <DialogContent>
        <section className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          <div className=" ">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <a
                className="text-black hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center md:text-left">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleLoginSubmit}
              >
                Login
              </button>
            </div>
          </div>
          
        </section>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account?{' '}
          <button
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={handleRegisterRedirect}
          >
            Register
          </button>
        </div>

      </DialogContent>
      
      <DialogActions>
        
        <Button onClick={() => handleLoginClose()} color="inherit">
          Cancel
        </Button>
        
      </DialogActions>
    </Dialog>
    
  );
};

export default Login;
