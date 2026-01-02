import mongoose from "mongoose";

const driverDutySchema = new mongoose.Schema({
  date: Date,
  day: String,
  trainNumber: String,
  trainType: { type: String, enum: ["UP", "DN"] },
  from: String,
  to: String,
  dutyTime: String,
  driverName: String,
  remarks: String
}, { timestamps: true });

export default mongoose.model("DriverDuty", driverDutySchema);
