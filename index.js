require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const pool = require("./sql/connection");
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");
app.use(express.static("./public"));
const port = process.env.PORT || "8080";
// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("hello world");
});
// app.get("/images/:imageName", (req, res) => {
//   const imageName = req.params.imageName;
//   const imagePath = path.join(__dirname, "routes", "images", imageName);
//   res.sendFile(imagePath);
// });

let puppyRouter = require("./routes/puppyRoutes");
let authRouter = require("./routes/authRoutes");
app.use(puppyRouter);
app.use(authRouter);

// NODEMAILER STUFF ////////////////////////////////////////////////////////////////////////////

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to: process.env.EMAIL,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `From: ${req.body.mailerState.name}, ${req.body.mailerState.message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent ==");
      res.json({
        status: "success",
      });
    }
  });
});

// //////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
