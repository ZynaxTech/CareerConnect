// Import required modules
const db = require("mongoose");

// Connecting to MongoDB
db.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log(`MongoDB Connection Error: ${error}`);
  });

module.exports = { db };
