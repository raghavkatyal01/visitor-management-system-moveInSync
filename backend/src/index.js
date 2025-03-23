import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from '../config/db.js'
import "../models/Admin.js";
import "../models/Visitor.js";
import "../models/VisitRequest.js";
import "../models/Photo.js";
import authRoutes from "../routes/authRoutes.js";
import visitorRoutes from "../routes/visitorRoutes.js";
import adminRoutes from "../routes/AdminRoutes.js";
import bcrypt from "bcryptjs";
import visitRequestRoute from "../routes/visitRequestRoute.js";
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();


app.get("/", (req, res) => {
  res.json({ message: "Visitor Management System API is running..." });
});
app.use("/api", authRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/visitrequests", visitRequestRoute);
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
