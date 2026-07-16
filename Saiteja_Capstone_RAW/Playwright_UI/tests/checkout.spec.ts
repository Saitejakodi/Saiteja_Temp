import { test } from "../fixtures/baseFixture";
import { Users } from "../data/Users";
import { CheckoutData } from "../data/CheckoutData";

test("Standard user should checkout successfully", async ({ shopFlow }) => {

    await shopFlow.completeCheckout(
        Users.standard.username,
        Users.standard.password,
        CheckoutData.customer.firstName,
        CheckoutData.customer.lastName,
        CheckoutData.customer.postalCode
    );

});