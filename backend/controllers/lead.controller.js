import Lead from "../models/lead.model.js";

export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: `Error creating inquiry: ${error.message}` });
  }
};

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("property").sort("-createdAt");
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: `Error fetching leads: ${error.message}` });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: `Error updating lead: ${error.message}` });
  }
};
