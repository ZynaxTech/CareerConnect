const express = require("express");
const universityRouter = express.Router();
const {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} = require("../controllers/universityController.js");
const { verifyToken } = require("../middleware/userAuth.js");

// GET all universities with filters
universityRouter.get("/", verifyToken, getAllUniversities);

// GET university by ID
universityRouter.get("/:id", verifyToken, getUniversityById);

// POST create new university (admin only)
universityRouter.post("/", verifyToken, createUniversity);

// PUT update university (admin only)
universityRouter.put("/:id", verifyToken, updateUniversity);

// DELETE university (admin only)
universityRouter.delete("/:id", verifyToken, deleteUniversity);

module.exports = { universityRouter };
