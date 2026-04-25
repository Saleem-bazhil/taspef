// server/src/models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  summary: String,
  content: String,
  fileUrl: String, // 'uploads/agm-2024.pdf' or absolute URL
  originalName: String,
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
