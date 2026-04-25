// server/src/routes/emagazines.js
import express from "express";
import { listEmags, getEmag } from "../controllers/emagazineController.js";
const router = express.Router();

router.get("/", listEmags);
router.get("/:id", getEmag);

export default router;
