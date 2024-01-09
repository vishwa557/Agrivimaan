const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const DroneInventory = require('./models/droneModel');

// Middleware to parse JSON data
app.use(express.json());

DroneInventory.createTable()
// Routes
app.use('/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
