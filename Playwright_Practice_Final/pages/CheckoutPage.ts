import { Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/CheckoutLocators";

export class CheckoutPage {

    readonly locators: CheckoutLocators;

    constructor(private page: Page) {
        this.locators = new CheckoutLocators(page);
    }

    async enterCustomerInformation(
        firstName: string,
        lastName: string,
        zipCode: string
    ) {
        await this.locators.firstNameTextbox().fill(firstName);
        await this.locators.lastNameTextbox().fill(lastName);
        await this.locators.zipCodeTextbox().fill(zipCode);
    }

    async clickContinue() {
        await this.locators.continueButton().click();
    }
}