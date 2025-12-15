const nodemailer = require("nodemailer");
const { PASSWORD_RESET_TEMPLATE } = require("./emailTemplate.js");

const sendOTPMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const forgotPassMailConfig = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
      "{{email}}",
      email
    ),
  };

  transporter.sendMail(forgotPassMailConfig, (error, info) => {
    if (error) throw new Error(error);
    console.log("Email sent successfully!");
    console.log(info);
  });
};

module.exports = { sendOTPMail };
