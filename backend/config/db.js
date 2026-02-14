import mongoose from "mongoose";
import dotenv from "dotenv";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000, // Timeout after 20s instead of 10s
    });
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Database Connection: ${error.message}`);
    // DO NOT EXIT - Keep server alive so we can see the error in logs or via API
  }
};

export default connectdb;
