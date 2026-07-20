package tests;

import base.BaseTest;
import io.qameta.allure.*;
import io.restassured.response.Response;
import models.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import specs.SpecFactory;

import static io.qameta.allure.SeverityLevel.CRITICAL;
import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Epic("Pet Store API")
@Feature("User Management")
@Owner("Saiteja")
public class UserApiTest extends BaseTest {

    @Test
    @DisplayName("Verify Create, Get and Update User")
    @Story("Create User")
    @Description("Verify user can be created, retrieved and updated.")
    @Severity(CRITICAL)
    void createGetAndUpdateUser() {

        User user = new User(
                1L,
                "saiteja",
                "Sai",
                "Teja",
                "sai@test.com",
                "9999999999",
                1
        );

        createUser(user);

        User fetchedUser = getUser("saiteja");

        validateUser(fetchedUser);

        User updatedUser = new User(
                1L,
                "saiteja",
                "Sai Teja Updated",
                "Teja",
                "sai@test.com",
                "9999999999",
                1
        );

        updateUser(updatedUser);
    }

    @Test
    @DisplayName("Verify User Login")
    @Story("Login User")
    @Severity(SeverityLevel.NORMAL)
    void loginUser() {

        Response response =
                given()
                        .queryParam("username", "saiteja")
                        .queryParam("password", "test123")

                        .when()
                        .get(SpecFactory.LOGIN)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .response();

        Allure.addAttachment("Login Response", response.asPrettyString());
    }

    @Test
    @DisplayName("Verify User Logout")
    @Story("Logout User")
    @Severity(SeverityLevel.NORMAL)
    void logoutUser() {

        Response response =
                given()

                        .when()
                        .get(SpecFactory.LOGOUT)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .response();

        Allure.addAttachment("Logout Response", response.asPrettyString());
    }

    @Step("Create User")
    private void createUser(User user) {

        Response response =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(user)

                        .when()
                        .post(SpecFactory.USER)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .response();

        Allure.addAttachment("Create User", response.asPrettyString());
    }

    @Step("Get User")
    private User getUser(String username) {

        Response response =
                given()
                        .spec(SpecFactory.requestSpec())
                        .pathParam("username", username)

                        .when()
                        .get(SpecFactory.USER_BY_NAME)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .response();

        Allure.addAttachment("Get User", response.asPrettyString());

        return response.as(User.class);
    }

    @Step("Validate User")
    private void validateUser(User user) {

        assertEquals("saiteja", user.username());
        assertEquals("Sai", user.firstName());
    }

    @Step("Update User")
    private void updateUser(User user) {

        Response response =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(user)
                        .pathParam("username", user.username())

                        .when()
                        .put(SpecFactory.USER_BY_NAME)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .response();

        Allure.addAttachment("Update User", response.asPrettyString());
    }
}