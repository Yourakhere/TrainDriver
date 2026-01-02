import express from "express";
import {
  addDuty,
  getDuties,
  updateDuty,
  deleteDuty
} from "../controllers/dutyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDuties);        // PUBLIC
router.post("/", protect, addDuty);
router.put("/:id", protect, updateDuty);
router.delete("/:id", protect, deleteDuty);

export default router;
