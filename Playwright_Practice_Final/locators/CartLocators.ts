import { Page } from "@playwright/test";

export class CartLocators {

    constructor(private page: Page) {}

    backpackProduct = () =>
        this.page.getByText("Sauce Labs Backpack");

    removeButton = () =>
        this.page.getByRole("button", { name: "Remove" });

    cartItems = () =>
        this.page.locator("[data-test='inventory-item']");

    checkoutButton = () =>
        this.page.getByRole("button", { name: "Checkout" });
}