import { test } from "../fixtures/baseFixtures";

test.describe("Checkout", () => {

    test.beforeEach(async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.loginAsStandardUser();

        await sauceDemoFlow.reachCheckoutPage();
    });

    test("Complete Checkout", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.enterValidCustomerInformation();

        await sauceDemoFlow.completeOrder();

        await sauceDemoFlow.verifyOrderCompleted();
    });

});