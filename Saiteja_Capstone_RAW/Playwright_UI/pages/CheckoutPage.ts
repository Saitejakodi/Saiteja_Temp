import { CheckoutLocators } from "../locators/CheckoutLocators";
import { Page } from "@playwright/test";

export class CheckoutPage {

    private locators: CheckoutLocators;

    constructor(private page: Page) {
        this.locators = new CheckoutLocators(page);
    }

    async enterFirstName(firstName: string) {
        await this.locators.firstName().fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.locators.lastName().fill(lastName);
    }

    async enterPostalCode(postalCode: string) {
        await this.locators.postalCode().fill(postalCode);
    }

    async clickContinue() {
        await this.locators.continueButton().click();
    }

    async enterCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ) {

        await this.enterFirstName(firstName);

        await this.enterLastName(lastName);

        await this.enterPostalCode(postalCode);

        await this.clickContinue();

    }

}