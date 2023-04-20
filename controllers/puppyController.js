let pool = require("../sql/connection");

let createPuppy = function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO puppies (name, image, whelped_date, gender, ready_date, sire, dam, vaccinated, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let name = req.body.name;
  let image = req.body.image;
  let gender = req.body.gender
  console.log(image);

  let ready_date = req.body.dateReady;
  let whelped_date = req.body.dateWhelped;
  let sire = req.body.sire;
  let dam = req.body.dam;
  let price = req.body.price;
  let vaccinated = req.body.selectedValue;
  let params = [
    name,
    image,
    gender,
    whelped_date,
    ready_date,
    sire,
    dam,
    vaccinated,
    price,
  ];

  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error inserting", err);
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
      console.log("error getting puppies: ", err);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};

let deletePuppy = function (req, res) {
  console.log(req);
  let name = req.body.name;
  let sql = "DELETE FROM puppies WHERE name= ?";
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

let updatePuppy = function (req, res) {
  let sql =
    "UPDATE puppies SET whelped_date = ?, ready_date = ?, sire = ?, dam = ?, price = ? WHERE name = ?";
  let ready_date = req.body.dateReady;
  let whelped_date = req.body.dateWhelped;
  let sire = req.body.sire;
  let dam = req.body.dam;
  let price = req.body.price;
  let name = req.body.name;
  let params = [whelped_date, ready_date, sire, dam, price, name];
  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error updating puppy", err);
      res.sendStatus(501);
      return;
    } else {
      console.log("successfully update puppy");
      res.sendStatus(202);
      return;
    }
  });
};

module.exports = {
  createPuppy,
  deletePuppy,
  getPuppies,
  updatePuppy,
};
