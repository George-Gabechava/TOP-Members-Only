var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

// GET home page
router.get("/", indexController.getHomePage);

// GET log out
router.get("/logOut", indexController.logOut);

// Add message
router.post("/addMessage", indexController.addMessage);

// Delete message
router.post("/deleteMessage/:id", indexController.deleteMessage);

module.exports = router;
