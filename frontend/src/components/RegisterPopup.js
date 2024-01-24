import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

const Register = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const handleRegisterSubmit = async () => {
    try {
      console.log(name, phoneNumber, password, address);
      const response = await axios.post('http://localhost:8000/users/register', {
        Name: name,
        phone_number: phoneNumber,
        Password: password,
        address: address,
      });

      console.log('Register response:', response.data);
      if (response.status === 200) {
        // Handle successful registration, e.g., show a success message
        console.log('Registration successful');
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error('Registration failed');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during registration:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Register
        </Typography>
      </DialogTitle>
      <DialogContent>
        <section className="flex flex-col justify-center items-center my-2 mx-5">
          <div className="max-w-md">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
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
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="text-center mt-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleRegisterSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </section>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Register;
