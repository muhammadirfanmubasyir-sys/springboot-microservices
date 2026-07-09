package com.irfan.microservices.order.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderPlacedEvent Tests")
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
    void testSetGetOrderNumber() {
        OrderPlacedEvent event = new OrderPlacedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderPlacedEvent e1 = new OrderPlacedEvent("ORDER-100");
        OrderPlacedEvent e2 = new OrderPlacedEvent("ORDER-100");
        OrderPlacedEvent e3 = new OrderPlacedEvent("ORDER-200");

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
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
