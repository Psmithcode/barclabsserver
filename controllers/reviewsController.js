let pool = require("../sql/connection");

let createReview = function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO reviews (name, rating, message, date_posted) VALUES (?, ?, ?, ?)";
  let name = req.body.name;
  let rating = req.body.rating;
  let message = req.body.message;
  let date_posted = new Date();
  let params = [name, rating, message, date_posted];

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

module.exports = { createReview };
