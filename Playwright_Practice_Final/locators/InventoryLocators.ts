import { Page } from "@playwright/test";

export class InventoryLocators {

    constructor(private page: Page) {}

    inventoryTitle = () =>
        this.page.locator("[data-test='title']");

    firstProductPrice = () =>
        this.page.locator("[data-test='inventory-item-price']").first();

    addFirstProductButton = () =>
        this.page.getByRole("button", { name: "Add to cart" }).first();

    cartLink = () =>
        this.page.locator("[data-test='shopping-cart-link']");

    cartBadge = () =>
        this.page.locator("[data-test='shopping-cart-badge']");
}