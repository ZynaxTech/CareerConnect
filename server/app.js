require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Import custom modules
const { userRouter } = require("./routes/userRoutes.js");
const { universityRouter } = require("./routes/universityRoutes.js");
const { examRouter } = require("./routes/examRoutes.js");
const { counselorRouter } = require("./routes/counselorRoutes.js");
const { discussionRouter } = require("./routes/discussionRoutes.js");

// middleware to parse incoming requests
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// router use
app.use("/api/user", userRouter);
app.use("/api/university", universityRouter);
app.use("/api/exam", examRouter);
app.use("/api/counselor", counselorRouter);
app.use("/api/discussion", discussionRouter);

// Server setup
const host = "localhost";
const port = process.env.PORT || 3000;
app.listen(port, host, () =>
  console.log(`> Server is up and running on http://${host}:${port}`)
);
