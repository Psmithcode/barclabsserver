let pool = require("../sql/connection");

let createPuppy = function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO puppies (name, image, whelped_date, ready_date, sire, dam, vaccinated, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  //   let image = req.body.image;
  let name = req.body.name;
  let image = req.body.image;
  console.log(image);
  // const today = new Date();
  // const yyyy = today.getFullYear();
  // let mm = today.getMonth() + 1; // Months start at 0!
  // let dd = today.getDate();

  // if (dd < 10) dd = "0" + dd;
  // if (mm < 10) mm = "0" + mm;

  // const date_added = mm + "/" + dd + "/" + yyyy;

  let ready_date = req.body.dateReady;
  let whelped_date = req.body.dateWhelped;
  let sire = req.body.sire;
  let dam = req.body.dam;
  let price = req.body.price;
  let vaccinated = req.body.selectedValue;
  let params = [
    name,
    image,
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
