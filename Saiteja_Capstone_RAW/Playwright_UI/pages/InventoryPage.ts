import { expect, Page } from "@playwright/test";
import { InventoryLocators } from "../locators/InventoryLocators";

export class InventoryPage {

    private locators: InventoryLocators;

    constructor(private page: Page) {
        this.locators = new InventoryLocators(page);
    }

    async verifyInventoryPage() {
        await expect(this.locators.pageTitle()).toBeVisible();
    }

    async addBackpackToCart() {
        await this.locators.addBackpack().click();
    }

    async openCart() {
        await this.locators.shoppingCart().click();
    }

}