package com.irfan.microservices.notification;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderCancelledEvent Tests")
class OrderCancelledEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        OrderCancelledEvent event = new OrderCancelledEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
        assertNull(event.getReason());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        OrderCancelledEvent event = new OrderCancelledEvent("ORDER-123", "Out of stock");
        assertEquals("ORDER-123", event.getOrderNumber());
        assertEquals("Out of stock", event.getReason());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        OrderCancelledEvent event = new OrderCancelledEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get reason")
    void testSetGetReason() {
        OrderCancelledEvent event = new OrderCancelledEvent();
        event.setReason("Connection timeout");
        assertEquals("Connection timeout", event.getReason());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderCancelledEvent e1 = new OrderCancelledEvent("ORDER-100", "Reason");
        OrderCancelledEvent e2 = new OrderCancelledEvent("ORDER-100", "Reason");
        OrderCancelledEvent e3 = new OrderCancelledEvent("ORDER-200", "Other");

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        OrderCancelledEvent event = new OrderCancelledEvent("ORDER-789", "Timeout");
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
        assertTrue(result.contains("Timeout"));
    }
}
