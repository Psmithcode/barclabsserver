let pool = require("../sql/connection");

let createPuppy = function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO puppies (name, image, date_added, text1, text2, text3, text4) VALUES (?, ?, ?, ?, ?, ?, ?)";
  //   let image = req.body.image;
  let name = req.body.name;
  let image = req.body.image;
  console.log(image);
  let date_added = new Date();
  let text1 = req.body.text1;
  let text2 = req.body.text2;
  let text3 = req.body.text3;
  let text4 = req.body.text4;
  let params = [name, image, date_added, text1, text2, text3, text4];

  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error inserting");
      return;
    } else {
      res.sendStatus(202);
      console.log("added puppy");
      return;
    }
  });
};

let getPuppies = function (req, res) {
  let sql = "SELECT * FROM puppies";
  pool.query(sql, function (err, results) {
    if (err) {
      console.log("error getting puppies", err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

let deletePuppy = function (req, res) {
  let sql = "DELETE FROM puppies WHERE name=?";
  let name = req.body.name;
  let params = [name];
  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error deleting puppy");
      return;
    } else {
      console.log("deleted puppy");
      res.sendStatus(202);
      return;
    }
  });
};

module.exports = {
  createPuppy,
  deletePuppy,
  getPuppies,
};
