import { Page } from "@playwright/test";

export class LoginLocators {

    constructor(private page: Page) {}

    usernameTextbox = () =>
        this.page.locator("[data-test='username']");

    passwordTextbox = () =>
        this.page.locator("[data-test='password']");

    loginButton = () =>
        this.page.locator("[data-test='login-button']");

    inventoryTitle = () =>
        this.page.locator("[data-test='title']");

    errorMessage = () =>
        this.page.locator("[data-test='error']");
}