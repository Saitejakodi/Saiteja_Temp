import { Page } from "@playwright/test";

export class InventoryLocators {

    constructor(private page: Page) {}

    pageTitle = () =>
        this.page.getByText("Products");

    shoppingCart = () =>
        this.page.locator(".shopping_cart_link");

    addBackpack = () =>
        this.page.locator("#add-to-cart-sauce-labs-backpack");

    addBikeLight = () =>
        this.page.locator("#add-to-cart-sauce-labs-bike-light");

}