import { expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { LoginData } from "../data/LoginData";
import { CheckoutData } from "../data/CheckoutData";
import { logger } from "../logger/Logger";

export class SauceDemoFlow {

    readonly loginPage: LoginPage;
    readonly inventoryPage: InventoryPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;
    readonly checkoutOverviewPage: CheckoutOverviewPage;
    readonly checkoutCompletePage: CheckoutCompletePage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.inventoryPage = new InventoryPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.checkoutOverviewPage = new CheckoutOverviewPage(page);
        this.checkoutCompletePage = new CheckoutCompletePage(page);
    }

    async loginAsStandardUser() {

        logger.info("Logging in as Standard User");

        await this.loginPage.navigateToWebsite();

        await this.loginPage.login(
            LoginData.validUser.username,
            LoginData.validUser.password
        );

        await expect(
            this.loginPage.locators.inventoryTitle()
        ).toHaveText("Products");

        logger.info("Standard User logged in successfully");
    }

    async loginAsInvalidUser() {

        logger.info("Attempting login with invalid credentials");

        await this.loginPage.navigateToWebsite();

        await this.loginPage.login(
            LoginData.invalidUser.username,
            LoginData.invalidUser.password
        );
    }

    async loginAsLockedUser() {

        logger.info("Attempting login with locked user");

        await this.loginPage.navigateToWebsite();

        await this.loginPage.login(
            LoginData.lockedUser.username,
            LoginData.lockedUser.password
        );
    }

    async reachCheckoutPage() {

        logger.info("Navigating to Checkout page");

        await this.inventoryPage.addFirstProductToCart();

        await this.inventoryPage.openCart();

        await this.cartPage.clickCheckout();

        logger.info("Reached Checkout Information page");
    }

    async enterValidCustomerInformation() {

        logger.info("Entering customer information");

        await this.checkoutPage.enterCustomerInformation(
            CheckoutData.customer.firstName,
            CheckoutData.customer.lastName,
            CheckoutData.customer.zipCode
        );

        await this.checkoutPage.clickContinue();

        logger.info("Customer information entered successfully");
    }

    async completeOrder() {

        logger.info("Completing the order");

        await this.checkoutOverviewPage.clickFinish();

        logger.info("Order completed successfully");
    }

    async addFirstProductToCart() {

        logger.info("Adding first product to cart");

        await this.inventoryPage.addFirstProductToCart();

        logger.info("Product added to cart");
    }

    async openCart() {

        logger.info("Opening cart");

        await this.inventoryPage.openCart();

        logger.info("Cart opened");
    }

    async removeProductFromCart() {

        logger.info("Removing product from cart");

        await this.cartPage.removeProductFromCart();

        logger.info("Product removed from cart");
    }

    async clickCheckout() {

        logger.info("Clicking Checkout");

        await this.cartPage.clickCheckout();
    }

    async clickContinue() {

        logger.info("Clicking Continue");

        await this.checkoutPage.clickContinue();
    }

    async clickFinish() {

        logger.info("Clicking Finish");

        await this.checkoutOverviewPage.clickFinish();
    }

    async verifyCartBadgeCount(count: string) {

        logger.info(`Verifying cart badge count: ${count}`);

        await expect(
            this.inventoryPage.locators.cartBadge()
        ).toHaveText(count);

        logger.info("Cart badge verified successfully");
    }

    async verifyBackpackProductVisible() {

        logger.info("Verifying Backpack product is visible");

        await expect(
            this.cartPage.locators.backpackProduct()
        ).toBeVisible();

        logger.info("Backpack product is visible");
    }

    async verifyCartIsEmpty() {

        logger.info("Verifying cart is empty");

        await expect(
            this.cartPage.locators.cartItems()
        ).toHaveCount(0);

        logger.info("Cart is empty");
    }

    async verifyOrderCompleted() {

        logger.info("Verifying order confirmation");

        await expect(
            this.checkoutCompletePage.locators.orderConfirmation()
        ).toHaveText("Thank you for your order!");

        logger.info("Order confirmation verified");
    }

    async verifyInvalidLoginError() {

        logger.info("Verifying invalid login error message");

        await expect(
            this.loginPage.locators.errorMessage()
        ).toContainText("Username and password do not match");

        logger.info("Invalid login error verified");
    }

    async verifyLockedUserError() {

        logger.info("Verifying locked user error message");

        await expect(
            this.loginPage.locators.errorMessage()
        ).toContainText("Sorry, this user has been locked out.");

        logger.info("Locked user error verified");
    }
}