package com.travelbooking.tests.integration;

import com.travelbooking.base.BaseTest;
import com.travelbooking.database.models.Booking;
import com.travelbooking.database.queries.BookingQueries;
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

        String inventoryId = searchResponse.jsonPath().getString("buses[0].id");

        HoldRequest holdRequest = new HoldRequest(
                "bus",
                inventoryId,
                List.of("L1"),
                true,
                300
        );

        Response holdResponse = bookingClient.holdBooking(holdRequest, token);

        String bookingId = holdResponse.jsonPath().getString("id");

        paymentClient.pay(
                bookingId,
                new PaymentRequest("CARD"),
                token
        );

        bookingClient.confirmBooking(bookingId, token);

        Response bookingsResponse = bookingClient.getMyBookings(token);

        String pnr = bookingsResponse.jsonPath().getString("[0].pnr");

        BookingQueries bookingQueries = new BookingQueries();

        Booking booking = bookingQueries.getBookingByPnr(pnr);

        assertNotNull(booking);
        assertEquals(pnr, booking.getPnr());
        assertEquals("LKO", booking.getSourceCity());
        assertEquals("BLR", booking.getDestinationCity());
        assertEquals("CONFIRMED", booking.getBookingStatus());
    }
}