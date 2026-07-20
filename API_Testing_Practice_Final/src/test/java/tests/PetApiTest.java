package tests;

import base.BaseTest;
import io.qameta.allure.*;
import models.Pet;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import specs.SpecFactory;

import static io.restassured.RestAssured.given;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Epic("Pet Store API")
@Feature("Pet Management")
@Owner("Saiteja")
public class PetApiTest extends BaseTest {

    @Test
    @DisplayName("Verify Pet CRUD Operations")
    @Story("Pet CRUD")
    @Description("Verify create, retrieve, update and delete pet operations.")
    @Severity(SeverityLevel.CRITICAL)
    void petCrudFlow() {

        Pet pet = new Pet(
                1001L,
                "Tommy",
                "available"
        );

        Pet createdPet =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(pet)

                        .when()
                        .post(SpecFactory.PET)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .body(matchesJsonSchemaInClasspath("schemas/pet-schema.json"))
                        .extract()
                        .as(Pet.class);

        assertEquals("Tommy", createdPet.name());

        Long petId = createdPet.id();

        Pet fetchedPet =
                given()
                        .spec(SpecFactory.requestSpec())
                        .pathParam("petId", petId)

                        .when()
                        .get(SpecFactory.PET_BY_ID)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .body(matchesJsonSchemaInClasspath("schemas/pet-schema.json"))
                        .extract()
                        .as(Pet.class);

        assertEquals(petId, fetchedPet.id());
        assertEquals("Tommy", fetchedPet.name());

        Pet updatedPetBody = new Pet(
                petId,
                "Tommy Updated",
                "sold"
        );

        Pet updatedPet =
                given()
                        .spec(SpecFactory.requestSpec())
                        .body(updatedPetBody)

                        .when()
                        .put(SpecFactory.PET)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .body(matchesJsonSchemaInClasspath("schemas/pet-schema.json"))
                        .extract()
                        .as(Pet.class);

        assertEquals("Tommy Updated", updatedPet.name());
        assertEquals("sold", updatedPet.status());

        given()
                .spec(SpecFactory.requestSpec())
                .pathParam("petId", petId)

                .when()
                .delete(SpecFactory.PET_BY_ID)

                .then()
                .statusCode(200);
    }

    @Test
    @DisplayName("Verify Find Pet By Status")
    @Story("Find Pet")
    @Description("Verify pets can be retrieved by status.")
    @Severity(SeverityLevel.NORMAL)
    void findPetByStatus() {

        Pet[] pets =
                given()
                        .spec(SpecFactory.requestSpec())
                        .queryParam("status", "sold")

                        .when()
                        .get(SpecFactory.PET_BY_STATUS)

                        .then()
                        .spec(SpecFactory.successResponseSpec())
                        .extract()
                        .as(Pet[].class);

        assertTrue(pets.length > 0);
    }
}