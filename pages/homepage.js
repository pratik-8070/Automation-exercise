// pages/HomePage.js
import { expect } from '@playwright/test';
import LoginPage from './LoginPage.js';
import { time } from 'console';

export default class HomePage {
  constructor(page) {
    this.page = page;

    this.recommendedSection = page.locator('.recommended_items');
    this.blueTopAddToCartButton = page.locator('.recommended_items .productinfo:has-text("Blue Top") .add-to-cart[data-product-id="1"]');
    this.viewCartLink = page.locator('a:has-text("View Cart")');
    this.blueTopItem=page.locator('a[href="/product_details/1"]');
    this.carousel = page.locator('#recommended-item-carousel');
    this.slides = this.carousel.locator('.item'); 
    this.prices = this.carousel.locator('.item h2'); 
    this.names = this.carousel.locator('.item p'); 
    this.addButtons = this.carousel.locator('.item .add-to-cart'); 
}

    async verifyCartPage() {
      await this.recommendedSection.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(2000);
      await expect(this.blueTopItem).toBeVisible();
      await this.blueTopAddToCartButton.click();
      await this.page.waitForTimeout(2000);
      await this.viewCartLink.click();  
      await expect(this.blueTopItem).toBeVisible();
      await this.page.waitForTimeout(5000); 
    }


    async addToCartPro() {
    await this.page.waitForTimeout(5000);
    await this.recommendedSection.scrollIntoViewIfNeeded();
    await expect(this.recommendedSection).toBeVisible();
    await this.page.waitForTimeout(5000);  
  }

  async addRecommendedItemsAbove(minPrice = 1000) {

    await this.addToCartPro();

    await this.recommendedSection.scrollIntoViewIfNeeded();
    await expect(this.recommendedSection).toBeVisible();

  const slideCount = await this.slides.count();
  console.log(`Total slides found: ${slideCount}`);

  for (let i = 0; i < slideCount; i++) {
    const slide = this.slides.nth(i);

    // each slide has multiple products inside .productinfo
    const products = slide.locator('.productinfo');
    const productCount = await products.count();

    for (let j = 0; j < productCount; j++) {
      const product = products.nth(j);

      const priceText = await product.locator('h2').innerText();
      const productName = await product.locator('p').innerText();

      // clean price: "Rs. 1,000" → 1000
      const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);

      if (price >= minPrice) {
        console.log(`Adding: ${productName} with price Rs.${price}`);
        await product.locator('.add-to-cart').click();
        await this.page.waitForTimeout(1000);
      } else {
        console.log(`⏩ Skipping: ${productName} with price Rs.${price}`);
      }
    }

    // 👉 Move carousel to next slide (optional, if it doesn’t auto-slide)
    const nextBtn = this.page.locator('#recommended-item-carousel .right'); 
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await this.page.waitForTimeout(2000); // wait for transition
    }
  }

  // Go to cart
  await this.viewCartLink.click();
  await expect(this.cartProducts.first()).toBeVisible();
}
}