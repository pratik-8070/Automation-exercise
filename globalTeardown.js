const sendReportEmail = require('./sendReport');

async function globalTeardown() {
  console.log("📧 Sending test report via email...");
  await sendReportEmail();
  console.log("✅ Report email sent!");
}

module.exports = globalTeardown;