const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Fot .env configuration secrets
dotenv.config();

//Import custom modules
const { userRouter } = require("./routes/userRoutes.js");

// middleware to parse incoming requests
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// user router use
app.use("/api/user", userRouter);

// Server setup
const host = "localhost";
const port = 3000;
app.listen(port, host, () =>
  console.log(`> Server is up and running on http://${host}:${port}`)
);
