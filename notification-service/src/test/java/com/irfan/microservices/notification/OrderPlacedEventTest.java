package com.irfan.microservices.notification;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Order Placed Event Unit Tests")
class OrderPlacedEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        OrderPlacedEvent event = new OrderPlacedEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        OrderPlacedEvent event = new OrderPlacedEvent("ORDER-123");
        assertEquals("ORDER-123", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSettersAndGetters() {
        OrderPlacedEvent event = new OrderPlacedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderPlacedEvent event1 = new OrderPlacedEvent("ORDER-100");
        OrderPlacedEvent event2 = new OrderPlacedEvent("ORDER-100");
        OrderPlacedEvent event3 = new OrderPlacedEvent("ORDER-200");

        assertEquals(event1, event2);
        assertEquals(event1.hashCode(), event2.hashCode());
        assertNotEquals(event1, event3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        OrderPlacedEvent event = new OrderPlacedEvent("ORDER-789");
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
    }
}
