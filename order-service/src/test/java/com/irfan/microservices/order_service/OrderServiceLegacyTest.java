package com.irfan.microservices.order.service;

import com.irfan.microservices.order.client.InventoryClient;
import com.irfan.microservices.order.dto.InventoryResponse;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.event.OrderPlacedEvent;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Order Service Unit Tests (Legacy)")
class OrderServiceLegacyTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private InventoryClient inventoryClient;

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
    private KafkaTemplate<String, OrderPlacedEvent> kafkaTemplate;

    @InjectMocks
    private OrderService orderService;

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
    }

    private void setupWebClientSuccess(InventoryResponse[] responses) {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class), any(java.util.function.Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(InventoryResponse[].class))
                .thenReturn(reactor.core.publisher.Mono.justOrEmpty(responses));
    }

    @Test
    @DisplayName("Should place order successfully when all products in stock")
    void testPlaceOrderSuccess() {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setSkuCode("iPhone-50");
        inventoryResponse.setInStock(true);

        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orderService.placeOrder(orderRequest);

        assertNotNull(result);
        assertTrue(result.contains("successfully"));
        verify(orderRepository).save(any(Order.class));
        verify(kafkaTemplate).send(eq("NotificationTopic"), any(OrderPlacedEvent.class));
    }

    @Test
    @DisplayName("Should throw exception when product not in stock")
    void testPlaceOrderOutOfStock() {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setSkuCode("iPhone-50");
        inventoryResponse.setInStock(false);

        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> orderService.placeOrder(orderRequest));

        assertTrue(exception.getMessage().contains("not in stock"));
    }

    @Test
    @DisplayName("Should handle null inventory response")
    void testPlaceOrderNullInventoryResponse() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class), any(java.util.function.Function.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(responseSpec.bodyToMono(InventoryResponse[].class))
                .thenReturn(reactor.core.publisher.Mono.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> orderService.placeOrder(orderRequest));

        assertTrue(exception.getMessage().contains("not in stock"));
    }

    @Test
    @DisplayName("Should set order number with UUID")
    void testSetsOrderNumber() {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setSkuCode("iPhone-50");
        inventoryResponse.setInStock(true);

        setupWebClientSuccess(new InventoryResponse[]{inventoryResponse});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orderService.placeOrder(orderRequest);

        verify(orderRepository).save(any(Order.class));
    }

    @Test
    @DisplayName("Should handle multiple line items")
    void testMultipleLineItems() {
        OrderLineItemsDto lineItem2 = new OrderLineItemsDto();
        lineItem2.setSkuCode("Samsung-100");
        lineItem2.setQuantity(3);
        lineItem2.setPrice(BigDecimal.valueOf(800.00));
        orderRequest.getOrderLineItemsDtoList().add(lineItem2);

        InventoryResponse resp1 = new InventoryResponse();
        resp1.setSkuCode("iPhone-50");
        resp1.setInStock(true);
        InventoryResponse resp2 = new InventoryResponse();
        resp2.setSkuCode("Samsung-100");
        resp2.setInStock(true);

        setupWebClientSuccess(new InventoryResponse[]{resp1, resp2});
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orderService.placeOrder(orderRequest);
        assertNotNull(result);
    }

    @Test
    @DisplayName("Should handle exception from webclient")
    void testPlaceOrderExceptionFromWebclient() {
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenThrow(new RuntimeException("Connection refused"));

        assertThrows(RuntimeException.class, () -> orderService.placeOrder(orderRequest));

        verify(webClientBuilder).build();
    }
}
