const express = require("express");
const middleware = require("../middleware/authMiddleware");
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let router = new express.Router();

let controller = require("../controllers/puppyController");

router.post("/puppies", upload.single("image"), controller.createPuppy);
router.get("/puppies", controller.getPuppies);
router.delete("/puppies", controller.deletePuppy);
module.exports = router;
