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
  handleVerification,
  handlePostUserLogin,
  handlePostUserLogout,
  handleForgotPassword,
  handleOTP,
  handleGetUser,
  handlePutUpdateUserPassword,
  handleMe,
} = require("../controllers/userController.js");

// Import auth middleware
const { verifyToken } = require("../middleware/userAuth.js");
const { validateUser, userSchema } = require("../validator/userValidator.js");

// User routes
userRouter.post("/signup", validateUser(userSchema), handlePostUserSignup);
userRouter.post("/verify", handleVerification);
userRouter.post("/login", handlePostUserLogin);
userRouter.post("/logout", verifyToken, handlePostUserLogout);
userRouter.post("/forgot-password", handleForgotPassword);
userRouter.post("/verify-otp/:email", handleOTP);
userRouter.get("/:email", handleGetUser);

// Protected
userRouter.get("/me", verifyToken, handleMe);
userRouter.put("/update-password/:email", handlePutUpdateUserPassword);

module.exports = { userRouter };
