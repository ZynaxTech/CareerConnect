const { db } = require("../config/db.js");
const commentSchema = new db.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);
const discussionSchema = new db.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Universities", "Exam Prep", "Career Guidance", "General"],
      required: true,
    },
    tags: [String],
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    comments: { type: Number, default: 0 },
    commentsList: [commentSchema],
  },
  { timestamps: true }
);
const Discussion = db.model("Discussion", discussionSchema);
module.exports = { Discussion };
