const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const droneRoutes = require('./routes/droneRoutes')
const DroneInventory = require('./models/droneModel');

// Middleware to parse JSON data
app.use(express.json());

DroneInventory.createTable()
// Routes
app.use('/users', userRoutes);
app.use('/drones', droneRoutes);
// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
