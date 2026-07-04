package com.irfan.microservices.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.irfan.microservices.product.dto.ProductRequest;
import com.irfan.microservices.product.dto.ProductResponse;
import com.irfan.microservices.product.service.ProductService;
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
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Product Controller Unit Tests")
public class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private ObjectMapper objectMapper;
    private ProductRequest productRequest;
    private ProductResponse productResponse;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();
        objectMapper = new ObjectMapper();

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
        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(productResponse);

        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Laptop")))
                .andExpect(jsonPath("$.description", is("Gaming Laptop")))
                .andExpect(jsonPath("$.price", is(1500.0)))
                .andDo(print());

        verify(productService).createProduct(any(ProductRequest.class));
    }

    @Test
    @DisplayName("Should get all products and return HTTP 200")
    void testGetAllProductsSuccess() throws Exception {
        ProductResponse response2 = ProductResponse.builder()
                .id(2L)
                .name("Mouse")
                .description("Wireless Mouse")
                .price(BigDecimal.valueOf(50.00))
                .build();

        List<ProductResponse> responses = Arrays.asList(productResponse, response2);

        when(productService.getAllProducts()).thenReturn(responses);

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is("Laptop")))
                .andExpect(jsonPath("$[1].name", is("Mouse")))
                .andExpect(jsonPath("$[0].price", is(1500.0)))
                .andExpect(jsonPath("$[1].price", is(50.0)))
                .andDo(print());

        verify(productService).getAllProducts();
    }

    @Test
    @DisplayName("Should return empty list when no products exist")
    void testGetAllProductsEmpty() throws Exception {
        when(productService.getAllProducts()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)))
                .andDo(print());

        verify(productService).getAllProducts();
    }

    @Test
    @DisplayName("Should create product with valid JSON")
    void testCreateProductWithValidJson() throws Exception {
        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(productResponse);

        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print());
    }

    @Test
    @DisplayName("Should return HTTP 200 for GET all products")
    void testGetProductsHttpStatus() throws Exception {
        when(productService.getAllProducts()).thenReturn(Collections.singletonList(productResponse));

        mockMvc.perform(get("/api/product"))
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

        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(productResponse)
                .thenReturn(response2);

        String jsonRequest1 = objectMapper.writeValueAsString(productRequest);
        String jsonRequest2 = objectMapper.writeValueAsString(
                ProductRequest.builder()
                        .name("Mouse")
                        .description("Wireless Mouse")
                        .price(BigDecimal.valueOf(50.00))
                        .build()
        );

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest1))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest2))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("Should verify product response contains all fields")
    void testProductResponseFields() throws Exception {
        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(productResponse);

        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(post("/api/product")
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
    @DisplayName("Should correctly map product details in response")
    void testProductMappingInResponse() throws Exception {
        ProductResponse customResponse = ProductResponse.builder()
                .id(99L)
                .name("Custom Product")
                .description("Custom Description")
                .price(BigDecimal.valueOf(999.99))
                .build();

        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(customResponse);

        String jsonRequest = objectMapper.writeValueAsString(productRequest);

        mockMvc.perform(post("/api/product")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(99)))
                .andExpect(jsonPath("$.name", is("Custom Product")))
                .andExpect(jsonPath("$.description", is("Custom Description")))
                .andExpect(jsonPath("$.price", is(999.99)))
                .andDo(print());
    }

    @Test
    @DisplayName("Should handle products with different prices")
    void testProductsWithDifferentPrices() throws Exception {
        List<ProductResponse> responses = Arrays.asList(
                ProductResponse.builder().id(1L).name("Budget").price(BigDecimal.valueOf(10.00)).build(),
                ProductResponse.builder().id(2L).name("Standard").price(BigDecimal.valueOf(100.00)).build(),
                ProductResponse.builder().id(3L).name("Premium").price(BigDecimal.valueOf(1000.00)).build()
        );

        when(productService.getAllProducts()).thenReturn(responses);

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[0].price", is(10.0)))
                .andExpect(jsonPath("$[1].price", is(100.0)))
                .andExpect(jsonPath("$[2].price", is(1000.0)))
                .andDo(print());
    }

    @Test
    @DisplayName("Should handle product list with single item")
    void testSingleProductInList() throws Exception {
        when(productService.getAllProducts())
                .thenReturn(Collections.singletonList(productResponse));

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Laptop")))
                .andDo(print());
    }

    @Test
    @DisplayName("Should verify response content type is JSON")
    void testResponseContentType() throws Exception {
        when(productService.getAllProducts()).thenReturn(Collections.singletonList(productResponse));

        mockMvc.perform(get("/api/product"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andDo(print());
    }
}
