import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true
    },
    priceLabel: {
        type: String, // e.g. "69.99 Lacs*"
    },
    location: {
      type: String,
      required: true,
    },
    address: {
        type: String
    },
    propertyType: {
      type: String, // 1BHK, 2BHK, etc.
      required: true,
    },
    status: {
      type: String, // Under Construction, Completed, etc.
      required: true,
    },
    amenities: [String],
    images: [String],
    floorPlan: {
      type: String, // Image URL
    },
    features: [
        {
            label: String,
            value: String
        }
    ]
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
