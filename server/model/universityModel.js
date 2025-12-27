// Import required module
const { db } = require("../config/db.js");

// University schema and model
const universitySchema = new db.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true },
    location: {
      type: String,
      required: true,
      enum: [
        "Lahore, Punjab",
        "Islamabad, Federal",
        "Islamabad, Punjab",
        "Karachi, Sindh",
        "Rawalpindi, Punjab",
      ],
    },
    programs: { type: String, required: true },
    fees: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true, enum: ["Public", "Private"] },
    rank: {
      type: String,
      required: true,
      enum: ["Very High", "High", "Medium", "Low", "High"],
    },
    tags: [{ type: String, required: true }],
    website: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    established: { type: String, required: true },
    students: { type: String, required: true },
    faculty: { type: String, required: true },
    accreditation: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const University = db.model("university", universitySchema);

module.exports = { University };
