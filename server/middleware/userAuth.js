const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing or invalid" });
  try {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(400).json({
            success: false,
            message:
              "Access Token has expired, use refreshtoken to generate again",
          });
        }
        return res.status(400).json({
          success: false,
          message: "Access token is missing or invalid",
        });
      }
      const { id } = decoded;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      req.user = user;
      req.userId = user._id;
      next();
    });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
