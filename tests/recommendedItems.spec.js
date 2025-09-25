import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import HomePage from '../pages/homepage.js';

test('Add recommended items with price >= 1000 to cart print cart total price', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.verifyLoginPage();
    await loginPage.verifyLoginSuccess();
    await homePage.addRecommendedItemsAbove(1000);
    await homePage.gotoCart();  
    await homePage.printCartTotalPrices();
});