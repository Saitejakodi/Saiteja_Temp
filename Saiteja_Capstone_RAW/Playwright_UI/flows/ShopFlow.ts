import { logger } from "../logger/Logger";
import { Mask } from "../helpers/Mask";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export class ShopFlow {

    constructor(
        private loginPage: LoginPage,
        private inventoryPage: InventoryPage,
        private cartPage: CartPage,
        private checkoutPage: CheckoutPage
    ) {}

    async login(username: string, password: string) {

        logger.info("Starting Login Flow");

        await this.loginPage.open();

        await this.loginPage.login(username, password);

        logger.info("Login Request", {
            username,
            password: Mask.secret(password)
        });

        await this.inventoryPage.verifyInventoryPage();

        logger.info("Login Flow Completed");
    }

    async addBackpackToCart() {

        logger.info("Adding Backpack to Cart");

        await this.inventoryPage.addBackpackToCart();

        logger.info("Backpack Added Successfully");
    }

    async openCart() {

        logger.info("Opening Shopping Cart");

        await this.inventoryPage.openCart();

        await this.cartPage.verifyCartPage();

        logger.info("Shopping Cart Opened");
    }

    async loginAndAddBackpack(username: string, password: string) {

        logger.info("Starting Login and Add Backpack Flow");

        await this.login(username, password);

        await this.addBackpackToCart();

        await this.openCart();

        logger.info("Login and Add Backpack Flow Completed");
    }

    async goToCheckout(username: string, password: string) {

        logger.info("Starting Checkout Navigation");

        await this.login(username, password);

        await this.addBackpackToCart();

        await this.openCart();

        await this.cartPage.verifyBackpackPresent();

        await this.cartPage.clickCheckout();

        logger.info("Reached Checkout Information Page");
    }

    async completeCheckout(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        postalCode: string
    ) {

        logger.info("Starting Complete Checkout Flow");

        await this.goToCheckout(username, password);

        await this.checkoutPage.enterCheckoutInformation(
            firstName,
            lastName,
            postalCode
        );

        logger.info("Checkout Information Submitted Successfully");
    }
}