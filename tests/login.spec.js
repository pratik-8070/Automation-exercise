import HomePage from '../pages/homepage.js';
import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test('User can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.verifyLoginPage() 
  await loginPage.verifyLoginSuccess() 
  await homePage.verifyCartPage()
});