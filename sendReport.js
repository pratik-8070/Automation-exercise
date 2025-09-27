const nodemailer = require("nodemailer");

async function sendReportEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // Gmail address from .env / GitHub Secret
        pass: process.env.EMAIL_PASS,  // Gmail App Password
      },
    });

    let mailOptions = {
      from: `"QA Automation" <${process.env.EMAIL_USER}>`,
      to: "pratikv8070@gmail.com", // ✅ send directly to you
      subject: "✅ Playwright Test Report",
      html: `
        <p>Hello,</p>
        <p>The latest Playwright test report is ready ✅</p>
        <p>
          👉 <a href="https://automation-exercise-pratik.vercel.app/" target="_blank">Click here to view the report</a>
        </p>
      `,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}

module.exports = sendReportEmail;