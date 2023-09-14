const nodemailer = require("nodemailer");

const { mail_user, mail_password } = require("../constants");

const mailer = async (text, receivents) => {
  try{
  console.log("Mailer");
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: mail_user,
      pass: mail_password,
    },
  });

  const mailOptions = {
    from: "Sitcenter KGD",
    to: receivents.join(", "),
    subject: "SITCENTER KGD",
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = mailer;
