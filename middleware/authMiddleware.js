let jwt = require("jsonwebtoken");
let JWT_SECRET = process.env.JWT_SECRET;

let checkJWT = function (req, res, next) {
  //first we are going to get the header if it exists
  let header = req.get("Authorization");
  // and declare signed token
  let signedToken;
  if (header) {
    // the header comes in a string like this 'BEARER asjdhkljdafnaldkjfh" so we have to seperate it to get the part we need
    let parts = header.split(" ");
    signedToken = parts[1];
  }
  // if we dont have a header we will throw an error
  if (!signedToken) {
    console.error("no signed Token to check");
    res.sendStatus(403);
    return;
  }
  //now we have to verify that its a valid token
  try {
    let token = jwt.verify(signedToken, JWT_SECRET);
    req["_token"] = token;
    next();
  } catch (err) {
    console.error("Could not verify the token", err);
    res.sendStatus(403);
    return;
  }
};

module.exports = { checkJWT };
