import { Page } from "@playwright/test";

export class CheckoutCompleteLocators {

    constructor(private page: Page) {}

    orderConfirmation = () =>
        this.page.getByText("Thank you for your order!");
}