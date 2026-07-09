package com.irfan.microservices.order.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("InventoryResponse DTO Tests")
class InventoryResponseTest {

    @Test
    @DisplayName("Should create InventoryResponse with no-arg constructor")
    void testNoArgConstructor() {
        InventoryResponse response = new InventoryResponse();
        assertNotNull(response);
        assertNull(response.getSkuCode());
        assertFalse(response.isInStock());
    }

    @Test
    @DisplayName("Should create InventoryResponse with all-args constructor")
    void testAllArgsConstructor() {
        InventoryResponse response = new InventoryResponse("iPhone-50", true);

        assertEquals("iPhone-50", response.getSkuCode());
        assertTrue(response.isInStock());
    }

    @Test
    @DisplayName("Should create InventoryResponse with builder")
    void testBuilder() {
        InventoryResponse response = InventoryResponse.builder()
                .skuCode("Samsung-100")
                .inStock(false)
                .build();

        assertEquals("Samsung-100", response.getSkuCode());
        assertFalse(response.isInStock());
    }

    @Test
    @DisplayName("Should set and get skuCode")
    void testSetGetSkuCode() {
        InventoryResponse response = new InventoryResponse();
        response.setSkuCode("Product-1");
        assertEquals("Product-1", response.getSkuCode());
    }

    @Test
    @DisplayName("Should set and get inStock")
    void testSetGetInStock() {
        InventoryResponse response = new InventoryResponse();
        response.setInStock(true);
        assertTrue(response.isInStock());

        response.setInStock(false);
        assertFalse(response.isInStock());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        InventoryResponse r1 = new InventoryResponse("iPhone-50", true);
        InventoryResponse r2 = new InventoryResponse("iPhone-50", true);
        InventoryResponse r3 = new InventoryResponse("Samsung", false);

        assertEquals(r1, r2);
        assertEquals(r1.hashCode(), r2.hashCode());
        assertNotEquals(r1, r3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        InventoryResponse response = new InventoryResponse("iPhone-50", true);
        String result = response.toString();
        assertNotNull(result);
        assertTrue(result.contains("iPhone-50"));
    }
}
