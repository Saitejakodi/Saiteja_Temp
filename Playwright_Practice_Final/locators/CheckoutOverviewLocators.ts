import { Page } from "@playwright/test";

export class CheckoutOverviewLocators {

    constructor(private page: Page) {}

    paymentInformationLabel = () =>
        this.page.getByText("Payment Information");

    finishButton = () =>
        this.page.getByRole("button", { name: "Finish" });
}