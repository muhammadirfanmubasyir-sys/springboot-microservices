package com.irfan.microservices.inventory.controller;

import com.irfan.microservices.inventory.service.InventoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class InventoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private InventoryService inventoryService;

    @Test
    public void testInStockBySkuCodeAndQty() throws Exception {
        String skuCode = "Iphone-99";
        int qty = 1000;

        when(inventoryService.isInStockBySkuCodeAndQty(skuCode, qty)).thenReturn(true);

        // Act & Assert
        String url = "/api/inventory/check-stock?skuCode="+skuCode+"&quantity="+qty;
        mockMvc.perform(MockMvcRequestBuilders.get(url)) //real time invoke!!
                .andExpect(status().isOk())
                .andExpect(content().string("true"))
                .andDo(print());
    }
}
