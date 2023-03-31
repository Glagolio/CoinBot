const mysql = require("mysql2");

// TO PROCESS.ENV

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userCoin",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Connected to database.");
  }
});

module.exports = connection;
