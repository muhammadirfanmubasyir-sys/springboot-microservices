package com.irfan.microservices.order.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderStatus Enum Tests")
class OrderStatusTest {

    @Test
    @DisplayName("Should have PENDING value")
    void testPending() {
        assertEquals("PENDING", OrderStatus.PENDING.name());
        assertEquals(0, OrderStatus.PENDING.ordinal());
    }

    @Test
    @DisplayName("Should have CONFIRMED value")
    void testConfirmed() {
        assertEquals("CONFIRMED", OrderStatus.CONFIRMED.name());
        assertEquals(1, OrderStatus.CONFIRMED.ordinal());
    }

    @Test
    @DisplayName("Should have CANCELLED value")
    void testCancelled() {
        assertEquals("CANCELLED", OrderStatus.CANCELLED.name());
        assertEquals(2, OrderStatus.CANCELLED.ordinal());
    }

    @Test
    @DisplayName("Should have exactly 3 values")
    void testValueCount() {
        assertEquals(3, OrderStatus.values().length);
    }

    @Test
    @DisplayName("Should parse from string")
    void testValueOf() {
        assertEquals(OrderStatus.PENDING, OrderStatus.valueOf("PENDING"));
        assertEquals(OrderStatus.CONFIRMED, OrderStatus.valueOf("CONFIRMED"));
        assertEquals(OrderStatus.CANCELLED, OrderStatus.valueOf("CANCELLED"));
    }
}
