import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    contact: { type: String, required: true },
    company: { type: String },
    photo: { type: String }, 
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);
export default Visitor;
