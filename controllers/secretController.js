const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

// Validation middleware
const validateSecretCode = [
  body("secretCode")
    .trim()
    .equals("George")
    .withMessage("Incorrect secret code")
    .escape(),
];

function getSecretPage(req, res) {
  res.render("secret", { user: req.user, errors: [] });
}

async function postSecretCode(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("secret", { user: req.user, errors: errors.array() });
  }

  try {
    if (req.body.adminStatus === "on") {
      await db.makeAdmin(req.user.id);
      req.user.admin_status = true;
    }
    await db.makeMember(req.user.id);
    req.user.membership_status = true;
    res.redirect("/");
  } catch (error) {
    console.error("Error in membership upgrade:", error);
    next(error);
  }
}

module.exports = { getSecretPage, postSecretCode, validateSecretCode };
