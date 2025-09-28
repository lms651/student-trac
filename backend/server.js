import express from "express";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";
import studentRoutes from './routes/studentProfileRoutes.js';
import courseRoutes from './routes/courseRoutes.js'

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

app.get("/", (req, res) => {
  res.send("API is running woooo");
})

app.listen(4000, () => logger.info("Server running on http://localhost:4000"));