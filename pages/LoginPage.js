import { expect } from '@playwright/test';

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton   = page.locator('button[data-qa="login-button"]');
    this.logoutLink    = page.locator('a[href="/logout"]');
  }

  async goToLoginPage() {
    const url = process.env.BASE_URL + '/login';
    await this.page.goto(url);
  }
  async verifyLoginPage() {
    await this.goToLoginPage()
    await expect(this.emailInput).toBeVisible();
  }

  async login(username = process.env.USERNAME, password = process.env.PASSWORD) {
  await this.emailInput.type(username, { delay: 100 });    
  await this.passwordInput.type(password, { delay: 100 }); 
  await this.loginButton.click();
}
  
  async verifyLoginSuccess() {
    await this.login()
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginButton).toBeVisible();
  }
}