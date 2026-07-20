import { test, expect } from "../fixtures/baseFixtures";

test.describe("Login", () => {

    test("Valid Login", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.loginAsStandardUser();
    });

    test("Invalid Login", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.loginAsInvalidUser();

        await sauceDemoFlow.verifyInvalidLoginError();
    });

    test("Locked User Login", async ({ sauceDemoFlow }) => {

        await sauceDemoFlow.loginAsLockedUser();

        await sauceDemoFlow.verifyLockedUserError();
    });

});