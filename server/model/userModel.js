// Import required module
const { db } = require("../config/db.js");

// User schema and model
const userSchema = new db.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  picURL: { type: String, default: "none" },
});

const User = db.model("users", userSchema);

module.exports = { User };
