import { Page } from "@playwright/test";

export class LoginLocators {

    constructor(private page: Page) {}

    usernameInput = () => this.page.getByPlaceholder("Username");

    passwordInput = () => this.page.getByPlaceholder("Password");

    loginButton = () => this.page.getByRole("button", { name: "Login" });

}