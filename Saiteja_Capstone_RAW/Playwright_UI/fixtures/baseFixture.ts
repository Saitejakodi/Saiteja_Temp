import { test as base, expect } from "@playwright/test";
import { ShopFlow } from "../flows/ShopFlow";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    shopFlow: ShopFlow;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    shopFlow: async (
        {
            loginPage,
            inventoryPage,
            cartPage,
            checkoutPage
        },
        use
    ) => {

        await use(
            new ShopFlow(
                loginPage,
                inventoryPage,
                cartPage,
                checkoutPage
            )
        );

    }

});

export { expect };