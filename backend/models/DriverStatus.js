import mongoose from "mongoose";

const driverStatusSchema = new mongoose.Schema({
  date: Date,
  driverName: String,
  status: {
    type: String,
    enum: ["REST", "LEAVE", "TRAINING", "SICK"]
  },
  note: String
});

export default mongoose.model("DriverStatus", driverStatusSchema);
