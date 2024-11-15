import nodemailer from "nodemailer";
import "dotenv/config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

function sendEmail(email, bookTitle, dueDate) {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reminder: Book due Date Approaching",
        html: `
        <div>
            <h2>Community Libray Reminder </h2>
            <p>${bookTitle} </p>
            <strong>${dueDate}</strong>
        </div>
        `
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
}




export default sendEmail