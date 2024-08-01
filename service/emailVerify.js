import { configDotenv } from "dotenv";
configDotenv();


import nodemailer from "nodemailer";


async function sendVerificationEmail(email, verificationToken) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOSTSMTP_KEY,
      port: process.env.SMTPPROT_KEY,
      secure: false, // Use `true` for port 465, `false` for other ports
      auth: {
        user: process.env.USERSMTPLOGIN_KEY,
        pass: process.env.SMTP_KEY,
      },
    });

    const verificationLink = `https://lnksnip.onrender.com/api/verifyEmail/${verificationToken}`;
    const mail = {
      from: '"LnkSnip "lnksnip.dev@gmail.com', // Replace with your sender information
      to: email,
      subject: "Verify Your Email Address",
      text: `Please click the following link to verify your email address:\n${verificationLink}`,
      html: `<b>Please click the following link to verify your email address:</b><br><a href="${verificationLink}">${verificationLink}</a>`,
    };

    // Send email
    const info = await transporter.sendMail(mail);

  } catch (error) {
    res.render("/login",error)
  }
}


export {  sendVerificationEmail };