package com.irfan.microservices.inventory.listener;

import com.irfan.microservices.inventory.event.InventoryFailedEvent;
import com.irfan.microservices.inventory.event.InventoryReservedEvent;
import com.irfan.microservices.inventory.event.OrderCreatedEvent;
import com.irfan.microservices.inventory.service.InventoryService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Saga Listener Edge Case Tests")
class InventorySagaListenerEdgeCaseTest {

    @Mock
    private InventoryService inventoryService;

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private InventorySagaListener inventorySagaListener;

    @Test
    @DisplayName("Should handle order with three items")
    void testHandleOrderCreatedThreeItems() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderNumber("ORDER-12345");
        event.setItems(List.of(
                new OrderCreatedEvent.OrderItemEvent("iPhone-50", 2, BigDecimal.valueOf(1500)),
                new OrderCreatedEvent.OrderItemEvent("Samsung-100", 1, BigDecimal.valueOf(800)),
                new OrderCreatedEvent.OrderItemEvent("Pixel-50", 3, BigDecimal.valueOf(600))
        ));

        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100", "Pixel-50")))
                .thenReturn(List.of("iPhone-50", "Samsung-100", "Pixel-50"));

        inventorySagaListener.handleOrderCreated(event);

        verify(inventoryService).reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100", "Pixel-50"));
        verify(kafkaTemplate).send(eq("InventoryReservedTopic"), any(InventoryReservedEvent.class));
    }

    @Test
    @DisplayName("Should send failed event with correct order number and reason")
    void testFailedEventDetails() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderNumber("ORDER-999");
        event.setItems(List.of(
                new OrderCreatedEvent.OrderItemEvent("iPhone-50", 2, BigDecimal.valueOf(1500))
        ));

        when(inventoryService.reserveStock("ORDER-999", List.of("iPhone-50")))
                .thenThrow(new IllegalArgumentException("Insufficient stock for SKU: iPhone-50"));

        inventorySagaListener.handleOrderCreated(event);

        ArgumentCaptor<InventoryFailedEvent> captor = ArgumentCaptor.forClass(InventoryFailedEvent.class);
        verify(kafkaTemplate).send(eq("InventoryFailedTopic"), captor.capture());

        InventoryFailedEvent failedEvent = captor.getValue();
        assertEquals("ORDER-999", failedEvent.getOrderNumber());
        assertEquals("Insufficient stock for SKU: iPhone-50", failedEvent.getReason());
        assertEquals(List.of("iPhone-50"), failedEvent.getFailedSkuCodes());
    }

    @Test
    @DisplayName("Should send reserved event with correct order number and sku codes")
    void testReservedEventDetails() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderNumber("ORDER-555");
        event.setItems(List.of(
                new OrderCreatedEvent.OrderItemEvent("iPhone-50", 2, BigDecimal.valueOf(1500)),
                new OrderCreatedEvent.OrderItemEvent("Samsung-100", 1, BigDecimal.valueOf(800))
        ));

        when(inventoryService.reserveStock("ORDER-555", List.of("iPhone-50", "Samsung-100")))
                .thenReturn(List.of("iPhone-50", "Samsung-100"));

        inventorySagaListener.handleOrderCreated(event);

        ArgumentCaptor<InventoryReservedEvent> captor = ArgumentCaptor.forClass(InventoryReservedEvent.class);
        verify(kafkaTemplate).send(eq("InventoryReservedTopic"), captor.capture());

        InventoryReservedEvent reservedEvent = captor.getValue();
        assertEquals("ORDER-555", reservedEvent.getOrderNumber());
        assertEquals(List.of("iPhone-50", "Samsung-100"), reservedEvent.getReservedSkuCodes());
    }

    @Test
    @DisplayName("Should handle generic exception (not IllegalArgumentException)")
    void testHandleGenericException() {
        OrderCreatedEvent event = new OrderCreatedEvent();
        event.setOrderNumber("ORDER-777");
        event.setItems(List.of(
                new OrderCreatedEvent.OrderItemEvent("iPhone-50", 2, BigDecimal.valueOf(1500))
        ));

        when(inventoryService.reserveStock("ORDER-777", List.of("iPhone-50")))
                .thenThrow(new RuntimeException("Unexpected error"));

        inventorySagaListener.handleOrderCreated(event);

        verify(kafkaTemplate).send(eq("InventoryFailedTopic"), any(InventoryFailedEvent.class));
    }
}
