import express from "express";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(4000, () => logger.info("Server running on http://localhost:4000"));