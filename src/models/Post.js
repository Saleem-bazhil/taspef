// server/src/models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, index: true },
  excerpt: String,
  content: String,
  image: String,
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
