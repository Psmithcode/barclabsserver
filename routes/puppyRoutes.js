const express = require("express");
const middleware = require("../middleware/authMiddleware");
const path = require("path");

const multer = require("multer");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:\\Users\\peyto\\Documents\\devFolder\\barclabsserver\\routes\\images"
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    console.log(file);
  },
});

const upload = multer({ storage: storageEngine });

let router = new express.Router();

let controller = require("../controllers/puppyController");

router.post("/puppies", upload.single("image"), controller.createPuppy);
router.get("/puppies", controller.getPuppies);
router.delete("/puppies", controller.deletePuppy);
module.exports = router;
