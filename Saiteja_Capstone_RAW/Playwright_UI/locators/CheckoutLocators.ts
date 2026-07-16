import { Page } from "@playwright/test";

export class CheckoutLocators {

    constructor(private page: Page) {}

    firstName = () =>
        this.page.locator("#first-name");

    lastName = () =>
        this.page.locator("#last-name");

    postalCode = () =>
        this.page.locator("#postal-code");

    continueButton = () =>
        this.page.locator("#continue");

}