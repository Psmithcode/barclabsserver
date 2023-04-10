const express = require("express");

let router = new express.Router();
let controller = require("../controllers/updateController");
router.post("/updates", controller.createUpdate);
router.get("/updates", controller.getUpdates);
module.exports = router;
