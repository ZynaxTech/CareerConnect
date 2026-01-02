const { bookingMail } = require("../email/bookingMail.js");
const { Counselor } = require("../model/counselorModel.js");

// Get all counselors
const handleGetAllCounselor = async (req, res) => {
  try {
    const counselors = await Counselor.find();
    if (!counselors || counselors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No counselors found" });
    }
    return res.status(200).json({ success: true, counselors });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get counselor by id
const handleGetCounselorById = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = isNaN(Number(id)) ? id : Number(id);
    const counselor = await Counselor.findOne({ id: idNum });
    if (!counselor)
      return res
        .status(404)
        .json({ success: false, message: "Counselor not found" });
    return res.status(200).json({ success: true, counselor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new counselor
const handlePostCreateCounselor = async (req, res) => {
  try {
    const {
      id: providedId,
      name,
      role,
      description,
      price,
      rating,
      reviews,
      experience,
      successRate,
      students,
      location,
      tags,
      image,
      badge,
      email,
    } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });

    const id = providedId
      ? isNaN(Number(providedId))
        ? providedId
        : Number(providedId)
      : (await Counselor.countDocuments()) + 1;
    const existing = await Counselor.findOne({ id });
    if (existing)
      return res.status(400).json({
        success: false,
        message: "Counselor with this id already exists",
      });

    // normalize tags
    const normalizedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const counselor = new Counselor({
      id,
      name,
      role,
      description,
      price,
      rating,
      reviews,
      experience,
      successRate,
      students,
      location,
      tags: normalizedTags,
      image,
      badge,
      email,
    });

    await counselor.save();
    return res.status(201).json({
      success: true,
      message: "Counselor created successfully",
      counselor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update counselor
const handleUpdateCounselor = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = isNaN(Number(id)) ? id : Number(id);
    const updates = { ...req.body };
    // prevent id change
    if (updates.id) delete updates.id;
    if (updates.tags && !Array.isArray(updates.tags)) {
      updates.tags =
        typeof updates.tags === "string"
          ? updates.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];
    }
    const counselor = await Counselor.findOneAndUpdate({ id: idNum }, updates, {
      new: true,
      runValidators: true,
    });
    if (!counselor)
      return res
        .status(404)
        .json({ success: false, message: "Counselor not found" });
    return res.status(200).json({
      success: true,
      message: "Counselor updated successfully",
      counselor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete counselor
const handleDeleteCounselor = async (req, res) => {
  try {
    const { id } = req.params;
    const idNum = isNaN(Number(id)) ? id : Number(id);
    const counselor = await Counselor.findOneAndDelete({ id: idNum });
    if (!counselor)
      return res
        .status(404)
        .json({ success: false, message: "Counselor not found" });
    return res
      .status(200)
      .json({ success: true, message: "Counselor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const handleSendBookingEmail = async (req, res) => {
  try {
    const { subject, body, email } = req.body;
    if (!subject || !body || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Subject and body are required" });
    }
    bookingMail(subject, body, email);
    return res
      .status(200)
      .json({ success: true, message: "Booking email sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handleGetAllCounselor,
  handleGetCounselorById,
  handlePostCreateCounselor,
  handleUpdateCounselor,
  handleDeleteCounselor,
  handleSendBookingEmail,
};
