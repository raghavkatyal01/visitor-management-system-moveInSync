import jwt from "jsonwebtoken";
import User from "../models/Admin.js";
import Admin from "../models/Admin.js";
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password"); 
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};





export const protectAdmin = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      if (decoded.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
      }

      req.admin = await Admin.findById(decoded.id).select("-password"); // Attach admin to request
      next();
    } catch (error) {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token" });
  }
};