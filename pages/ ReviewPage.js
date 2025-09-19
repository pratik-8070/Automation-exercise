import { expect } from '@playwright/test';

export default class ReviewPage {
  constructor(page) {
    this.page = page;
    this.kookieKidsLink = page.locator('a[href="/brand_products/Kookie Kids"]');
    this.pageTitle = page.locator('h2.title.text-center');
    this.featuresItems = page.locator('div.features_items');
    this.viewProductLink = page.locator('a[href="/product_details/18"]:has-text("View Product")');
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.reviewTextArea = page.locator('#review');
    this.submitButton = page.locator('#button-review');
  }

  async gotoKookieKids() {
    await this.kookieKidsLink.scrollIntoViewIfNeeded();
    await this.kookieKidsLink.click();
    await this.page.waitForTimeout(5000);
    await expect(this.featuresItems).toBeVisible();
    await expect(this.pageTitle).toHaveText('Brand - Kookie Kids Products');
    await this.viewProductLink.click();
    await this.page.waitForTimeout(5000);
  }
  async fillReviewForm() {
    const name = 'Pratik';
    const email = 'example@test.com';
    const review = 'This is a test review';

    await this.submitButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(2000);   

    await this.nameInput.pressSequentially(name, { delay: 100 });
    await expect(this.nameInput).toHaveValue(name);

    await this.emailInput.pressSequentially(email, { delay: 100 });
    await expect(this.emailInput).toHaveValue(email);

    await this.reviewTextArea.pressSequentially(review, { delay: 100 });
    await expect(this.reviewTextArea).toHaveValue(review);
    await this.page.waitForTimeout(2000);

  }

  async submitReview() {
    await this.submitButton.click();
  }

  async verifyReviewSuccess() {
    await this.gotoKookieKids();
    await this.fillReviewForm();
    await this.submitReview();
  const successMessage = this.page.locator('span:has-text("Thank you for your review.")');
  await expect(successMessage).toBeVisible();
  await this.page.waitForTimeout(2000);
}
}