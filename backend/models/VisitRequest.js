import mongoose from "mongoose";

const visitRequestSchema = new mongoose.Schema(
  {
    visitor: { type: mongoose.Schema.Types.ObjectId, ref: "Visitor", required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    purpose: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
  },
  { timestamps: true }
);

const VisitRequest = mongoose.model("VisitRequest", visitRequestSchema);
export default VisitRequest;
