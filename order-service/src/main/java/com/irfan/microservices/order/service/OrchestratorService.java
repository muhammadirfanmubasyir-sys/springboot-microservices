package com.irfan.microservices.order.service;

import com.irfan.microservices.order.dto.InventoryResponse;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.event.*;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.model.OrderLineItems;
import com.irfan.microservices.order.model.OrderStatus;
import com.irfan.microservices.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrchestratorService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder myWebClientBuilder;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public String startSaga(OrderRequest orderRequest) {
        Order order = createOrder(orderRequest);
        order.setStatus(OrderStatus.PENDING);
        order = orderRepository.save(order);
        log.info("SAGA STARTED - Order Number: {}, Status: PENDING", order.getOrderNumber());

        List<OrderCreatedEvent.OrderItemEvent> itemEvents = order.getOrderLineItemsList().stream()
                .map(item -> new OrderCreatedEvent.OrderItemEvent(
                        item.getSkuCode(), item.getQuantity(), item.getPrice()))
                .collect(Collectors.toList());
        OrderCreatedEvent orderCreatedEvent = new OrderCreatedEvent(order.getOrderNumber(), itemEvents);
        kafkaTemplate.send("OrderCreatedTopic", orderCreatedEvent);
        log.info("ORDER CREATED EVENT SENT - Order Number: {}", order.getOrderNumber());

        try {
            InventoryResponse[] arrInventoryResponse = callInventoryService(order);

            boolean allProductInStock = false;
            if (arrInventoryResponse != null) {
                allProductInStock = Arrays.stream(arrInventoryResponse)
                        .allMatch(InventoryResponse::isInStock);
            }

            if (allProductInStock) {
                order.setStatus(OrderStatus.CONFIRMED);
                orderRepository.save(order);
                log.info("SAGA STEP COMPLETED - Order Number: {}, Status: CONFIRMED", order.getOrderNumber());

                kafkaTemplate.send("OrderCompletedTopic",
                        new OrderCompletedEvent(order.getOrderNumber()));
                log.info("ORDER COMPLETED EVENT SENT - Order Number: {}", order.getOrderNumber());

                return "Order placed successfully";
            } else {
                throw new IllegalArgumentException("Product is not in stock");
            }
        } catch (Exception e) {
            log.error("SAGA FAILED - Order Number: {}, Reason: {}", order.getOrderNumber(), e.getMessage());
            compensateOrder(order, e.getMessage());
            return "Order cancelled: " + e.getMessage();
        }
    }

    @KafkaListener(topics = "InventoryReservedTopic", groupId = "order-group")
    public void handleInventoryReserved(InventoryReservedEvent event) {
        log.info("INVENTORY RESERVED EVENT RECEIVED - Order Number: {}", event.getOrderNumber());

        orderRepository.findByOrderNumber(event.getOrderNumber()).ifPresent(order -> {
            order.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(order);

            kafkaTemplate.send("OrderCompletedTopic",
                    new OrderCompletedEvent(order.getOrderNumber()));
            log.info("ORDER COMPLETED - Order Number: {}", order.getOrderNumber());
        });
    }

    @KafkaListener(topics = "InventoryFailedTopic", groupId = "order-group")
    public void handleInventoryFailed(InventoryFailedEvent event) {
        log.info("INVENTORY FAILED EVENT RECEIVED - Order Number: {}, Reason: {}",
                event.getOrderNumber(), event.getReason());

        orderRepository.findByOrderNumber(event.getOrderNumber()).ifPresent(order -> {
            compensateOrder(order, event.getReason());
        });
    }

    private void compensateOrder(Order order, String reason) {
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        kafkaTemplate.send("OrderCancelledTopic",
                new OrderCancelledEvent(order.getOrderNumber(), reason));
        log.info("ORDER CANCELLED - Order Number: {}, Reason: {}", order.getOrderNumber(), reason);
    }

    private Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapTo)
                .toList();
        order.setOrderLineItemsList(orderLineItems);

        return order;
    }

    private InventoryResponse[] callInventoryService(Order order) {
        List<String> skuCodes = order.getOrderLineItemsList().stream()
                .map(OrderLineItems::getSkuCode)
                .toList();

        return myWebClientBuilder.build().get()
                .uri("http://inventory-service/api/inventory",
                        uriBuilder -> uriBuilder.queryParam("skuCode", skuCodes).build())
                .retrieve()
                .bodyToMono(InventoryResponse[].class)
                .block();
    }

    private OrderLineItems mapTo(OrderLineItemsDto orderLineItemsDto) {
        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());
        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
        orderLineItems.setPrice(orderLineItemsDto.getPrice());
        return orderLineItems;
    }
}
