import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testConnect = async () => {
  try {
    console.log("Attempting to connect to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("SUCCESS: Connected to MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("FAILURE: Could not connect to MongoDB.");
    console.error("Error Message:", error.message);
    process.exit(1);
  }
};

testConnect();
