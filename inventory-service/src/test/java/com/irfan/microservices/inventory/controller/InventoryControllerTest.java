package com.irfan.microservices.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irfan.microservices.inventory.service.InventoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Controller Unit Tests")
class InventoryControllerTest {

    private MockMvc mockMvc;

    @Mock
    private InventoryService inventoryService;

    @InjectMocks
    private InventoryController inventoryController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(inventoryController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    @DisplayName("Should return true when product is in stock by skuCode")
    void testIsInStockBySkuCode() throws Exception {
        when(inventoryService.isInStockBySkuCode("iPhone-50")).thenReturn(true);

        mockMvc.perform(get("/api/inventory/{my-code}", "iPhone-50"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    @DisplayName("Should return false when product is out of stock by skuCode")
    void testIsInStockBySkuCodeOut() throws Exception {
        when(inventoryService.isInStockBySkuCode("iPhone-50")).thenReturn(false);

        mockMvc.perform(get("/api/inventory/{my-code}", "iPhone-50"))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    @DisplayName("Should return stock status by skuCode and quantity")
    void testIsInStockBySkuCodeAndQty() throws Exception {
        when(inventoryService.isInStockBySkuCodeAndQty("iPhone-50", 10)).thenReturn(true);

        mockMvc.perform(get("/api/inventory/check-stock")
                        .param("skuCode", "iPhone-50")
                        .param("quantity", "10"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    @DisplayName("Should return product list by skuCodes")
    void testRetrieveProductList() throws Exception {
        com.irfan.microservices.inventory.dto.InventoryResponse response =
                new com.irfan.microservices.inventory.dto.InventoryResponse();
        response.setSkuCode("iPhone-50");
        response.setInStock(true);

        when(inventoryService.getProductList(List.of("iPhone-50"))).thenReturn(List.of(response));

        mockMvc.perform(get("/api/inventory")
                        .param("skuCode", "iPhone-50"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].skuCode").value("iPhone-50"))
                .andExpect(jsonPath("$[0].inStock").value(true));
    }

    @Test
    @DisplayName("Should reserve stock for order")
    void testReserveStock() throws Exception {
        Map<String, Object> request = Map.of(
                "orderNumber", "ORDER-12345",
                "skuCodes", List.of("iPhone-50")
        );

        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50")))
                .thenReturn(List.of("iPhone-50"));

        mockMvc.perform(post("/api/inventory/reserve")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderNumber").value("ORDER-12345"))
                .andExpect(jsonPath("$.status").value("RESERVED"))
                .andDo(print());
    }

    @Test
    @DisplayName("Should release stock for order")
    void testReleaseStock() throws Exception {
        Map<String, Object> request = Map.of(
                "orderNumber", "ORDER-12345",
                "skuCodes", List.of("iPhone-50")
        );

        mockMvc.perform(post("/api/inventory/release")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderNumber").value("ORDER-12345"))
                .andExpect(jsonPath("$.status").value("RELEASED"))
                .andDo(print());
    }
}
