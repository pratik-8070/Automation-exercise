import dotenv from 'dotenv';
dotenv.config();

import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

test('User can log out successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToLoginPage();        
  await loginPage.login();       
  await loginPage.logout();      
});