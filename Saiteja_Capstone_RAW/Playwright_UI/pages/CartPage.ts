import { expect, Page } from "@playwright/test";
import { CartLocators } from "../locators/CartLocators";

export class CartPage {

    private locators: CartLocators;

    constructor(private page: Page) {
        this.locators = new CartLocators(page);
    }

    async verifyCartPage() {
        await expect(this.locators.cartTitle()).toBeVisible();
    }

    async verifyBackpackPresent() {
        await expect(this.locators.backpackItem()).toBeVisible();
    }

    async clickCheckout() {
        await this.locators.checkoutButton().click();
    }

    async continueShopping() {
        await this.locators.continueShoppingButton().click();
    }

}