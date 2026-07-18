import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
}

function toSafeUser(user) {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
}

/* ===========================================
                REGISTER
=========================================== */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = createToken(user);

    res.json({
      success: true,
      token,
      user: toSafeUser(user),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ===========================================
                  LOGIN
=========================================== */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const ok = await user.comparePassword(password);

    if (!ok) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = createToken(user);

    res.json({
      success: true,
      token,
      user: toSafeUser(user),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ===========================================
              GOOGLE LOGIN
=========================================== */

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email,
        avatar: payload.picture,
        googleId: payload.sub,
      });
    }

    const token = createToken(user);

    res.json({
      success: true,
      token,
      user: toSafeUser(user),
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ===========================================
              CURRENT USER
=========================================== */

router.get("/me", protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;