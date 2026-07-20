package tests;

import base.BaseTest;
import io.qameta.allure.*;
import models.Order;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import specs.SpecFactory;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Epic("Pet Store API")
@Feature("Store Management")
@Owner("Saiteja")
public class StoreApiTest extends BaseTest {

    @Test
    @DisplayName("Verify Place Order and Get Order By ID")
    @Story("Store Order")
    @Description("Verify an order can be placed and retrieved by ID.")
    @Severity(SeverityLevel.CRITICAL)
    void placeOrderAndGetOrder() {

        Order order = new Order(
                1L,
                1001L,
                2,
                "placed",
                true
        );

        Order createdOrder =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(order)

                        .when()
                        .post(SpecFactory.ORDER)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .body(matchesJsonSchemaInClasspath("schemas/order-schema.json"))
                        .extract()
                        .as(Order.class);

        assertEquals(2, createdOrder.quantity());

        Long orderId = createdOrder.id();

        Order fetchedOrder =
                given()
                        .spec(SpecFactory.requestSpec())
                        .pathParam("orderId", orderId)

                        .when()
                        .get(SpecFactory.ORDER_BY_ID)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .body(matchesJsonSchemaInClasspath("schemas/order-schema.json"))
                        .extract()
                        .as(Order.class);

        assertEquals(orderId, fetchedOrder.id());
        assertEquals("placed", fetchedOrder.status());
    }
}