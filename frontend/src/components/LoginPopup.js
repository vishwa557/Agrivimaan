import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent,Typography, DialogActions, TextField, Button } from '@mui/material';
const apiUrl = "http://localhost/8000/users";

const Login = ({ open, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async () => {
    try {
      // Replace 'your-api-endpoint' with the actual login API endpoint
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);

        onClose();
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
