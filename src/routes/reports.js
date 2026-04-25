// server/src/routes/reports.js
import express from "express";
import {
  listReports,
  getReport,
  createReport,
  updateReport,
  deleteReport,
} from "../controllers/reportController.js";
import upload, { handleMulterError } from "../middleware/upload.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { generatePdfForReport } from "../controllers/reportPdfController.js";
const router = express.Router();

router.get("/", listReports);
router.get("/:id", getReport);
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  handleMulterError,
  createReport
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("file"),
  handleMulterError,
  updateReport
);
router.delete("/:id", protect, adminOnly, deleteReport);
router.post("/:id/generate-pdf", protect, adminOnly, generatePdfForReport);

export default router;
