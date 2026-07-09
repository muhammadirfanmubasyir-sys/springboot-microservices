package com.irfan.microservices.inventory.event;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("InventoryFailedEvent Tests")
class InventoryFailedEventTest {

    @Test
    @DisplayName("Should create event with no-arg constructor")
    void testNoArgConstructor() {
        InventoryFailedEvent event = new InventoryFailedEvent();
        assertNotNull(event);
        assertNull(event.getOrderNumber());
        assertNull(event.getFailedSkuCodes());
        assertNull(event.getReason());
    }

    @Test
    @DisplayName("Should create event with all-args constructor")
    void testAllArgsConstructor() {
        InventoryFailedEvent event = new InventoryFailedEvent("ORDER-123", List.of("SKU-1"), "Insufficient stock");

        assertEquals("ORDER-123", event.getOrderNumber());
        assertEquals(1, event.getFailedSkuCodes().size());
        assertEquals("Insufficient stock", event.getReason());
    }

    @Test
    @DisplayName("Should set and get orderNumber")
    void testSetGetOrderNumber() {
        InventoryFailedEvent event = new InventoryFailedEvent();
        event.setOrderNumber("ORDER-456");
        assertEquals("ORDER-456", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should set and get failedSkuCodes")
    void testSetGetFailedSkuCodes() {
        InventoryFailedEvent event = new InventoryFailedEvent();
        List<String> failedSkus = List.of("SKU-1", "SKU-2");
        event.setFailedSkuCodes(failedSkus);

        assertEquals(2, event.getFailedSkuCodes().size());
    }

    @Test
    @DisplayName("Should set and get reason")
    void testSetGetReason() {
        InventoryFailedEvent event = new InventoryFailedEvent();
        event.setReason("Connection timeout");
        assertEquals("Connection timeout", event.getReason());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        InventoryFailedEvent e1 = new InventoryFailedEvent("ORDER-100", List.of("SKU-1"), "Reason");
        InventoryFailedEvent e2 = new InventoryFailedEvent("ORDER-100", List.of("SKU-1"), "Reason");
        InventoryFailedEvent e3 = new InventoryFailedEvent("ORDER-200", List.of("SKU-2"), "Other");

        assertEquals(e1, e2);
        assertEquals(e1.hashCode(), e2.hashCode());
        assertNotEquals(e1, e3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        InventoryFailedEvent event = new InventoryFailedEvent("ORDER-789", List.of("SKU-1"), "Timeout");
        String result = event.toString();
        assertNotNull(result);
        assertTrue(result.contains("ORDER-789"));
        assertTrue(result.contains("Timeout"));
    }
}
