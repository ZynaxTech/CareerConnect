// Exam schema and model
const { db } = require("../config/db.js");

const helpingSchema = new db.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const examSchema = new db.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    testDate: { type: Date, required: true, trim: true },
    applicationDeadline: { type: Date, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    universities: { type: String, required: true, trim: true },
    subjectCount: { type: String, required: true, trim: true },
    subjects: [{ type: String, required: true, trim: true }],
    color: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    eligibility: { type: String, required: true, trim: true },
    pattern: { type: String, required: true, trim: true },
    syllabus: { type: String, required: true, trim: true },
    conductingBody: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    helpingMaterials: [helpingSchema],
  },
  { timestamps: true }
);

const Exam = db.model("exam", examSchema);

module.exports = { Exam };
