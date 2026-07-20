import { Page } from "@playwright/test";
import { CheckoutCompleteLocators } from "../locators/CheckoutCompleteLocators";

export class CheckoutCompletePage {

    readonly locators: CheckoutCompleteLocators;

    constructor(private page: Page) {
        this.locators = new CheckoutCompleteLocators(page);
    }
}