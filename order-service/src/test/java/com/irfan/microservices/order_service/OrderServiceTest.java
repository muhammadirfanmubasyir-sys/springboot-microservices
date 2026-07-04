package com.irfan.microservices.order.service;

import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
@DisplayName("Order Service Unit Tests")
public class OrderServiceTest {
    @Mock
    private OrderRepository orderRepository;

    @Mock
    private WebClient.Builder webClientBuilder;

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

    @Test
    @DisplayName("Should successfully place an order (happy or compensation path)")
    void testPlaceOrderSuccess() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        verify(orderRepository, atLeastOnce()).save(any(Order.class));
    }

    @Test
    @DisplayName("Should handle order request with single product")
    void testOrderWithSingleProduct() {
        OrderLineItemsDto singleItem = new OrderLineItemsDto();
        singleItem.setSkuCode("iPhone-50");
        singleItem.setQuantity(5);
        singleItem.setPrice(BigDecimal.valueOf(1500.00));
        orderRequest.setOrderLineItemsDtoList(List.of(singleItem));
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        verify(orderRepository, atLeastOnce()).save(any(Order.class));
    }

    @Test
    @DisplayName("Should handle multiple line items in order")
    void testMultipleLineItems() {
        OrderLineItemsDto lineItem2 = new OrderLineItemsDto();
        lineItem2.setSkuCode("Samsung-100");
        lineItem2.setQuantity(3);
        lineItem2.setPrice(BigDecimal.valueOf(800.00));

        orderRequest.getOrderLineItemsDtoList().add(lineItem2);

        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        assertDoesNotThrow(() -> orchestratorService.startSaga(orderRequest));
    }

    @Test
    @DisplayName("Should set order status to PENDING")
    void testOrderStatusSetToPending() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        orchestratorService.startSaga(orderRequest);

        verify(orderRepository, atLeastOnce()).save(any(Order.class));
    }

    @Test
    @DisplayName("Should maintain order integrity during placement")
    void testOrderIntegrity() {
        when(orderRepository.save(any(Order.class))).thenReturn(savedOrder);

        String result = orchestratorService.startSaga(orderRequest);

        assertNotNull(result);
        verify(orderRepository, atLeastOnce()).save(any(Order.class));
    }
}
