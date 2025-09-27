import { test } from '@playwright/test';
import ReviewPage from '../pages/ReviewPage.js';
import LoginPage from '../pages/LoginPage.js';

test('User can navigate to Kookie Kids section', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const reviewPage = new ReviewPage(page);
    await loginPage.verifyLoginPage();     
    await loginPage.verifyLoginSuccess(); 
    await reviewPage.verifyReviewSuccess();
});