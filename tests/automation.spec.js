import { test, expect } from '@playwright/test';
import HomePage from '../pages/homepage.js';

test('Open Automation Exercise homepage', async ({ page }) => {
  await page.goto(process.env.BASE_URL); 
  await expect(page).toHaveTitle(/Automation Exercise/); 
});

test('Verify header links are visible on Home Page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.verifyHeaderVisible();
});