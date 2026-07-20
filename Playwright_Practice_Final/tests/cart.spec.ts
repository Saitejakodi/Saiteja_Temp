import { test } from "../fixtures/baseFixtures";

test.describe("Cart", () => {

    test.beforeEach(async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.loginAsStandardUser();
    });

    test("Add Product To Cart", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.addFirstProductToCart();

        await sauceDemoFlow.verifyCartBadgeCount("1");
    });

    test("Remove Product From Cart", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.addFirstProductToCart();

        await sauceDemoFlow.openCart();

        await sauceDemoFlow.removeProductFromCart();

        await sauceDemoFlow.verifyCartIsEmpty();
    });

});