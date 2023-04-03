const express = require("express");
const middleware = require("../middleware/authMiddleware");

let router = new express.Router();

let controller = require("../controllers/puppyController");

router.post("/puppies", middleware.checkJWT, controller.createPuppy);
router.get("/puppies", controller.getPuppies);
router.delete("/puppies", controller.deletePuppy);
module.exports = router;
