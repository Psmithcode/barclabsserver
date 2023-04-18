const express = require("express");

let router = new express.Router();

let controller = require("../controllers/reviewsController");

router.post("/reviews", controller.createReview);
router.get("/reviews", controller.getReviews);

module.exports = router;
