const express = require("express");
const { verifyToken } = require("../middleware/userAuth.js");
const {
  handlePostCreateExam,
  handleGetAllExams,
  handleGetExamById,
  handlePutUpdateExam,
  handleDeleteExam,
} = require("../controllers/examController.js");
const { adminAuth } = require("../middleware/adminAuth.js");

const examRouter = express.Router();

// Public
examRouter.get("/", handleGetAllExams);
examRouter.get("/:id", handleGetExamById);

// Protected (create/update/delete require authentication)
examRouter.post("/", verifyToken, adminAuth, handlePostCreateExam);
examRouter.put("/:id", verifyToken, adminAuth, handlePutUpdateExam);
examRouter.delete("/:id", verifyToken, adminAuth, handleDeleteExam);

module.exports = { examRouter };
