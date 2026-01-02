import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dutyRoutes from "./routes/dutyRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";

dotenv.config();
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/duties", dutyRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/routes", routeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
