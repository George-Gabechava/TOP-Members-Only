var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Members Only",
    user: req.user,
    messages: req.session.messages || [],
  });
});

/* GET membership page */
router.get("/secret", function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("secret", { user: req.user });
  } else {
    res.redirect("/");
  }
});

/* GET log out */
router.get("/logOut", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
