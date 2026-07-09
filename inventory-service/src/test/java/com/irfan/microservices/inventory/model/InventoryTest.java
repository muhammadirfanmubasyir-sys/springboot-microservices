package com.irfan.microservices.inventory.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Inventory Entity Tests")
class InventoryTest {

    @Test
    @DisplayName("Should create Inventory with no-arg constructor")
    void testNoArgConstructor() {
        Inventory inventory = new Inventory();
        assertNotNull(inventory);
        assertNull(inventory.getId());
        assertNull(inventory.getSkuCode());
        assertNull(inventory.getQuantity());
    }

    @Test
    @DisplayName("Should create Inventory with all-args constructor")
    void testAllArgsConstructor() {
        Inventory inventory = new Inventory(1L, "iPhone-50", 100);

        assertEquals(1L, inventory.getId());
        assertEquals("iPhone-50", inventory.getSkuCode());
        assertEquals(100, inventory.getQuantity());
    }

    @Test
    @DisplayName("Should set and get id")
    void testSetGetId() {
        Inventory inventory = new Inventory();
        inventory.setId(42L);
        assertEquals(42L, inventory.getId());
    }

    @Test
    @DisplayName("Should set and get skuCode")
    void testSetGetSkuCode() {
        Inventory inventory = new Inventory();
        inventory.setSkuCode("Samsung-100");
        assertEquals("Samsung-100", inventory.getSkuCode());
    }

    @Test
    @DisplayName("Should set and get quantity")
    void testSetGetQuantity() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(50);
        assertEquals(50, inventory.getQuantity());
    }

    @Test
    @DisplayName("Should handle zero quantity")
    void testZeroQuantity() {
        Inventory inventory = new Inventory();
        inventory.setQuantity(0);
        assertEquals(0, inventory.getQuantity());
    }

    @Test
    @DisplayName("Should handle null skuCode")
    void testNullSkuCode() {
        Inventory inventory = new Inventory();
        inventory.setSkuCode(null);
        assertNull(inventory.getSkuCode());
    }
}
