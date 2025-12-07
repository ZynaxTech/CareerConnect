const jwt = require("jsonwebtoken");

const jwt_secret_key = "859215";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, jwt_secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
