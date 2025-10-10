// routes/secret.js
const express = require("express");
const router = express.Router();
const secretController = require("../controllers/secretController");

// GET secret page
router.get("/secret", secretController.getSecretPage);

// POST secret code
router.post(
  "/secret",
  secretController.validateSecretCode,
  secretController.postSecretCode
);

module.exports = router;
