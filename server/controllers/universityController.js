const { IdCard } = require("lucide-react");
const { University } = require("../model/universityModel");

// Get all universities with filters
const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find();

    if (universities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No universities found",
      });
    }

    res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching universities",
      error: error.message,
    });
  }
};

// Get university by ID
const getUniversityById = async (req, res) => {
  try {
    const id = req.params.id;
    const university = await University.findOne({ id });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching university",
      error: error.message,
    });
  }
};

// Create a new university (admin)
const createUniversity = async (req, res) => {
  try {
    const {
      name,
      fullName,
      rating,
      description,
      location,
      programs,
      fees,
      image,
      type,
      rank,
      tags,
      website,
      phone,
      email,
      established,
      students,
      faculty,
      accreditation,
      address,
    } = req.body;

    const id = (await University.countDocuments()) + 1;

    // Validation
    if (
      !name ||
      !fullName ||
      !rating ||
      !description ||
      !location ||
      !programs ||
      !fees ||
      !image ||
      !type ||
      !rank ||
      !tags ||
      !website ||
      !phone ||
      !email ||
      !established ||
      !students ||
      !faculty ||
      !accreditation ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const university = new University({
      id,
      name,
      fullName,
      rating,
      description,
      location,
      programs,
      fees,
      image,
      type,
      rank,
      tags: tags || [],
      website,
      phone,
      email,
      established,
      students,
      faculty,
      accreditation,
      address,
    });

    await university.save();

    res.status(201).json({
      success: true,
      message: "University created successfully",
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating university",
      error: error.message,
    });
  }
};

// Update university (admin)
const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      fullName,
      rating,
      description,
      location,
      programs,
      fees,
      image,
      type,
      rank,
      tags,
      website,
      phone,
      email,
      established,
      students,
      faculty,
      accreditation,
      address,
    } = req.body;

    const university = await University.findOneAndUpdate(
      { id },
      {
        name,
        fullName,
        rating,
        description,
        location,
        programs,
        fees,
        image,
        type,
        rank,
        tags,
        website,
        phone,
        email,
        established,
        students,
        faculty,
        accreditation,
        address,
      },
      { new: true, runValidators: true }
    );

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University updated successfully",
      data: university,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating university",
      error: error.message,
    });
  }
};

// Delete university (admin)
const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await University.findOneAndDelete({ id });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "University deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting university",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};
