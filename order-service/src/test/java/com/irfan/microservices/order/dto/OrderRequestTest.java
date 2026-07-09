package com.irfan.microservices.order.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("OrderRequest DTO Tests")
class OrderRequestTest {

    @Test
    @DisplayName("Should create OrderRequest with no-arg constructor")
    void testNoArgConstructor() {
        OrderRequest request = new OrderRequest();
        assertNotNull(request);
        assertNull(request.getOrderLineItemsDtoList());
    }

    @Test
    @DisplayName("Should create OrderRequest with all-args constructor")
    void testAllArgsConstructor() {
        List<OrderLineItemsDto> items = new ArrayList<>();
        items.add(new OrderLineItemsDto());
        OrderRequest request = new OrderRequest(items);

        assertNotNull(request.getOrderLineItemsDtoList());
        assertEquals(1, request.getOrderLineItemsDtoList().size());
    }

    @Test
    @DisplayName("Should set and get orderLineItemsDtoList")
    void testSetGetOrderLineItemsDtoList() {
        OrderRequest request = new OrderRequest();
        List<OrderLineItemsDto> items = new ArrayList<>();
        items.add(new OrderLineItemsDto());
        request.setOrderLineItemsDtoList(items);

        assertNotNull(request.getOrderLineItemsDtoList());
        assertEquals(1, request.getOrderLineItemsDtoList().size());
    }

    @Test
    @DisplayName("Should handle empty list")
    void testEmptyList() {
        OrderRequest request = new OrderRequest();
        request.setOrderLineItemsDtoList(new ArrayList<>());
        assertNotNull(request.getOrderLineItemsDtoList());
        assertTrue(request.getOrderLineItemsDtoList().isEmpty());
    }

    @Test
    @DisplayName("Should handle multiple items")
    void testMultipleItems() {
        OrderRequest request = new OrderRequest();
        List<OrderLineItemsDto> items = List.of(
                new OrderLineItemsDto(),
                new OrderLineItemsDto(),
                new OrderLineItemsDto()
        );
        request.setOrderLineItemsDtoList(items);
        assertEquals(3, request.getOrderLineItemsDtoList().size());
    }
}
