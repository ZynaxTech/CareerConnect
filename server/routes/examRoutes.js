const express = require("express");
const { verifyToken } = require("../middleware/userAuth.js");
const {
  handlePostCreateExam,
  handleGetAllExams,
  handleGetExamById,
  handlePutUpdateExam,
  handleDeleteExam,
} = require("../controllers/examController.js");

const examRouter = express.Router();

// Public
examRouter.get("/", handleGetAllExams);
examRouter.get("/:id", handleGetExamById);

// Protected (create/update/delete require authentication)
examRouter.post("/", verifyToken, handlePostCreateExam);
examRouter.put("/:id", verifyToken, handlePutUpdateExam);
examRouter.delete("/:id", verifyToken, handleDeleteExam);

module.exports = { examRouter };
