import Section from "../models/section.model.js";

export const getSectionContent = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: `Error fetching sections: ${error.message}` });
  }
};

export const getSectionByName = async (req, res) => {
  try {
    const { name } = req.params;
    const section = await Section.findOne({ name });
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: `Error fetching section: ${error.message}` });
  }
};

export const updateSectionContent = async (req, res) => {
  try {
    const { name } = req.params;
    const { title, subtitle, description, items } = req.body;

    const section = await Section.findOneAndUpdate(
      { name },
      { title, subtitle, description, items },
      { new: true, upsert: true }
    );

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: `Error updating section: ${error.message}` });
  }
};
