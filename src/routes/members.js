// server/src/routes/members.js
import express from "express";
import {
  listMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";
import upload, { handleMulterError } from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = express.Router();

router.get("/", listMembers);
router.get("/:id", getMember);
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("photo"),
  handleMulterError,
  createMember
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("photo"),
  handleMulterError,
  updateMember
);
router.delete("/:id", protect, adminOnly, deleteMember);

export default router;
