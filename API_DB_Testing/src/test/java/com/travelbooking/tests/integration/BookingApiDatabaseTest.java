package com.travelbooking.tests.integration;

import com.travelbooking.base.BaseTest;
import com.travelbooking.models.request.HoldRequest;
import com.travelbooking.models.request.PaymentRequest;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class BookingApiDatabaseTest extends BaseTest {

    @Test
    void shouldValidateBookingInApiAndDatabase() {

        Response searchResponse = searchClient.searchBuses(
                "LKO",
                "BLR",
                "2026-08-12",
                token
        );

        assertEquals(200, searchResponse.getStatusCode());

        String inventoryId = searchResponse.jsonPath().getString("buses[0].id");
        assertNotNull(inventoryId);

        HoldRequest holdRequest = new HoldRequest(
                "bus",
                inventoryId,
                List.of("L1"),
                true,
                300
        );

        Response holdResponse = bookingClient.holdBooking(holdRequest, token);

        assertEquals(200, holdResponse.getStatusCode());

        String bookingId = holdResponse.jsonPath().getString("id");
        assertNotNull(bookingId);

        Response paymentResponse = paymentClient.pay(
                bookingId,
                new PaymentRequest("CARD"),
                token
        );

        assertEquals(200, paymentResponse.getStatusCode());

        Response confirmResponse = bookingClient.confirmBooking(
                bookingId,
                token
        );

        assertEquals(200, confirmResponse.getStatusCode());

        Response bookingsResponse = bookingClient.getMyBookings(token);

        assertEquals(200, bookingsResponse.getStatusCode());

        String pnr = bookingsResponse.jsonPath().getString("[0].pnr");

        assertNotNull(pnr);
        assertFalse(pnr.isBlank());
    }
}