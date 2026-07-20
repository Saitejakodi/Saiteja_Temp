package specs;

import io.qameta.allure.restassured.AllureRestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.builder.ResponseSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import io.restassured.specification.ResponseSpecification;

import static org.hamcrest.Matchers.lessThan;

public final class SpecFactory {

    private SpecFactory() {
    }


    public static final String PET = "/pet";
    public static final String PET_BY_ID = "/pet/{petId}";
    public static final String PET_BY_STATUS = "/pet/findByStatus";


    public static final String ORDER = "/store/order";
    public static final String ORDER_BY_ID = "/store/order/{orderId}";
    public static final String INVENTORY = "/store/inventory";


    public static final String USER = "/user";
    public static final String USER_BY_NAME = "/user/{username}";
    public static final String LOGIN = "/user/login";
    public static final String LOGOUT = "/user/logout";


    public static RequestSpecification requestSpec() {
        return new RequestSpecBuilder()
                .setContentType(ContentType.JSON)
                .addFilter(new AllureRestAssured())
                .log(LogDetail.ALL)
                .build();
    }


    public static ResponseSpecification successResponseSpec() {
        return new ResponseSpecBuilder()
                .expectStatusCode(200)
                .expectContentType(ContentType.JSON)
                .expectResponseTime(lessThan(5000L))
                .build();
    }
}