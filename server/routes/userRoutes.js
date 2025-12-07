// Import required modules
const express = require("express");
const userRouter = express.Router();
const multer = require("multer");
const fs = require("fs");

// Configure multer to store files in 'uploads/' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Ensure directory exists
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Import user controller
const {
  handlePostUserSignup,
  handlePostUserLogin,
  handleGetUser,
  handlePutUpdateUserPassword,
} = require("../controllers/userController.js");

// Import auth middleware
const { verifyToken } = require("../middleware/userAuth.js");

// User routes
userRouter.post("/signup", handlePostUserSignup);
userRouter.post("/login", handlePostUserLogin);
userRouter.get("/:email", handleGetUser);
userRouter.put("/update", handlePutUpdateUserPassword);

module.exports = { userRouter };
