const nodemailer = require("nodemailer");

async function sendReportEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  let mailOptions = {
    from: `"QA Automation" <${process.env.EMAIL_USER}>`,
    to: "recipient@example.com", // 👈 put your email or team list
    subject: "✅ Playwright Test Report",
    html: `
      <p>Hello,</p>
      <p>The latest Playwright test report is ready ✅</p>
      <p>
        👉 <a href="https://automation-exercise-pratik.vercel.app/" target="_blank">Click here to view the report</a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendReportEmail;