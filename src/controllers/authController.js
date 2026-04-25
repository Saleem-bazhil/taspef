// server/src/controllers/authController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const genToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });
    const user = await User.create({ name, email, password });
    res
      .status(201)
      .json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: genToken(user._id),
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: genToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
