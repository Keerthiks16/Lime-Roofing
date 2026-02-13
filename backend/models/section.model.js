import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // hero, about, amenities, faq, developer, township, etc.
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    images: [String], // Section-level images
    items: [mongoose.Schema.Types.Mixed], // Flexible items list (Amenities, FAQ, stats, buildings)
    extraData: mongoose.Schema.Types.Mixed, // Section-specific key-value pairs
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;
