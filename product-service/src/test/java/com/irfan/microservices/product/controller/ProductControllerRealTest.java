package com.irfan.microservices.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irfan.microservices.product.dto.ProductRequest;
import com.irfan.microservices.product.dto.ProductResponse;
import com.irfan.microservices.product.repository.ProductRepository;
import com.irfan.microservices.product.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@DisplayName("Product Controller Integration Tests")
public class ProductControllerRealTest {
    @Autowired
    private WebApplicationContext context;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductService productService;

    @Autowired  // Add: Inject real repository for cleanup if needed
    private ProductRepository productRepository;

    private MockMvc mockMvc;

    private ProductRequest productRequest;
    private ProductResponse productResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        productRepository.deleteAll();  // Clear database before each test

        productRequest = ProductRequest.builder()
                .name("Laptop")
                .description("Gaming Laptop")
                .price(BigDecimal.valueOf(1500.00))
                .build();

        productResponse = ProductResponse.builder()
                .id(1L)
                .name("Laptop")
                .description("Gaming Laptop")
                .price(BigDecimal.valueOf(1500.00))
                .build();
    }

    @Test
    @DisplayName("Should create product and return HTTP 201")
    void testCreateProductSuccess() throws Exception {
        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name", is("Laptop")))
                .andExpect(jsonPath("$.description", is("Gaming Laptop")))
                .andExpect(jsonPath("$.price", is(1500.0)))
                .andDo(print());

    }

    @Test
    @DisplayName("Should get all products and return HTTP 200")
    void testGetAllProductsSuccess() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/product"))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @DisplayName("Should return empty list when no products exist")
    void testGetAllProductsEmpty() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)))
                .andDo(print());

    }

    @Test
    @DisplayName("Should create product with valid JSON")
    void testCreateProductWithValidJson() throws Exception {

        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print());
    }

    @Test
    @DisplayName("Should return HTTP 200 for GET all products")
    void testGetProductsHttpStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/product"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should handle multiple product creation requests")
    void testMultipleProductCreation() throws Exception {
        ProductResponse response2 = ProductResponse.builder()
                .id(2L)
                .name("Mouse")
                .description("Wireless Mouse")
                .price(BigDecimal.valueOf(50.00))
                .build();

        String jsonRequest1 = objectMapper.writeValueAsString(productRequest);
        String jsonRequest2 = objectMapper.writeValueAsString(
                ProductRequest.builder()
                        .name("Mouse")
                        .description("Wireless Mouse")
                        .price(BigDecimal.valueOf(50.00))
                        .build()
        );

        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest1))
                .andExpect(status().isCreated());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest2))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Should verify product response contains all fields")
    void testProductResponseFields() throws Exception {
        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.name", notNullValue()))
                .andExpect(jsonPath("$.description", notNullValue()))
                .andExpect(jsonPath("$.price", notNullValue()))
                .andDo(print());
    }






    @Test
    @DisplayName("Should verify response content type is JSON")
    void testResponseContentType() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print());
    }
}
