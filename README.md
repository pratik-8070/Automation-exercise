Playwright E-Commerce Automation Framework (POM | Allure | Vercel | CI | SendMailer)

This repository contains a complete end-to-end automation testing framework built using Playwright with JavaScript. The project automates a real e-commerce workflow including Login, Product Selection, Add-to-Cart, and Cart Verification. It also includes Page Object Model architecture, daily scheduled runs, Allure reporting, Vercel hosting, and automated email notifications using SendMailer.

Highlights
	•	Fully automated end-to-end test flow
	•	Page Object Model (POM) architecture
	•	Allure reports with screenshots and video recordings
	•	Allure reports hosted on Vercel
	•	Daily scheduled test execution using cron jobs
	•	SendMailer integration to email the report link
	•	Clean folder structure and modular code
	•	Easy to extend and maintain

Demo Flow
	1.	Open login page
	2.	Enter username and password
	3.	Click Login
	4.	Verify successful login
	5.	Select a product
	6.	Add the product to the cart
	7.	Open cart
	8.	Validate item name, price, and quantity
	9.	Generate reports
	10.	Upload report to Vercel
	11.	Send email to stakeholders with the report link

Project Structure

.
├── pages
│   ├── loginPage.js
│   ├── productsPage.js
│   └── cartPage.js
├── tests
│   └── e2e.spec.js
├── utils
│   └── sendMailer.js
├── reports/
├── playwright-report/
├── allure-report/
├── playwright.config.js
├── package.json
└── README.md

How the Framework Works

Page Object Model (POM)

Each page contains locators, reusable functions, and validation methods.
Helps maintain clean code and reduces duplication.

Test Runner

Powered by Playwright Test.
Includes retries, video recording, screenshots on failure, and parallel test execution.

Reporting

Two reporting systems:
	•	Playwright HTML Report
	•	Allure Report (hosted on Vercel)

CI and Automation
	•	Tests run automatically every day using cron jobs.
	•	Allure reports are generated and uploaded to Vercel.
	•	SendMailer emails the report link to stakeholders.

Tech Stack

Playwright
JavaScript
Node.js
Allure Reports
Vercel
SendMailer
Cron Jobs

Installation

git clone 
cd project-folder
npm install

Run Tests

Run all tests:
npx playwright test

Run tests with UI mode:
npx playwright test –ui

Open Playwright HTML report:
npx playwright show-report

Generate Allure Report

Generate Allure results:
npm run allure:generate

Open Allure report:
npm run allure:open

Clean results:
npm run allure:clean

Vercel Deployment

Deploy Allure report:
vercel –prod

Example report link:
https://your-report.vercel.app

SendMailer Workflow
	1.	After tests finish, Allure report is generated.
	2.	Report folder is deployed to Vercel.
	3.	SendMailer automatically emails the Vercel link to stakeholders.

Daily Scheduled Runs

Example GitHub Actions (cron):
0 5 * * *

Runs every day at 5 AM.

Live Allure Report URL

https://your-vercel-report-link

Contributions

Pull requests are welcome. If you’d like to extend or improve the framework, feel free to open an issue.

License

MIT License.

⸻

All good now — you can copy this whole block and paste directly into your GitHub README.md.

If you want, I can also generate a badge section, screenshots, or a demo GIF for your repo.
