const db = require('../../config/db');

class Orders {
  constructor(order) {
    this.OrderID = order.OrderID;
    this.UserID = order.UserID;
    this.UserName = order.UserName;
    this.ProductID = order.ProductID;
    this.OrderQuantity = order.OrderQuantity;
    this.TotalAmount = order.TotalAmount;
    this.OrderDate = order.OrderDate;
    this.Address = order.Address;
    this.OrderStatus = order.OrderStatus;
}
  static createOrder(newOrder) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Orders SET ?';
      db.query(query, newOrder, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getAllOrders() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders';
      db.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static getOrderById(OrderID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders WHERE OrderID = ?';
      db.query(query, [OrderID], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static getOrderByUserId(UserID) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM Orders WHERE UserID = ?';
      db.query(query, [UserID], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }


  static deleteOrder(orderId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM Orders WHERE OrderID = ?';
      db.query(query, [orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateOrder(orderId, updatedOrder) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET ? WHERE OrderID = ?';
      db.query(query, [updatedOrder, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static updateOrderStatus(orderId, orderStatus){
    return new Promise((resolve, reject) => {
      const query = 'UPDATE orders SET OrderStatus = ? WHERE OrderID = ?';
      db.query(query, [orderStatus, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static cancelOrder(orderId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE Orders SET orderStatus = ? WHERE OrderID = ?';
      const orderStatus = 'Cancelled';
      db.query(query, [orderStatus, orderId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static createOrdersTable() {
    return new Promise((resolve, reject) => {
      const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Orders (
        OrderID INT AUTO_INCREMENT PRIMARY KEY,
        UserID INT,
        UserName VARCHAR(255),
        ProductID INT,
        OrderQuantity INT,
        TotalAmount DECIMAL(10, 2),
        OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        Address VARCHAR(255),
        OrderStatus ENUM('Pending', 'Packed', 'Dispatched', 'Delivered', 'Cancelled') DEFAULT 'Pending',
        FOREIGN KEY (UserID) REFERENCES users(UserID),
        FOREIGN KEY (ProductID) REFERENCES DroneInventory(drone_id)
    )`;
      db.query(createTableQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log("Orders table created successfully");
          resolve(result);
        }
      });
    });
  }
  
}

module.exports = Orders;
