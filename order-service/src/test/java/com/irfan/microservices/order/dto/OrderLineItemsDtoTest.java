package com.irfan.microservices.order.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderLineItemsDto DTO Tests")
class OrderLineItemsDtoTest {

    @Test
    @DisplayName("Should create OrderLineItemsDto with no-arg constructor")
    void testNoArgConstructor() {
        OrderLineItemsDto dto = new OrderLineItemsDto();
        assertNotNull(dto);
        assertNull(dto.getId());
        assertNull(dto.getSkuCode());
        assertNull(dto.getPrice());
        assertNull(dto.getQuantity());
    }

    @Test
    @DisplayName("Should create OrderLineItemsDto with all-args constructor")
    void testAllArgsConstructor() {
        OrderLineItemsDto dto = new OrderLineItemsDto(1L, "iPhone-50", BigDecimal.valueOf(999.99), 5);

        assertEquals(1L, dto.getId());
        assertEquals("iPhone-50", dto.getSkuCode());
        assertEquals(BigDecimal.valueOf(999.99), dto.getPrice());
        assertEquals(5, dto.getQuantity());
    }

    @Test
    @DisplayName("Should set and get id")
    void testSetGetId() {
        OrderLineItemsDto dto = new OrderLineItemsDto();
        dto.setId(42L);
        assertEquals(42L, dto.getId());
    }

    @Test
    @DisplayName("Should set and get skuCode")
    void testSetGetSkuCode() {
        OrderLineItemsDto dto = new OrderLineItemsDto();
        dto.setSkuCode("Samsung-100");
        assertEquals("Samsung-100", dto.getSkuCode());
    }

    @Test
    @DisplayName("Should set and get price")
    void testSetGetPrice() {
        OrderLineItemsDto dto = new OrderLineItemsDto();
        dto.setPrice(BigDecimal.valueOf(499.99));
        assertEquals(BigDecimal.valueOf(499.99), dto.getPrice());
    }

    @Test
    @DisplayName("Should set and get quantity")
    void testSetGetQuantity() {
        OrderLineItemsDto dto = new OrderLineItemsDto();
        dto.setQuantity(10);
        assertEquals(10, dto.getQuantity());
    }

    @Test
    @DisplayName("Should implement equals and hashCode")
    void testEqualsAndHashCode() {
        OrderLineItemsDto dto1 = new OrderLineItemsDto(1L, "iPhone-50", BigDecimal.valueOf(999.99), 5);
        OrderLineItemsDto dto2 = new OrderLineItemsDto(1L, "iPhone-50", BigDecimal.valueOf(999.99), 5);
        OrderLineItemsDto dto3 = new OrderLineItemsDto(2L, "Samsung", BigDecimal.valueOf(500.00), 3);

        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());
        assertNotEquals(dto1, dto3);
    }

    @Test
    @DisplayName("Should implement toString")
    void testToString() {
        OrderLineItemsDto dto = new OrderLineItemsDto(1L, "iPhone-50", BigDecimal.valueOf(999.99), 5);
        String result = dto.toString();
        assertNotNull(result);
        assertTrue(result.contains("iPhone-50"));
        assertTrue(result.contains("999.99"));
    }
}
