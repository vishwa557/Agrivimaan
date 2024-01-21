import React, { useState } from 'react';
import axios from 'axios'
import { Dialog, DialogTitle, DialogContent,Typography, DialogActions, TextField, Button } from '@mui/material';
const apiUrl = "http://localhost/8000/users";

const Login = ({ open, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async () => {
    try {
      console.log('HI')
      const response = await axios.post(`${apiUrl}/login`, {
        phoneNumber,
        password,
      });
  
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
  
        // Now you can handle the data, for example, storing the access token in local storage
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
      
       
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error('Login failed');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error during login:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5" color="primary">
          Welcome Back!
        </Typography>
        Login
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          Enter your credentials to access your account.
        </Typography>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLoginSubmit} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
