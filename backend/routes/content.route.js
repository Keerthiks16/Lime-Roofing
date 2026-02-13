import express from "express";
import { getSectionContent, getSectionByName, updateSectionContent } from "../controllers/content.controller.js";
import { protectroute } from "../middleware/protectroute.js";

const contentRouter = express.Router();

contentRouter.get("/", getSectionContent);
contentRouter.get("/:name", getSectionByName);
contentRouter.put("/:name", protectroute, updateSectionContent);

export default contentRouter;
