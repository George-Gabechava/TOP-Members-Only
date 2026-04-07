import express from "express";
import * as secretController from "../controllers/secretController";

const router = express.Router();

// GET secret page
router.get("/secret", secretController.getSecretPage);

// POST secret code
router.post(
  "/secret",
  secretController.validateSecretCode,
  secretController.postSecretCode,
);

export default router;
