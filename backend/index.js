import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectdb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import contentRouter from "./routes/content.route.js";
import propertyRouter from "./routes/property.route.js";
import leadRouter from "./routes/lead.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

let app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://vighnaharta-infinity.vercel.app",
  "https://vighnaharta-infinity.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Welcome To Real Estate API");
});

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/leads", leadRouter);

const startServer = async () => {
  try {
    console.log("Starting server initialization...");
    await connectdb();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`👉 Client URL allowed: ${process.env.CLIENT_URL || "Local Dev Mode"}`);
    });
  } catch (error) {
    console.error("CRITICAL: Failed to start server:", error);
  }
};

startServer();
