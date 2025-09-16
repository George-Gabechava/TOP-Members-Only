// routes/signUp.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Sign Up form
router.get("/signUp", (req, res) => res.render("signUp", { errors: [] }));

router.post("/signUp", controller.validateSignUp, controller.postSignUp);

module.exports = router;
