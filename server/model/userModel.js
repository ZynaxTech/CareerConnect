// Import required module
const { db } = require("../config/db.js");

// User schema and model
const userSchema = new db.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    picURL: { type: String, default: "none" },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    token: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = db.model("users", userSchema);

module.exports = { User };
