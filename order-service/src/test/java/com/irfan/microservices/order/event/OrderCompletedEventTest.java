package com.irfan.microservices.order.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderCompletedEvent Tests")
class OrderCompletedEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        OrderCompletedEvent event = new OrderCompletedEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        OrderCompletedEvent event = new OrderCompletedEvent("ORDER-123");
        assertEquals("ORDER-123", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        OrderCompletedEvent event = new OrderCompletedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderCompletedEvent e1 = new OrderCompletedEvent("ORDER-100");
        OrderCompletedEvent e2 = new OrderCompletedEvent("ORDER-100");
        OrderCompletedEvent e3 = new OrderCompletedEvent("ORDER-200");

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        OrderCompletedEvent event = new OrderCompletedEvent("ORDER-789");
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
    }
}
