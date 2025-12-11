require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Import custom modules
const { userRouter } = require("./routes/userRoutes.js");

// middleware to parse incoming requests
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// user router use
app.use("/api/user", userRouter);

// Server setup
const host = "localhost";
const port = process.env.PORT || 3000;
app.listen(port, host, () =>
  console.log(`> Server is up and running on http://${host}:${port}`)
);
