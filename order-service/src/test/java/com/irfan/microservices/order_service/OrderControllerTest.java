package com.irfan.microservices.order.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.service.OrchestratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Order Controller Unit Tests")
public class OrderControllerTest {

    private MockMvc mockMvc;

    @Mock
    private OrchestratorService orchestratorService;

    @InjectMocks
    private OrderController orderController;

    private ObjectMapper objectMapper;
    private OrderRequest orderRequest;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
        objectMapper = new ObjectMapper();

        OrderLineItemsDto orderLineItemsDto = new OrderLineItemsDto();
        orderLineItemsDto.setSkuCode("iPhone-50");
        orderLineItemsDto.setQuantity(5);
        orderLineItemsDto.setPrice(BigDecimal.valueOf(1500.00));

        orderRequest = new OrderRequest();
        orderRequest.setOrderLineItemsDtoList(new ArrayList<>());
        orderRequest.getOrderLineItemsDtoList().add(orderLineItemsDto);
    }

    @Test
    @DisplayName("Should place order successfully and return HTTP 201")
    void testPlaceOrderSuccess() throws Exception {
        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order placed successfully");

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().string(containsString("successfully")))
                .andDo(print());

        verify(orchestratorService).startSaga(any(OrderRequest.class));
    }

    @Test
    @DisplayName("Should return cancellation message when product is out of stock")
    void testPlaceOrderProductOutOfStock() throws Exception {
        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order cancelled: Product is not in stock");

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().string(containsString("cancelled")))
                .andDo(print());

        verify(orchestratorService).startSaga(any(OrderRequest.class));
    }

    @Test
    @DisplayName("Should handle order with multiple line items")
    void testPlaceOrderMultipleItems() throws Exception {
        OrderLineItemsDto lineItem2 = new OrderLineItemsDto();
        lineItem2.setSkuCode("Samsung-100");
        lineItem2.setQuantity(3);
        lineItem2.setPrice(BigDecimal.valueOf(800.00));

        orderRequest.getOrderLineItemsDtoList().add(lineItem2);

        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order placed successfully");

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().string(containsString("successfully")))
                .andDo(print());
    }

    @Test
    @DisplayName("Should verify orchestrator service is called")
    void testOrchestratorServiceCalled() throws Exception {
        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order placed successfully");

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated());

        verify(orchestratorService).startSaga(any(OrderRequest.class));
    }

    @Test
    @DisplayName("Should return success message on order placement")
    void testOrderSuccessMessage() throws Exception {
        String expectedMessage = "Order placed successfully";
        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn(expectedMessage);

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().string(expectedMessage))
                .andDo(print());
    }

    @Test
    @DisplayName("Should accept POST request to /api/order endpoint")
    void testOrderEndpointExists() throws Exception {
        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order placed successfully");

        String jsonRequest = objectMapper.writeValueAsString(orderRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @DisplayName("Should handle order with different quantities")
    void testOrderWithDifferentQuantities() throws Exception {
        OrderLineItemsDto item1 = new OrderLineItemsDto();
        item1.setSkuCode("Product1");
        item1.setQuantity(1);
        item1.setPrice(BigDecimal.valueOf(100.00));

        OrderLineItemsDto item2 = new OrderLineItemsDto();
        item2.setSkuCode("Product2");
        item2.setQuantity(100);
        item2.setPrice(BigDecimal.valueOf(50.00));

        OrderRequest customRequest = new OrderRequest();
        customRequest.setOrderLineItemsDtoList(List.of(item1, item2));

        when(orchestratorService.startSaga(any(OrderRequest.class)))
                .thenReturn("Order placed successfully");

        String jsonRequest = objectMapper.writeValueAsString(customRequest);

        mockMvc.perform(post("/api/order")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated())
                .andDo(print());
    }

    @Test
    @DisplayName("Should return circuit breaker fallback message")
    void testFallbackMethodCircuitBreaker() {
        String result = orderController.fallbackMethod_CB(orderRequest, new RuntimeException("Connection failed"));
        assertEquals("oops, something went wrong, please order again later!", result);
    }

    @Test
    @DisplayName("Should return rate limiter fallback message")
    void testFallbackMethodRateLimiter() {
        String result = orderController.fallbackMethod_RL(orderRequest, new RuntimeException("Rate limited"));
        assertEquals("You already reached 10 requests within 10 s, next wait for 3s", result);
    }
}
