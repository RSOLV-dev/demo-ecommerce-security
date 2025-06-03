const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ecommerce'
});

// VULNERABLE: Direct string concatenation allows SQL injection
function authenticateUser(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
}

// Additional vulnerable endpoint
function getUserOrders(userId) {
  // VULNERABLE: No input validation
  const query = `SELECT * FROM orders WHERE user_id = ${userId}`;
  
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

module.exports = { authenticateUser, getUserOrders };
