package com.irfan.microservices.order_service;

import com.irfan.microservices.order.dto.InventoryResponse;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.event.*;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.model.OrderLineItems;
import com.irfan.microservices.order.model.OrderStatus;
import com.irfan.microservices.order.repository.OrderRepository;
import com.irfan.microservices.order.service.OrchestratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Orchestrator Service Edge Case Tests")
class OrchestratorServiceEdgeCaseTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private WebClient.Builder webClientBuilder;

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @Mock
    private KafkaTemplate<String, Object> kafkaTemplate;

    @InjectMocks
    private OrchestratorService orchestratorService;

    private OrderRequest orderRequest;
    private Order savedOrder;

    @BeforeEach
    void setUp() {
        OrderLineItemsDto orderLineItemsDto = new OrderLineItemsDto();
        orderLineItemsDto.setSkuCode("iPhone-50");
        orderLineItemsDto.setQuantity(5);
        orderLineItemsDto.setPrice(BigDecimal.valueOf(1500.00));

        orderRequest = new OrderRequest();
        orderRequest.setOrderLineItemsDtoList(new ArrayList<>());
        orderRequest.getOrderLineItemsDtoList().add(orderLineItemsDto);

        savedOrder = new Order();
        savedOrder.setId(1L);
        savedOrder.setOrderNumber("ORDER-12345");
        savedOrder.setStatus(OrderStatus.PENDING);

        List<OrderLineItems> orderLineItems = new ArrayList<>();
        OrderLineItems lineItem = new OrderLineItems();
        lineItem.setSkuCode("iPhone-50");
        lineItem.setQuantity(5);
        lineItem.setPrice(BigDecimal.valueOf(1500.00));
        orderLineItems.add(lineItem);
        savedOrder.setOrderLineItemsList(orderLineItems);
    }

    private void setupWebClientSuccess(InventoryResponse[] responses) {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class), any(java.util.function.Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(InventoryResponse[].class))
                .thenReturn(reactor.core.publisher.Mono.just(responses));
    }

    @Test
    @DisplayName("Should handle null inventory response array")
    void testStartSagaNullInventoryResponse() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class), any(java.util.function.Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(InventoryResponse[].class))
                .thenReturn(reactor.core.publisher.Mono.empty());

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        assertTrue(result.contains("cancelled"));
    }

    @Test
    @DisplayName("Should handle multiple line items in saga")
    void testStartSagaMultipleLineItems() {
        OrderLineItemsDto item2 = new OrderLineItemsDto();
        item2.setSkuCode("Samsung-100");
        item2.setQuantity(3);
        item2.setPrice(BigDecimal.valueOf(800.00));
        orderRequest.getOrderLineItemsDtoList().add(item2);

        InventoryResponse resp1 = new InventoryResponse("iPhone-50", true);
        InventoryResponse resp2 = new InventoryResponse("Samsung-100", true);
        setupWebClientSuccess(new InventoryResponse[]{resp1, resp2});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertTrue(result.contains("successfully"));
        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), any(OrderCreatedEvent.class));
        verify(kafkaTemplate).send(eq("OrderCompletedTopic"), any(OrderCompletedEvent.class));
    }

    @Test
    @DisplayName("Should handle inventory reserved event when order not found")
    void testHandleInventoryReservedOrderNotFound() {
        InventoryReservedEvent event = new InventoryReservedEvent("ORDER-999", List.of("iPhone-50"));
        when(orderRepository.findByOrderNumber("ORDER-999")).thenReturn(Optional.empty());

        orchestratorService.handleInventoryReserved(event);

        verify(orderRepository, never()).save(any());
        verify(kafkaTemplate, never()).send(eq("OrderCompletedTopic"), any(OrderCompletedEvent.class));
    }

    @Test
    @DisplayName("Should handle inventory failed event when order not found")
    void testHandleInventoryFailedOrderNotFound() {
        InventoryFailedEvent event = new InventoryFailedEvent("ORDER-999", List.of("iPhone-50"), "Insufficient stock");
        when(orderRepository.findByOrderNumber("ORDER-999")).thenReturn(Optional.empty());

        orchestratorService.handleInventoryFailed(event);

        verify(orderRepository, never()).save(any());
        verify(kafkaTemplate, never()).send(eq("OrderCancelledTopic"), any(OrderCancelledEvent.class));
    }

    @Test
    @DisplayName("Should send OrderCreatedEvent with items")
    void testOrderCreatedEventMultipleItems() {
        OrderLineItemsDto item2 = new OrderLineItemsDto();
        item2.setSkuCode("Samsung-100");
        item2.setQuantity(3);
        item2.setPrice(BigDecimal.valueOf(800.00));
        orderRequest.getOrderLineItemsDtoList().add(item2);

        InventoryResponse resp1 = new InventoryResponse("iPhone-50", true);
        InventoryResponse resp2 = new InventoryResponse("Samsung-100", true);
        setupWebClientSuccess(new InventoryResponse[]{resp1, resp2});

        Order orderWithTwoItems = new Order();
        orderWithTwoItems.setId(1L);
        orderWithTwoItems.setOrderNumber("ORDER-12345");
        orderWithTwoItems.setStatus(OrderStatus.PENDING);
        orderWithTwoItems.setOrderLineItemsList(List.of(
                new OrderLineItems(null, "iPhone-50", BigDecimal.valueOf(1500), 5),
                new OrderLineItems(null, "Samsung-100", BigDecimal.valueOf(800), 3)
        ));
        when(orderRepository.save(any(Order.class))).thenReturn(orderWithTwoItems);

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<OrderCreatedEvent> eventCaptor = ArgumentCaptor.forClass(OrderCreatedEvent.class);
        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), eventCaptor.capture());

        OrderCreatedEvent captured = eventCaptor.getValue();
        assertEquals(2, captured.getItems().size());
    }

    @Test
    @DisplayName("Should verify order status transitions in saga")
    void testOrderStatusTransitions() {
        InventoryResponse inventoryResponse = new InventoryResponse("iPhone-50", true);
        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository, atLeastOnce()).save(orderCaptor.capture());

        List<Order> savedOrders = orderCaptor.getAllValues();
        assertEquals(OrderStatus.PENDING, savedOrders.get(0).getStatus());
        assertEquals(OrderStatus.CONFIRMED, savedOrders.get(savedOrders.size() - 1).getStatus());
    }

    @Test
    @DisplayName("Should verify compensateOrder sends OrderCancelledEvent")
    void testCompensateOrderEvent() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenThrow(new RuntimeException("Connection timeout"));
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<OrderCancelledEvent> eventCaptor = ArgumentCaptor.forClass(OrderCancelledEvent.class);
        verify(kafkaTemplate).send(eq("OrderCancelledTopic"), eventCaptor.capture());

        OrderCancelledEvent cancelled = eventCaptor.getValue();
        assertNotNull(cancelled.getOrderNumber());
        assertNotNull(cancelled.getReason());
    }
}
