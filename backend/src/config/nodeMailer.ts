import nodemailer from "nodemailer";
import config from ".";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
  // host: "smtp.gmail.com",
  port: 587,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: config.email_user,
    pass: config.email_password,
  }
});

export default transporter;
