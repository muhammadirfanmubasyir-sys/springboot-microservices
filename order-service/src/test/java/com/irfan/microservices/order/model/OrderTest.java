package com.irfan.microservices.order.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Order Entity Tests")
class OrderTest {

    @Test
    @DisplayName("Should create order with no-arg constructor")
    void testNoArgConstructor() {
        Order order = new Order();
        assertNotNull(order);
        assertNull(order.getId());
        assertNull(order.getOrderNumber());
        assertNull(order.getStatus());
        assertNull(order.getOrderLineItemsList());
    }

    @Test
    @DisplayName("Should create order with all-args constructor")
    void testAllArgsConstructor() {
        List<OrderLineItems> items = new ArrayList<>();
        items.add(new OrderLineItems());
        Order order = new Order(1L, "ORDER-123", OrderStatus.PENDING, items);

        assertEquals(1L, order.getId());
        assertEquals("ORDER-123", order.getOrderNumber());
        assertEquals(OrderStatus.PENDING, order.getStatus());
        assertNotNull(order.getOrderLineItemsList());
        assertEquals(1, order.getOrderLineItemsList().size());
    }

    @Test
    @DisplayName("Should set and get id")
    void testSetGetId() {
        Order order = new Order();
        order.setId(42L);
        assertEquals(42L, order.getId());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        Order order = new Order();
        order.setOrderNumber("ORDER-ABC");
        assertEquals("ORDER-ABC", order.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get status")
    void testSetGetStatus() {
        Order order = new Order();
        order.setStatus(OrderStatus.CONFIRMED);
        assertEquals(OrderStatus.CONFIRMED, order.getStatus());
    }

    @Test
    @DisplayName("Should set and get orderLineItemsList")
    void testSetGetOrderLineItemsList() {
        Order order = new Order();
        List<OrderLineItems> items = new ArrayList<>();
        items.add(new OrderLineItems());
        order.setOrderLineItemsList(items);

        assertNotNull(order.getOrderLineItemsList());
        assertEquals(1, order.getOrderLineItemsList().size());
    }

    @Test
    @DisplayName("Should handle null orderLineItemsList")
    void testNullOrderLineItemsList() {
        Order order = new Order();
        order.setOrderLineItemsList(null);
        assertNull(order.getOrderLineItemsList());
    }

    @Test
    @DisplayName("Should handle empty orderLineItemsList")
    void testEmptyOrderLineItemsList() {
        Order order = new Order();
        order.setOrderLineItemsList(new ArrayList<>());
        assertNotNull(order.getOrderLineItemsList());
        assertTrue(order.getOrderLineItemsList().isEmpty());
    }
}
