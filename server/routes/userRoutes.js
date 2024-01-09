// userRoutes.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
  try {
    const userData = req.body;
    // console.log(userData);
    const user = await userService.registerUser(userData);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone_number, Password } = req.body;
 
    const result = await userService.loginUser(phone_number, Password);
    res.status(200).json({ message: 'Login successful', token: result.token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
