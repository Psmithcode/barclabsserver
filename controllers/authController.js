let db = require("../sql/connection");
// let argon = require("argon2");
// const express = require("express");
const jwt = require("jsonwebtoken");
let JWT_SECRET = process.env.JWT_SECRET;

let login = async function (req, res) {
  //   1. get the email and password from the request
  //   2. get the password hash from the db for the email
  //         2a. if no email exists, return 403
  //         2b. if more than 1 email exists, return 500
  //         2c. if exactly 1 email exists, go to #3
  //   3. compare the password to the pasword hash
  //   4. if they matchMedia, return a Token
  //   5. if they do not match, return a 403

  let username = req.body.username;
  // let userId = req.body
  let password = req.body.password;

  let sql = "select password from admins where username = ?";
  let params = [username];
  db.query(sql, params, async function (err, results) {
    if (err) {
      console.error("could not get login info", err);
      res.sendStatus(500);
      return;
    }
    if (results.length == 0) {
      res.sendStatus(403);
      return;
    }
    if (results.length > 1) {
      console.log("results too long");
      res.sendStatus(500);
      return;
    }
    // let admin_username = results[0].username;
    let admin_password = results[0].password;

    let good = password === admin_password;

    if (good) {
      //return a token

      let token = {};
      token.username = username;
      //   token.password = userId;

      let signedToken = jwt.sign(token, JWT_SECRET);

      res.json(signedToken);
    } else {
      res.sendStatus(403);
    }
  });
};

module.exports = {
  login,
};
