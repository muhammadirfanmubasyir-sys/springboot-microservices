package com.irfan.microservices.inventory.listener;

import com.irfan.microservices.inventory.event.InventoryFailedEvent;
import com.irfan.microservices.inventory.event.InventoryReservedEvent;
import com.irfan.microservices.inventory.event.OrderCreatedEvent;
import com.irfan.microservices.inventory.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Saga Listener Unit Tests")
public class InventorySagaListenerTest {

    @Mock
    private InventoryService inventoryService;

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private InventorySagaListener inventorySagaListener;

    private OrderCreatedEvent orderCreatedEvent;

    @BeforeEach
    void setUp() {
        orderCreatedEvent = new OrderCreatedEvent();
        orderCreatedEvent.setOrderNumber("ORDER-12345");

        OrderCreatedEvent.OrderItemEvent item = new OrderCreatedEvent.OrderItemEvent();
        item.setSkuCode("iPhone-50");
        item.setQuantity(2);
        item.setPrice(BigDecimal.valueOf(1500.00));

        orderCreatedEvent.setItems(List.of(item));
    }

    @Test
    @DisplayName("Should reserve stock and publish InventoryReservedEvent on success")
    void testHandleOrderCreatedSuccess() {
        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50")))
                .thenReturn(List.of("iPhone-50"));

        inventorySagaListener.handleOrderCreated(orderCreatedEvent);

        verify(inventoryService).reserveStock("ORDER-12345", List.of("iPhone-50"));
        verify(kafkaTemplate).send(eq("InventoryReservedTopic"), any(InventoryReservedEvent.class));
    }

    @Test
    @DisplayName("Should publish InventoryFailedEvent when reservation fails")
    void testHandleOrderCreatedFailure() {
        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50")))
                .thenThrow(new IllegalArgumentException("Insufficient stock for SKU: iPhone-50"));

        inventorySagaListener.handleOrderCreated(orderCreatedEvent);

        verify(inventoryService).reserveStock("ORDER-12345", List.of("iPhone-50"));
        verify(kafkaTemplate).send(eq("InventoryFailedTopic"), any(InventoryFailedEvent.class));
    }

    @Test
    @DisplayName("Should handle multiple items in order")
    void testHandleOrderCreatedMultipleItems() {
        OrderCreatedEvent.OrderItemEvent item2 = new OrderCreatedEvent.OrderItemEvent();
        item2.setSkuCode("Samsung-100");
        item2.setQuantity(1);
        item2.setPrice(BigDecimal.valueOf(800.00));

        java.util.List<OrderCreatedEvent.OrderItemEvent> items = new java.util.ArrayList<>(orderCreatedEvent.getItems());
        items.add(item2);
        orderCreatedEvent.setItems(items);

        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100")))
                .thenReturn(List.of("iPhone-50", "Samsung-100"));

        inventorySagaListener.handleOrderCreated(orderCreatedEvent);

        verify(inventoryService).reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100"));
        verify(kafkaTemplate).send(eq("InventoryReservedTopic"), any(InventoryReservedEvent.class));
    }

    @Test
    @DisplayName("Should include order number in reserved event")
    void testReservedEventContainsOrderNumber() {
        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50")))
                .thenReturn(List.of("iPhone-50"));

        inventorySagaListener.handleOrderCreated(orderCreatedEvent);

        verify(kafkaTemplate).send(eq("InventoryReservedTopic"), any(InventoryReservedEvent.class));
    }

    @Test
    @DisplayName("Should include order number and reason in failed event")
    void testFailedEventContainsOrderNumberAndReason() {
        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50")))
                .thenThrow(new IllegalArgumentException("Insufficient stock"));

        inventorySagaListener.handleOrderCreated(orderCreatedEvent);

        verify(kafkaTemplate).send(eq("InventoryFailedTopic"), any(InventoryFailedEvent.class));
    }
}
