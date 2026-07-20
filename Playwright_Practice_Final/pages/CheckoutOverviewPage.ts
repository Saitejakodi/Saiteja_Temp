import { Page } from "@playwright/test";
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";

export class CheckoutOverviewPage {

    readonly locators: CheckoutOverviewLocators;

    constructor(private page: Page) {
        this.locators = new CheckoutOverviewLocators(page);
    }

    async clickFinish() {
        await this.locators.finishButton().click();
    }
}