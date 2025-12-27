const nodemailer = require("nodemailer");

const bookingMail = async (subject, body, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const bookingSessionMailConfig = {
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    text: body,
  };

  transporter.sendMail(bookingSessionMailConfig, (error, info) => {
    if (error) throw new Error(error);
    console.log("Email sent successfully!");
    console.log(info);
  });
};

module.exports = { bookingMail };
