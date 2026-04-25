// server/src/routes/posts.js
import express from "express";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import upload, { handleMulterError } from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = express.Router();

router.get("/", listPosts);
router.get("/:id", getPost);
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  handleMulterError,
  createPost
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  handleMulterError,
  updatePost
);
router.delete("/:id", protect, adminOnly, deletePost);

export default router;
