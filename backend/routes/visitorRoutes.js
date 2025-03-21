import express from "express";
import Visitor from "../models/Visitor.js";



const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, visitDate } = req.body;

    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ error: "Visitor already registered" });
    }

  const visitor = new Visitor({
        name,
        email,
        phone,
        visitDate,
      
      });
    await visitor.save();

    res.status(201).json({ message: "Visitor registered successfully", visitor });
  } catch (error) {
    console.error("Error registering visitor:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;


    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    res.json({ message: `Visitor ${status.toLowerCase()} successfully`, visitor });
  } catch (error) {
    console.error("Error updating visitor status:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, search, startDate, endDate } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    if (startDate && endDate) {
      filter.visitDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const visitors = await Visitor.find(filter).sort({ visitDate: -1 });
    res.json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
