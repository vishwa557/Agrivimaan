// userRoutesHandler.js
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Route for user registration
router.post('/register', userService.registerUser);

// Route for user login
router.post('/login', userService.loginUser);

module.exports = router;
