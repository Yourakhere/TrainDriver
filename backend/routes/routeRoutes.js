import express from "express";
import {
  addRoute,
  getRoutes,
  updateRoute,
  deleteRoute
} from "../controllers/routeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRoutes);           // PUBLIC
router.post("/", protect, addRoute);
router.put("/:id", protect, updateRoute);
router.delete("/:id", protect, deleteRoute);

export default router;
