import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField } from '@mui/material';

const ForgotPassword = () => {
  const [phone_number, setPhoneNumber] = useState('');
  const [open, setOpen] = useState(true);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/users/forgot-password', {
        phone_number
      });

      console.log('Password reset response:', response);
      if (response.status === 200) {
        // Password reset initiated successfully
        // Display a message to the user
      } else {
        console.error('Password reset failed');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Handle navigation or closing of dialog
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography variant="h5">
          Forgot Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          type="text"
          placeholder="Enter your phone number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;
