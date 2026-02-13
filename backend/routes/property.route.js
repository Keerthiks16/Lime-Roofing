import express from "express";
import { createProperty, deleteProperty, getAllProperties, getPropertyById, updateProperty } from "../controllers/property.controller.js";
import { protectroute } from "../middleware/protectroute.js";
import upload from "../middleware/upload.js";

const propertyRouter = express.Router();

propertyRouter.get("/", getAllProperties);
propertyRouter.get("/:id", getPropertyById);
propertyRouter.post("/", protectroute, createProperty);
propertyRouter.put("/:id", protectroute, updateProperty);
propertyRouter.delete("/:id", protectroute, deleteProperty);

propertyRouter.post("/upload", protectroute, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.status(200).json({ url: req.file.path });
});

export default propertyRouter;
