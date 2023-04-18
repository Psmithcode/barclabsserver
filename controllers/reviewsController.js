let pool = require("../sql/connection");

let createReview = function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO reviews (name, rating, title, message, date_posted) VALUES (?, ?, ?, ?, ?)";
  let name = req.body.name;
  let rating = req.body.rating;
  let title = req.body.title;
  let message = req.body.message;
  let date_posted = new Date();
  let params = [name, rating, title, message, date_posted];

  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error inserting", err);
      return;
    } else {
      res.sendStatus(202);
      console.log("added review");
      return;
    }
  });
};

const getReviews = function (req, res) {
  let sql = "SELECT * FROM reviews";
  pool.query(sql, function (err, results) {
    if (err) {
      console.log("error fetching results", err);
      res.sendStatus(501);
      return;
    } else {
      res.json(results);
      return;
    }
  });
};

module.exports = { createReview, getReviews };
