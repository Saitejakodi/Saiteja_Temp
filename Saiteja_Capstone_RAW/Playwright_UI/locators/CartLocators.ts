import { Page } from "@playwright/test";

export class CartLocators {

    constructor(private page: Page) {}

    cartTitle = () =>
        this.page.getByText("Your Cart");

    backpackItem = () =>
        this.page.getByText("Sauce Labs Backpack");

    checkoutButton = () =>
        this.page.locator("#checkout");

    continueShoppingButton = () =>
        this.page.locator("#continue-shopping");

}