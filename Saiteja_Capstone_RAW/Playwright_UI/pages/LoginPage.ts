import { Page } from "@playwright/test";
import { Config } from "../config/Config";
import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage {

    private locators: LoginLocators;

    constructor(private page: Page) {
        this.locators = new LoginLocators(page);
    }

    async open() {
        await this.page.goto(Config.baseUrl);
    }

    async enterUsername(username: string) {
        await this.locators.usernameInput().fill(username);
    }

    async enterPassword(password: string) {
        await this.locators.passwordInput().fill(password);
    }

    async clickLogin() {
        await this.locators.loginButton().click();
    }

    async login(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}