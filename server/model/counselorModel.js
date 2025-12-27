// Counselor schema and model
const { db } = require("../config/db.js");

const counselorSchema = new db.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    description: { type: String, required: true, default: "" },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    reviews: { type: Number, required: true, default: 0 },
    experience: { type: String, required: true, default: "" },
    successRate: { type: String, required: true, default: "" },
    students: { type: Number, required: true, default: 0 },
    location: { type: String, required: true, default: "" },
    tags: [
      {
        type: String,
        required: true,
        trim: true,
        enum: [
          "Admissions",
          "Career Guidance",
          "Applications",
          "Interview Prep",
          "Career Assessment",
          "Industry Insights",
          "Skill Development",
        ],
      },
    ],
    image: { type: String, required: true, default: "" },
    badge: { type: String, required: true, default: "" },
    email: { type: String, required: true, default: "" },
  },
  { timestamps: true }
);

const Counselor = db.model("counselor", counselorSchema);

module.exports = { Counselor };
