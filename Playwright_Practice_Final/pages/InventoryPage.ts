import { Page } from "@playwright/test";
import { InventoryLocators } from "../locators/InventoryLocators";

export class InventoryPage {

    readonly locators: InventoryLocators;

    constructor(private page: Page) {
        this.locators = new InventoryLocators(page);
    }

    async addFirstProductToCart() {
        await this.locators.addFirstProductButton().click();
    }

    async openCart() {
        await this.locators.cartLink().click();
    }
}