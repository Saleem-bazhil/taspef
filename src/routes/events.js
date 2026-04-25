// server/src/routes/events.js
import express from "express";
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import upload, { handleMulterError } from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = express.Router();

router.get("/", listEvents);
router.get("/:id", getEvent);
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  handleMulterError,
  createEvent
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  handleMulterError,
  updateEvent
);
router.delete("/:id", protect, adminOnly, deleteEvent);

export default router;
