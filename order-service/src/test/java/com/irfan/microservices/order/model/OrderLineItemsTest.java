package com.irfan.microservices.order.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderLineItems Entity Tests")
class OrderLineItemsTest {

    @Test
    @DisplayName("Should create OrderLineItems with no-arg constructor")
    void testNoArgConstructor() {
        OrderLineItems item = new OrderLineItems();
        assertNotNull(item);
        assertNull(item.getId());
        assertNull(item.getSkuCode());
        assertNull(item.getPrice());
        assertNull(item.getQuantity());
    }

    @Test
    @DisplayName("Should create OrderLineItems with all-args constructor")
    void testAllArgsConstructor() {
        OrderLineItems item = new OrderLineItems(1L, "iPhone-50", BigDecimal.valueOf(999.99), 5);

        assertEquals(1L, item.getId());
        assertEquals("iPhone-50", item.getSkuCode());
        assertEquals(BigDecimal.valueOf(999.99), item.getPrice());
        assertEquals(5, item.getQuantity());
    }

    @Test
    @DisplayName("Should set and get id")
    void testSetGetId() {
        OrderLineItems item = new OrderLineItems();
        item.setId(10L);
        assertEquals(10L, item.getId());
    }

    @Test
    @DisplayName("Should set and get skuCode")
    void testSetGetSkuCode() {
        OrderLineItems item = new OrderLineItems();
        item.setSkuCode("Samsung-200");
        assertEquals("Samsung-200", item.getSkuCode());
    }

    @Test
    @DisplayName("Should set and get price")
    void testSetGetPrice() {
        OrderLineItems item = new OrderLineItems();
        item.setPrice(BigDecimal.valueOf(499.99));
        assertEquals(BigDecimal.valueOf(499.99), item.getPrice());
    }

    @Test
    @DisplayName("Should set and get quantity")
    void testSetGetQuantity() {
        OrderLineItems item = new OrderLineItems();
        item.setQuantity(10);
        assertEquals(10, item.getQuantity());
    }

    @Test
    @DisplayName("Should handle null skuCode")
    void testNullSkuCode() {
        OrderLineItems item = new OrderLineItems();
        item.setSkuCode(null);
        assertNull(item.getSkuCode());
    }

    @Test
    @DisplayName("Should handle null price")
    void testNullPrice() {
        OrderLineItems item = new OrderLineItems();
        item.setPrice(null);
        assertNull(item.getPrice());
    }

    @Test
    @DisplayName("Should handle zero quantity")
    void testZeroQuantity() {
        OrderLineItems item = new OrderLineItems();
        item.setQuantity(0);
        assertEquals(0, item.getQuantity());
    }
}
