// userModel.js
const db = require("../config/db");
const bcrypt = require("bcrypt");

const User = {
  createUser: (newUser) => {
    return new Promise((resolve, reject) => {
      console.log(newUser);
      db.query("INSERT INTO users SET ?", newUser, (err, results) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            reject({ message: "Phone number already exists" });
          } else {
            console.log(err);
            reject(err);
          }
        } else {
          resolve({ id: results.insertId, ...newUser });
        }
      });
    });
  },

  getUserByPhoneNumber: (phone_number) => {
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
  },

  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = User;
