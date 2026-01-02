import express from "express";
import { addStatus, getStatus } from "../controllers/statusController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStatus);        // PUBLIC
router.post("/", protect, addStatus);

export default router;
