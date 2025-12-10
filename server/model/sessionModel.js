// Import required module
const { db } = require("../config/db.js");

// User schema and model
const sessionSchema = new db.Schema({
  userId: { type: db.Schema.Types.ObjectId, ref: "users" },
});

const Session = db.model("session", sessionSchema);

module.exports = { Session };
