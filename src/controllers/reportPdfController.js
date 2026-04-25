// server/src/controllers/reportPdfController.js
import Report from "../models/Report.js";
import { buildReportHtml } from "../utils/reportHtml.js";
import { htmlToPdfFile } from "../utils/pdfGen.js";
import path from "path";

export const generatePdfForReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    // load report from DB
    const report = await Report.findById(id).lean();
    if (!report) return res.status(404).json({ message: "Report not found" });

    // ensure agenda items (if your model stores agenda)
    const agenda = report.agenda || []; // or generate from elsewhere

    // build HTML and render to PDF
    const filename = `agm-${id}-${Date.now()}.pdf`;
    const fileUrl = await htmlToPdfFile(
      buildReportHtml(report, agenda),
      filename
    );

    // save fileUrl back to report (optional)
    report.fileUrl = fileUrl;
    await Report.findByIdAndUpdate(id, { fileUrl, originalName: filename });

    // return the file URL
    const absoluteUrl = `${req.protocol}://${req.get("host")}/${fileUrl}`;
    res.json({ fileUrl, url: absoluteUrl });
  } catch (err) {
    next(err);
  }
};
