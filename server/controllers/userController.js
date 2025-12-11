const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyMail } = require("../email/verifyMail.js");
const { User } = require("../model/userModel.js");
const { Session } = require("../model/sessionModel.js");
const { sendOTPMail } = require("../email/sendOTPMail.js");

const handlePostUserSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      picURL: "none",
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    verifyMail(token, email);
    user.token = token;
    const savedUser = await user.save();
    if (!savedUser)
      return console.log({ success: false, message: "Failed to save user" });
    else
      return res
        .status(201)
        .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    console.log(errMsg);
  }
};

const handleVerification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.token = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handlePostUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing credentials" });
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User with these credentials not exist",
      });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    // Check if user is verified
    if (!user.isVerified)
      return res
        .status(403)
        .json({ success: false, message: "Verify your account than login" });

    // Check is there is an exisiting session
    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) await Session.deleteOne({ userId: user._id });

    // Create a new session
    await Session.create({ userId: user._id });

    //Generate tokens
    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Welcome ${user.name}`,
      accessToken,
      user,
      refreshToken,
    });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    res.status(500).json(errMsg);
    console.log(errMsg);
  }
};

const handlePostUserLogout = async (req, res) => {
  try {
    const userId = req.userId;
    await Session.deleteMany({ userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = expiry;
    await user.save();
    await sendOTPMail(email, otp);
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleOTP = async (req, res) => {
  const { otp } = req.body;
  const email = req.params.email;

  if (!otp)
    return res.status(400).json({ success: false, message: "OTP is required" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    if (!user.otp || !user.otpExpiry)
      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified",
      });
    if (user.otpExpiry < new Date())
      return res.status(400).json({
        success: false,
        message: "OTP has expired, Please request a new one",
      });

    if (otp !== user.otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const handleGetUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User with this email doesn't exist. Please Signup",
      });
    res.status(200).json({
      success: true,
      message: "User found successfully",
    });
  } catch (error) {
    const errMsg = {
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    };
    console.log(errMsg);
  }
};

const handlePutUpdateUserPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const email = req.params.email;

    if (!password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    if (password !== confirmPassword)
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });

    const userFind = await User.findOne({ email });

    if (!userFind)
      return res.status(404).json({
        success: false,
        message: "User doesnot exist. Please Signup",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: userFind.email },
      { password: hashedPassword },
      { new: true }
    );

    await updatedUser.save();

    return res.status(200).json({
      success: true,
      message: "Password Updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while processing the request",
      error: error.message,
    });
  }
};

async function handleMe(req, res) {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
}

module.exports = {
  handlePostUserSignup,
  handleVerification,
  handlePostUserLogin,
  handlePostUserLogout,
  handleForgotPassword,
  handleOTP,
  handleGetUser,
  handlePutUpdateUserPassword,
  handleMe,
};
