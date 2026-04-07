import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

// GET home page
router.get("/", indexController.getHomePage);

// GET log out
router.get("/logOut", indexController.logOut);

// Add message
router.post("/addMessage", indexController.addMessage);

// Delete message
router.post("/deleteMessage/:id", indexController.deleteMessage);

export default router;
