import { Page } from "@playwright/test";
import { CartLocators } from "../locators/CartLocators";

export class CartPage {

    readonly locators: CartLocators;

    constructor(private page: Page) {
        this.locators = new CartLocators(page);
    }

    async removeProductFromCart() {
        await this.locators.removeButton().click();
    }

    async clickCheckout() {
        await this.locators.checkoutButton().click();
    }
}