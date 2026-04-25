// server/src/controllers/reportController.js
import Report from "../models/Report.js";
import mongoose from "mongoose";

export const listReports = async (req, res, next) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    next(err);
  }
};

export const getReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    let r = null;
    if (mongoose.Types.ObjectId.isValid(id)) r = await Report.findById(id);
    if (!r) r = await Report.findOne({ slug: id });
    if (!r) return res.status(404).json({ message: "Report not found" });
    res.json(r);
  } catch (err) {
    next(err);
  }
};

export const createReport = async (req, res, next) => {
  try {
    const fileUrl = req.file ? req.file.path.replace(/\\/g, "/") : undefined;
    const r = await Report.create({
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      fileUrl,
      originalName: req.file?.originalname,
      slug: req.body.slug,
    });
    res.status(201).json(r);
  } catch (err) {
    next(err);
  }
};

export const updateReport = async (req, res, next) => {
  try {
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Report not found" });
    Object.assign(r, req.body);
    if (req.file) r.fileUrl = req.file.path.replace(/\\/g, "/");
    await r.save();
    res.json(r);
  } catch (err) {
    next(err);
  }
};

export const deleteReport = async (req, res, next) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
