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
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Welcome To Real Estate API");
});

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/leads", leadRouter);

app.listen(PORT, () => {
  console.log(`Listening to: http://localhost:` + PORT);
  connectdb();
});
