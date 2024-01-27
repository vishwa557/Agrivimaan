const db = require('../../config/db');

class User {
  constructor(user) {
    this.UserID = user.id;
    this.Name = user.Name;
    this.phone_number = user.phone_number;
    this.Password = user.Password;
    this.address = user.address;
  }

  static createUser(newUser) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", newUser, (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            reject({ message: "Phone number already exists" });
          } else {
            console.error(err);
            reject(err);
          }
        } else {
          resolve({ id: results.insertId, ...newUser });
        }
      });
    });
  }

  static getUserByPhoneNumber(phone_number) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE phone_number = ?",
        [phone_number],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  }
  static createTable() {
    return new Promise((resolve, reject) => {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          UserID INT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(255) NOT NULL,
          phone_number VARCHAR(20) NOT NULL,
          Password VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL
        )
        `;
        db.query(createTableQuery, (err, result) => {
          if (err) {
            reject(err);
          } else {
           console.log("User table created successfully")
            resolve(result);
          }
        });
      });
  }
  static updatePassword(phone_number, newPassword) {
    return new Promise((resolve, reject) => {
      // Assuming 'users' table structure has 'phone_number' as a unique identifier
      db.query(
        "UPDATE users SET Password = ? WHERE phone_number = ?",
        [newPassword, phone_number],
        (err, results) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (results.affectedRows === 0) {
              reject({ message: "Phone number not found" });
            } else {
              resolve({ message: "Password updated successfully" });
            }
          }
        }
      );
    });
  }
  
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}


module.exports = User;

