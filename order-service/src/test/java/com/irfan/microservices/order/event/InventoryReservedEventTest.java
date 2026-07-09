package com.irfan.microservices.order.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("InventoryReservedEvent Tests")
class InventoryReservedEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        InventoryReservedEvent event = new InventoryReservedEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
        assertNull(event.getReservedSkuCodes());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        List<String> skuCodes = List.of("iPhone-50", "Samsung-100");
        InventoryReservedEvent event = new InventoryReservedEvent("ORDER-123", skuCodes);

        assertEquals("ORDER-123", event.getOrderNumber());
        assertEquals(2, event.getReservedSkuCodes().size());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        InventoryReservedEvent event = new InventoryReservedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get reservedSkuCodes")
    void testSetGetReservedSkuCodes() {
        InventoryReservedEvent event = new InventoryReservedEvent();
        List<String> skuCodes = new ArrayList<>();
        skuCodes.add("iPhone-50");
        event.setReservedSkuCodes(skuCodes);

        assertEquals(1, event.getReservedSkuCodes().size());
        assertEquals("iPhone-50", event.getReservedSkuCodes().get(0));
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        InventoryReservedEvent e1 = new InventoryReservedEvent("ORDER-100", List.of("SKU-1"));
        InventoryReservedEvent e2 = new InventoryReservedEvent("ORDER-100", List.of("SKU-1"));
        InventoryReservedEvent e3 = new InventoryReservedEvent("ORDER-200", List.of("SKU-2"));

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        InventoryReservedEvent event = new InventoryReservedEvent("ORDER-789", List.of("SKU-1"));
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
    }
}
