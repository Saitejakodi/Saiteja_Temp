import { Page } from "@playwright/test";

export class CheckoutLocators {

    constructor(private page: Page) {}

    firstNameTextbox = () =>
        this.page.getByPlaceholder("First Name");

    lastNameTextbox = () =>
        this.page.getByPlaceholder("Last Name");

    zipCodeTextbox = () =>
        this.page.getByPlaceholder("Zip/Postal Code");

    continueButton = () =>
        this.page.getByRole("button", { name: "Continue" });

    errorMessage = () =>
        this.page.locator("[data-test='error']");
}