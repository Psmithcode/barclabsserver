const express = require("express");

let router = new express.Router();

let controller = require("../controllers/puppyController");

router.post("/puppies", controller.createPuppy);
router.get("/puppies", controller.getPuppies);
router.delete("/puppies", controller.deletePuppy);
module.exports = router;
