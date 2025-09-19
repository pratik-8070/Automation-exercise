const {test, expect} = require('@playwright/test');

test("Vaild login"), async ({ page }) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder('Username').type('Admin');

    await page.locator('Password').type('admin123');


}       