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
    this.cartProducts = page.locator('.cart_info .cart_description'); 
    this.continueShoppingBtn = page.locator('button.btn-success:has-text("Continue Shopping")'); 
    this.viewCartLink = this.page.locator('a:has-text("View Cart")');
    this.cartTotalPrices = page.locator('.cart_total_price');
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


    async scrollToRecommendedItems() {
    await this.page.waitForTimeout(5000);
    await this.recommendedSection.scrollIntoViewIfNeeded();
    await expect(this.recommendedSection).toBeVisible();
    await this.page.waitForTimeout(5000);  
  }

  async addRecommendedItemsAbove(minPrice = 1000) {
  await this.scrollToRecommendedItems();

  const slideCount = await this.slides.count();
  console.log(`Total slides found: ${slideCount}`);

  let addedCount = 0;

  for (let i = 0; i < slideCount; i++) {
    const slide = this.slides.nth(i);
    const products = slide.locator('.productinfo');
    const productCount = await products.count();

    for (let j = 0; j < productCount; j++) {
      const product = products.nth(j);

      const priceText = await product.locator('h2').innerText();
      const productName = await product.locator('p').innerText();
      const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);

      if (price >= minPrice) {
        console.log(`✅ Adding: ${productName} with price Rs.${price}`);
        await product.locator('.add-to-cart').click();

        // 👉 wait for popup
        const continueBtn = this.page.locator('button:has-text("Continue Shopping")');
        const viewCartBtn = this.page.locator('a:has-text("View Cart")');

        await continueBtn.waitFor({ state: 'visible', timeout: 5000 });

        // If more products still need to be checked → continue shopping
        if (i < slideCount - 1 || j < productCount - 1) {
          await continueBtn.click();
        } else {
          // Last product → Go directly to cart
          await viewCartBtn.click();
        }

        addedCount++;
        await this.page.waitForTimeout(1000);
      } else {
        console.log(`⏩ Skipping: ${productName} with price Rs.${price}`);
      }
    }

    // Move to next slide if not last
    if (i < slideCount - 1) {
      const nextBtn = this.page.locator('#recommended-item-carousel .right');
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await this.page.waitForTimeout(2000);
      }
    }
  }
  // Click on the "View Cart" link to see added items
    
  console.log(`🛒 Total items added: ${addedCount}`);
}

async gotoCart() {
  await this.page.goto('/view_cart');
}

async printCartTotalPrices() {
  let totalPrice = 0;
  const prices = await this.page.locator('.cart_total_price').allTextContents();

  for (let i = 0; i < prices.length; i++) {
    const priceText = prices[i].replace(/[^\d]/g, '');
    const itemPrice = parseInt(priceText, 10);
    totalPrice += itemPrice;

    console.log(`Item ${i + 1} Price: ${itemPrice}, Running Total: ${totalPrice}`);
  }

  console.log(`👉 Final Cart Total = ${totalPrice}`);
  return totalPrice;
}
}