package com.irfan.microservices.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irfan.microservices.inventory.dto.InventoryResponse;
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

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Controller Edge Case Tests")
class InventoryControllerEdgeCaseTest {

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
    @DisplayName("Should return product list with multiple SKU codes")
    void testRetrieveProductListMultipleSkus() throws Exception {
        InventoryResponse resp1 = new InventoryResponse("iPhone-50", true);
        InventoryResponse resp2 = new InventoryResponse("Samsung-100", false);

        when(inventoryService.getProductList(List.of("iPhone-50", "Samsung-100")))
                .thenReturn(List.of(resp1, resp2));

        mockMvc.perform(get("/api/inventory")
                        .param("skuCode", "iPhone-50", "Samsung-100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(2)))
                .andExpect(jsonPath("$[0].skuCode").value("iPhone-50"))
                .andExpect(jsonPath("$[0].inStock").value(true))
                .andExpect(jsonPath("$[1].skuCode").value("Samsung-100"))
                .andExpect(jsonPath("$[1].inStock").value(false));
    }

    @Test
    @DisplayName("Should return empty product list")
    void testRetrieveProductListEmpty() throws Exception {
        when(inventoryService.getProductList(List.of("Unknown-SKU")))
                .thenReturn(List.of());

        mockMvc.perform(get("/api/inventory")
                        .param("skuCode", "Unknown-SKU"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", org.hamcrest.Matchers.hasSize(0)));
    }

    @Test
    @DisplayName("Should reserve stock with multiple SKUs")
    void testReserveStockMultipleSkus() throws Exception {
        Map<String, Object> request = Map.of(
                "orderNumber", "ORDER-12345",
                "skuCodes", List.of("iPhone-50", "Samsung-100")
        );

        when(inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100")))
                .thenReturn(List.of("iPhone-50", "Samsung-100"));

        mockMvc.perform(post("/api/inventory/reserve")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderNumber").value("ORDER-12345"))
                .andExpect(jsonPath("$.status").value("RESERVED"))
                .andExpect(jsonPath("$.reservedSkuCodes", org.hamcrest.Matchers.hasSize(2)));
    }

    @Test
    @DisplayName("Should release stock with multiple SKUs")
    void testReleaseStockMultipleSkus() throws Exception {
        Map<String, Object> request = Map.of(
                "orderNumber", "ORDER-12345",
                "skuCodes", List.of("iPhone-50", "Samsung-100")
        );

        doNothing().when(inventoryService).releaseStock("ORDER-12345", List.of("iPhone-50", "Samsung-100"));

        mockMvc.perform(post("/api/inventory/release")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderNumber").value("ORDER-12345"))
                .andExpect(jsonPath("$.status").value("RELEASED"));

        verify(inventoryService).releaseStock("ORDER-12345", List.of("iPhone-50", "Samsung-100"));
    }

    @Test
    @DisplayName("Should return false for check-stock when not in stock")
    void testCheckStockNotInStock() throws Exception {
        when(inventoryService.isInStockBySkuCodeAndQty("iPhone-50", 100)).thenReturn(false);

        mockMvc.perform(get("/api/inventory/check-stock")
                        .param("skuCode", "iPhone-50")
                        .param("quantity", "100"))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    @DisplayName("Should return true for check-stock when in stock")
    void testCheckStockInStock() throws Exception {
        when(inventoryService.isInStockBySkuCodeAndQty("iPhone-50", 5)).thenReturn(true);

        mockMvc.perform(get("/api/inventory/check-stock")
                        .param("skuCode", "iPhone-50")
                        .param("quantity", "5"))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }
}
