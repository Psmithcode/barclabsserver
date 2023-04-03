const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 3306,
});
pool.query("select now()", function (err, results) {
  if (err) {
    console.log("we had an error connecting to the database", err);
  } else {
    console.log("Connection established succesfully", results);
  }
});

module.exports = pool;
