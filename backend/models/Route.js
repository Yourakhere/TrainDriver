import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  trainNumber: String,
  trainType: { type: String, enum: ["UP", "DN"] },
  from: String,
  to: String,
  distance: Number,
  remarks: String
}, { timestamps: true });

export default mongoose.model("Route", routeSchema);
