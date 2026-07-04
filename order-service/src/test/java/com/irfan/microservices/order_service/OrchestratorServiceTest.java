package com.irfan.microservices.order.service;

import com.irfan.microservices.order.dto.InventoryResponse;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.event.*;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.model.OrderLineItems;
import com.irfan.microservices.order.model.OrderStatus;
import com.irfan.microservices.order.repository.OrderRepository;
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
@DisplayName("Orchestrator Service Unit Tests")
public class OrchestratorServiceTest {

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
    @DisplayName("Should start saga and create order with PENDING status")
    void testStartSagaCreatesPendingOrder() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository, atLeastOnce()).save(orderCaptor.capture());

        Order firstSave = orderCaptor.getAllValues().get(0);
        assertEquals(OrderStatus.PENDING, firstSave.getStatus());
    }

    @Test
    @DisplayName("Should confirm order when inventory is available")
    void testStartSagaConfirmsOrderWhenInStock() {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setSkuCode("iPhone-50");
        inventoryResponse.setInStock(true);

        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        assertTrue(result.contains("successfully"));

        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), any(OrderCreatedEvent.class));
        verify(kafkaTemplate).send(eq("OrderCompletedTopic"), any(OrderCompletedEvent.class));
    }

    @Test
    @DisplayName("Should cancel order when inventory is not available")
    void testStartSagaCancelsOrderWhenOutOfStock() {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setSkuCode("iPhone-50");
        inventoryResponse.setInStock(false);

        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        assertTrue(result.contains("cancelled"));

        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), any(OrderCreatedEvent.class));
        verify(kafkaTemplate).send(eq("OrderCancelledTopic"), any(OrderCancelledEvent.class));
    }

    @Test
    @DisplayName("Should cancel order on exception during inventory check")
    void testCancelsOrderOnException() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenThrow(new RuntimeException("Connection refused"));

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        assertTrue(result.contains("cancelled"));
        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), any(OrderCreatedEvent.class));
        verify(kafkaTemplate).send(eq("OrderCancelledTopic"), any(OrderCancelledEvent.class));
    }

    @Test
    @DisplayName("Should handle inventory reserved event")
    void testHandleInventoryReserved() {
        InventoryReservedEvent event = new InventoryReservedEvent();
        event.setOrderNumber("ORDER-12345");
        event.setReservedSkuCodes(List.of("iPhone-50"));

        when(orderRepository.findByOrderNumber("ORDER-12345")).thenReturn(Optional.of(savedOrder));

        orchestratorService.handleInventoryReserved(event);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).save(orderCaptor.capture());

        assertEquals(OrderStatus.CONFIRMED, orderCaptor.getValue().getStatus());
        verify(kafkaTemplate).send(eq("OrderCompletedTopic"), any(OrderCompletedEvent.class));
    }

    @Test
    @DisplayName("Should handle inventory failed event")
    void testHandleInventoryFailed() {
        InventoryFailedEvent event = new InventoryFailedEvent();
        event.setOrderNumber("ORDER-12345");
        event.setReason("Insufficient stock");
        event.setFailedSkuCodes(List.of("iPhone-50"));

        when(orderRepository.findByOrderNumber("ORDER-12345")).thenReturn(Optional.of(savedOrder));

        orchestratorService.handleInventoryFailed(event);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository).save(orderCaptor.capture());

        assertEquals(OrderStatus.CANCELLED, orderCaptor.getValue().getStatus());
        verify(kafkaTemplate).send(eq("OrderCancelledTopic"), any(OrderCancelledEvent.class));
    }

    @Test
    @DisplayName("Should create order with unique order number")
    void testCreatesOrderWithUniqueNumber() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<Order> orderCaptor = ArgumentCaptor.forClass(Order.class);
        verify(orderRepository, atLeastOnce()).save(orderCaptor.capture());

        Order createdOrder = orderCaptor.getAllValues().get(0);
        assertNotNull(createdOrder.getOrderNumber());
        assertFalse(createdOrder.getOrderNumber().isEmpty());
    }

    @Test
    @DisplayName("Should send OrderCreatedEvent with correct order details")
    void testSendOrderCreatedEventWithCorrectDetails() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class), any(java.util.function.Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(InventoryResponse[].class))
                .thenReturn(reactor.core.publisher.Mono.just(new InventoryResponse[]{new InventoryResponse()}));

        orchestratorService.startSaga(orderRequest);

        ArgumentCaptor<OrderCreatedEvent> eventCaptor = ArgumentCaptor.forClass(OrderCreatedEvent.class);
        verify(kafkaTemplate).send(eq("OrderCreatedTopic"), eventCaptor.capture());

        OrderCreatedEvent capturedEvent = eventCaptor.getValue();
        assertEquals("ORDER-12345", capturedEvent.getOrderNumber());
        assertNotNull(capturedEvent.getItems());
        assertEquals(1, capturedEvent.getItems().size());
        assertEquals("iPhone-50", capturedEvent.getItems().get(0).getSkuCode());
        assertEquals(5, capturedEvent.getItems().get(0).getQuantity());
    }
}
