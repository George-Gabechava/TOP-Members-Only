// routes/secret.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Membership page
router.get("/secret", (req, res) =>
  res.render("secret", { user: req.user, errors: [] })
);

router.post(
  "/secret",
  controller.validateSecretCode,
  controller.postSecretCode
);

module.exports = router;
