import { Page } from "@playwright/test";
import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage {

    readonly locators: LoginLocators;

    constructor(private page: Page) {
        this.locators = new LoginLocators(page);
    }

    async navigateToWebsite() {
        await this.page.goto("/");
    }

    async login(username: string, password: string) {

        await this.locators.usernameTextbox().fill(username);

        await this.locators.passwordTextbox().fill(password);

        await this.locators.loginButton().click();
    }
}