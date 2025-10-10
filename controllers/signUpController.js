const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

// Validation middleware
const validateSignUp = [
  body("firstName").trim().escape(),
  body("lastName").trim().escape(),
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .escape(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

function getSignUpPage(req, res) {
  res.render("signUp", { errors: [] });
}

async function postSignUp(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signUp", { errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      hashedPassword
    );
    res.redirect("/");
  } catch (error) {
    if (error.message && error.message.toLowerCase().includes("duplicate")) {
      return res.render("signUp", {
        errors: [{ msg: "Username already exists. Please choose another." }],
      });
    }
    console.error("Error in sign-up:", error);
    next(error);
  }
}

module.exports = { getSignUpPage, postSignUp, validateSignUp };
