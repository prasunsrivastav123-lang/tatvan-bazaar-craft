import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ===========================================
        AUTH MIDDLEWARE (JWT VERIFY)
   Attaches req.user for any protected route.
   Does not touch any other middleware.
=========================================== */

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid",
    });
  }
};

export default protect;