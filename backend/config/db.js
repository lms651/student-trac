import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from './logger.js';

dotenv.config();

const connectDB = async () => {
  console.log(`${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`)
  try {
    await mongoose.connect(
      `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${process.env.DBNAME}`
    );
    logger.info("Connected to MongoDB");
  } catch (err) {
    console.log(err)
    logger.error("DB connection failed:", err.message);
    process.exit(1);
  }
}

export default connectDB;