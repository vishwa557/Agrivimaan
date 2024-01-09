const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'agrivimaan',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');

  // Create 'users' table if it doesn't exist
  const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      Password VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'user'
    )
  `;

  db.query(createUserTableQuery, (err) => {
    if (err) throw err;
    console.log('Users table created or already exists');
  });


});

module.exports = db;
