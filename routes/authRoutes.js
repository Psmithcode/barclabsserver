const express = require("express");

let router = new express.Router();

let controller = require("../controllers/authController");

router.post("/login", controller.login);

module.exports = router;
