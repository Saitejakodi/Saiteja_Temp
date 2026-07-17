import { Page } from "@playwright/test";

export class PassengerDetailsLocators {

    constructor(private page: Page) {}

    firstNameInput = () =>
        this.page.locator("#name-L2");

    lastNameInput = () =>
        this.page.locator("#lastname-L2");

    ageInput = () =>
        this.page.locator("#age-L2");

    genderDropdown = () =>
        this.page.locator("#gender-L2");

    emailInput = () =>
        this.page.locator("#email");

    phoneInput = () =>
        this.page.locator("#phone");

    continueButton = () =>
        this.page.getByRole("button", {
            name: "Continue to payment"
        });
}