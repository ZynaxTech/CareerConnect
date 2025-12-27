const { Exam } = require("../model/examModel.js");

const formatExam = (doc) => {
  if (!doc) return null;
  const exam = doc.toObject ? doc.toObject() : doc;
  // ensure subjectsCount matches frontend expectation
  exam.subjectsCount =
    exam.subjectsCount ||
    exam.subjectCount ||
    (exam.subjects ? `${exam.subjects.length} Subjects` : "0 Subjects");
  // format date as YYYY-MM-DD if it's a Date
  if (exam.testDate && exam.testDate instanceof Date) {
    exam.testDate = exam.testDate.toISOString().split("T")[0];
  }
  if (exam.applicationDeadline && exam.applicationDeadline instanceof Date) {
    exam.applicationDeadline = exam.applicationDeadline
      .toISOString()
      .split("T")[0];
  }
  return exam;
};

// Create a new exam
const handlePostCreateExam = async (req, res) => {
  try {
    const {
      id: providedId,
      title,
      subtitle,
      image,
      testDate,
      applicationDeadline,
      duration,
      universities,
      subjectCount,
      subjects,
      color,
      description,
      eligibility,
      pattern,
      syllabus,
      conductingBody,
      website,
    } = req.body;

    // minimal validation based on model
    if (
      !title ||
      !subtitle ||
      !image ||
      !testDate ||
      !applicationDeadline ||
      !duration ||
      !universities ||
      (!subjectCount && !(subjects && subjects.length)) ||
      !color ||
      !description ||
      !eligibility ||
      !pattern ||
      !syllabus ||
      !conductingBody ||
      !website
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required exam fields" });
    }

    const id =
      providedId ||
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

    const existing = await Exam.findOne({ id });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "Exam with this id already exists" });

    const exam = new Exam({
      id,
      title,
      subtitle,
      image,
      testDate: new Date(testDate),
      applicationDeadline: new Date(applicationDeadline),
      duration,
      universities,
      subjectCount:
        subjectCount || (subjects ? `${subjects.length} Subjects` : undefined),
      subjects: subjects || [],
      color,
      description,
      eligibility,
      pattern,
      syllabus,
      conductingBody,
      website,
    });

    await exam.save();

    return res.status(201).json({
      success: true,
      message: "Exam created successfully",
      exam: formatExam(exam),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all exams
const handleGetAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    if (!exams || exams.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No exams found" });
    }
    const formatted = exams.map(formatExam);
    return res.status(200).json({ success: true, exams: formatted });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get exam by id
const handleGetExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findOne({ id });
    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    return res.status(200).json({ success: true, exam: formatExam(exam) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update exam
const handlePutUpdateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    // allow updating date as string
    if (updates.testDate) updates.testDate = new Date(updates.testDate);
    if (updates.applicationDeadline)
      updates.applicationDeadline = new Date(updates.applicationDeadline);
    if (updates.subjectsCount && !updates.subjectsCount)
      updates.subjectCount = updates.subjectsCount;
    const exam = await Exam.findOneAndUpdate({ id }, updates, {
      new: true,
      runValidators: true,
    });
    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    return res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      exam: formatExam(exam),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete exam
const handleDeleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findOneAndDelete({ id });
    if (!exam)
      return res
        .status(404)
        .json({ success: false, message: "Exam not found" });
    return res
      .status(200)
      .json({ success: true, message: "Exam deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handlePostCreateExam,
  handleGetAllExams,
  handleGetExamById,
  handlePutUpdateExam,
  handleDeleteExam,
};
