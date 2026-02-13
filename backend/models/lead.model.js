import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    status: {
        type: String,
        enum: ["New", "Contacted", "Closed"],
        default: "New"
    }
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
