// server/src/models/Member.js
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: String,
  photo: String,
  bio: String,
  contact: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Member", memberSchema);
