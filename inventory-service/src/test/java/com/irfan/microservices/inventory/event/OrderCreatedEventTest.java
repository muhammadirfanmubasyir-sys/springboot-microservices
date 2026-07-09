package com.irfan.microservices.inventory.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderCreatedEvent Tests")
class OrderCreatedEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
        assertNull(event.getItems());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        List<OrderCreatedEvent.OrderItemEvent> items = new ArrayList<>();
        items.add(new OrderCreatedEvent.OrderItemEvent("iPhone-50", 5, BigDecimal.valueOf(999.99)));
        OrderCreatedEvent event = new OrderCreatedEvent("ORDER-123", items);

        assertEquals("ORDER-123", event.getOrderNumber());
        assertEquals(1, event.getItems().size());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get items")
    void testSetGetItems() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        List<OrderCreatedEvent.OrderItemEvent> items = new ArrayList<>();
        items.add(new OrderCreatedEvent.OrderItemEvent("SKU-1", 3, BigDecimal.valueOf(100)));
        event.setItems(items);

        assertEquals(1, event.getItems().size());
        assertEquals("SKU-1", event.getItems().get(0).getSkuCode());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderCreatedEvent e1 = new OrderCreatedEvent("ORDER-100", List.of());
        OrderCreatedEvent e2 = new OrderCreatedEvent("ORDER-100", List.of());
        OrderCreatedEvent e3 = new OrderCreatedEvent("ORDER-200", List.of());

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        OrderCreatedEvent event = new OrderCreatedEvent("ORDER-789", List.of());
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
    }

    @Test
    @DisplayName("Should handle OrderItemEvent inner class")
    void testOrderItemEvent() {
        OrderCreatedEvent.OrderItemEvent item = new OrderCreatedEvent.OrderItemEvent();
        item.setSkuCode("iPhone-50");
        item.setQuantity(5);
        item.setPrice(BigDecimal.valueOf(999.99));

        assertEquals("iPhone-50", item.getSkuCode());
        assertEquals(5, item.getQuantity());
        assertEquals(BigDecimal.valueOf(999.99), item.getPrice());
    }

    @Test
    @DisplayName("Should handle OrderItemEvent with all-args constructor")
    void testOrderItemEventAllArgsConstructor() {
        OrderCreatedEvent.OrderItemEvent item = new OrderCreatedEvent.OrderItemEvent(
                "Samsung-100", 3, BigDecimal.valueOf(500.00));

        assertEquals("Samsung-100", item.getSkuCode());
        assertEquals(3, item.getQuantity());
        assertEquals(BigDecimal.valueOf(500.00), item.getPrice());
    }

    @Test
    @DisplayName("Should handle OrderItemEvent equals and hashCode")
    void testOrderItemEventEqualsAndHashCode() {
        OrderCreatedEvent.OrderItemEvent i1 = new OrderCreatedEvent.OrderItemEvent("SKU-1", 5, BigDecimal.valueOf(100));
        OrderCreatedEvent.OrderItemEvent i2 = new OrderCreatedEvent.OrderItemEvent("SKU-1", 5, BigDecimal.valueOf(100));
        OrderCreatedEvent.OrderItemEvent i3 = new OrderCreatedEvent.OrderItemEvent("SKU-2", 3, BigDecimal.valueOf(200));

        assertEquals(i1, i2);
        assertEquals(i1.hashCode(), i2.hashCode());
        assertNotEquals(i1, i3);
    }

    @Test
    @DisplayName("Should handle OrderItemEvent toString")
    void testOrderItemEventToString() {
        OrderCreatedEvent.OrderItemEvent item = new OrderCreatedEvent.OrderItemEvent("SKU-1", 5, BigDecimal.valueOf(100));
        String result = item.toString();
        assertNotNull(result);
        assertTrue(result.contains("SKU-1"));
    }
}
