import { test } from "../fixtures/baseFixture";
import { Users } from "../data/Users";

test("Standard user can add Backpack to cart", async ({ shopFlow }) => {

    await shopFlow.loginAndAddBackpack(
        Users.standard.username,
        Users.standard.password
    );

});