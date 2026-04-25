// server/src/controllers/emagazineController.js
import EMagazine from "../models/EMagazine.js";

export const listEmags = async (req, res, next) => {
  try {
    const items = await EMagazine.find({}).sort({ createdAt: -1 }).lean();
    // convert file paths to full URLs (optional)
    const host = `${req.protocol}://${req.get("host")}`;
    const out = items.map((i) => ({
      ...i,
      fileUrl: i.fileUrl
        ? i.fileUrl.startsWith("http")
          ? i.fileUrl
          : `/${i.fileUrl}`
        : null,
      coverUrl: i.coverUrl
        ? i.coverUrl.startsWith("http")
          ? i.coverUrl
          : `/${i.coverUrl}`
        : null,
    }));
    res.json(out);
  } catch (err) {
    next(err);
  }
};

export const getEmag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await EMagazine.findById(id).lean();
    if (!item) return res.status(404).json({ message: "Not found" });
    item.fileUrl = item.fileUrl
      ? item.fileUrl.startsWith("http")
        ? item.fileUrl
        : `/${item.fileUrl}`
      : null;
    item.coverUrl = item.coverUrl
      ? item.coverUrl.startsWith("http")
        ? item.coverUrl
        : `/${item.coverUrl}`
      : null;
    res.json(item);
  } catch (err) {
    next(err);
  }
};

