const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "bar-c-kennels.c7hvzmah9kx9.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "ACA2023!",
  database: "db1",
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
