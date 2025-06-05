const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ecommerce'
});

// FIXED: Use parameterized queries to prevent SQL injection
function authenticateUser(username, password) {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
  return new Promise((resolve, reject) => {
    connection.query(query, [username, password], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results.length > 0 ? results[0] : null);
    });
  });
}

// FIXED: Added input validation and parameterized query
function getUserOrders(userId) {
  // Validate input
  if (!userId || isNaN(parseInt(userId))) {
    throw new Error('Invalid user ID provided');
  }
  
  const query = 'SELECT * FROM orders WHERE user_id = ?';
  
  return new Promise((resolve, reject) => {
    connection.query(query, [parseInt(userId)], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = { authenticateUser, getUserOrders };