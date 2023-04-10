let pool = require("../sql/connection");

let createUpdate = function (req, res) {
  let sql =
    "INSERT INTO updates (title, date_added, paragraph1, paragraph2) VALUES (?, ?, ?, ?)";
  let title = req.body.title;
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  const date_added = mm + "/" + dd + "/" + yyyy;
  let par1 = req.body.par1;
  let par2 = req.body.par2;
  let params = [title, date_added, par1, par2];

  pool.query(sql, params, function (err, results) {
    if (err) {
      console.log("error inserting into updates", err);
      return;
    } else {
      res.sendStatus(202);
      console.log("added update");
      return;
    }
  });
};
