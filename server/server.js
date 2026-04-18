import "./config/env.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/chef")
  .then(() => console.log("MongoDB connected"));

app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});