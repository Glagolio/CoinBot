const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userCoin",
});

async function getUserById(userId) {
  try {
    connection.query("SELECT * FROM `products`", function (err, results) {
      console.log(results);
    });
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}
// https://github.com/sidorares/node-mysql2

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database.");
  }
});

module.exports = connection;
