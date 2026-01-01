const express = require("express");
const { verifyToken } = require("../middleware/userAuth.js");
const { adminAuth } = require("../middleware/adminAuth.js");
const {
  handleDeleteCounselor,
  handleGetAllCounselor,
  handleGetCounselorById,
  handlePostCreateCounselor,
  handleUpdateCounselor,
  handleSendBookingEmail,
} = require("../controllers/counselorController.js");

const counselorRouter = express.Router();

// Public
counselorRouter.get("/", handleGetAllCounselor);
counselorRouter.get("/:id", handleGetCounselorById);

// Protected
counselorRouter.post("/", verifyToken, adminAuth, handlePostCreateCounselor);
counselorRouter.put("/:id", verifyToken, adminAuth, handleUpdateCounselor);
counselorRouter.delete("/:id", verifyToken, adminAuth, handleDeleteCounselor);
counselorRouter.post(
  "/send-booking-email",
  verifyToken,
  handleSendBookingEmail
);

module.exports = { counselorRouter };
