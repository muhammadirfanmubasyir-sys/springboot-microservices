package com.irfan.microservices.inventory.listener;

import com.irfan.microservices.inventory.event.InventoryFailedEvent;
import com.irfan.microservices.inventory.event.InventoryReservedEvent;
import com.irfan.microservices.inventory.event.OrderCreatedEvent;
import com.irfan.microservices.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class InventorySagaListener {

    private final InventoryService inventoryService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "OrderCreatedTopic", groupId = "inventory-group")
    public void handleOrderCreated(OrderCreatedEvent event) {
        log.info("Received OrderCreatedEvent for order: {}", event.getOrderNumber());

        try {
            List<String> skuCodes = event.getItems().stream()
                    .map(OrderCreatedEvent.OrderItemEvent::getSkuCode)
                    .collect(Collectors.toList());

            List<String> reservedSkuCodes = inventoryService.reserveStock(
                    event.getOrderNumber(), skuCodes);

            InventoryReservedEvent reservedEvent = new InventoryReservedEvent();
            reservedEvent.setOrderNumber(event.getOrderNumber());
            reservedEvent.setReservedSkuCodes(reservedSkuCodes);

            kafkaTemplate.send("InventoryReservedTopic", reservedEvent);
            log.info("InventoryReservedEvent sent for order: {}", event.getOrderNumber());

        } catch (Exception e) {
            log.error("Failed to reserve inventory for order: {}", event.getOrderNumber(), e);

            InventoryFailedEvent failedEvent = new InventoryFailedEvent();
            failedEvent.setOrderNumber(event.getOrderNumber());
            failedEvent.setReason(e.getMessage());
            failedEvent.setFailedSkuCodes(event.getItems().stream()
                    .map(OrderCreatedEvent.OrderItemEvent::getSkuCode)
                    .collect(Collectors.toList()));

            kafkaTemplate.send("InventoryFailedTopic", failedEvent);
            log.info("InventoryFailedEvent sent for order: {}", event.getOrderNumber());
        }
    }
}
