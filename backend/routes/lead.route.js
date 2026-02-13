import express from "express";
import { createLead, getAllLeads, updateLeadStatus } from "../controllers/lead.controller.js";
import { protectroute } from "../middleware/protectroute.js";

const leadRouter = express.Router();

leadRouter.post("/", createLead); // Public inquiry
leadRouter.get("/", protectroute, getAllLeads); // Admin only
leadRouter.put("/:id", protectroute, updateLeadStatus); // Admin only

export default leadRouter;
