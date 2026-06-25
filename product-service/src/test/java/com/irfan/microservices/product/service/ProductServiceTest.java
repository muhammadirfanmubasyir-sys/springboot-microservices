package com.irfan.microservices.product.service;

import com.irfan.microservices.product.dto.ProductRequest;
import com.irfan.microservices.product.dto.ProductResponse;
import com.irfan.microservices.product.model.Product;
import com.irfan.microservices.product.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Product Service Unit Tests - ok")
public class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private ProductRequest productRequest;
    private Product savedProduct;
    private ProductResponse expectedResponse;

    @BeforeEach
    void setUp() {
        productRequest = ProductRequest.builder()
                .name("Laptop")
                .description("Gaming Laptop")
                .price(BigDecimal.valueOf(1500.00))
                .build();

        savedProduct = Product.builder()
                .id(1L)
                .name("Laptop")
                .description("Gaming Laptop")
                .price(BigDecimal.valueOf(1500.00))
                .build();

        expectedResponse = ProductResponse.builder()
                .id(1L)
                .name("Laptop")
                .description("Gaming Laptop")
                .price(BigDecimal.valueOf(1500.00))
                .build();
    }

    @Test
    @DisplayName("Should successfully create a new product")
    void testCreateProductSuccess() {
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        ProductResponse response = productService.createProduct(productRequest);

        assertNotNull(response);
        assertEquals(expectedResponse.id(), response.id());
        assertEquals(expectedResponse.name(), response.name());
        assertEquals(expectedResponse.description(), response.description());
        assertEquals(expectedResponse.price(), response.price());

        verify(productRepository).save(any(Product.class));
        verifyNoMoreInteractions(productRepository);
    }

    @Test
    @DisplayName("Should create product with correct product details")
    void testCreateProductDetailsAccuracy() {
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        ProductResponse response = productService.createProduct(productRequest);

        assertTrue(response.name().contains("Laptop"));
        assertTrue(response.description().contains("Gaming"));
        assertEquals(BigDecimal.valueOf(1500.00), response.price());
    }

    @Test
    @DisplayName("Should successfully retrieve all products")
    void testGetAllProductsSuccess() {
        Product product2 = Product.builder()
                .id(2L)
                .name("Mouse")
                .description("Wireless Mouse")
                .price(BigDecimal.valueOf(50.00))
                .build();

        when(productRepository.findAll()).thenReturn(Arrays.asList(savedProduct, product2));

        List<ProductResponse> responses = productService.getAllProducts();

        assertNotNull(responses);
        assertEquals(2, responses.size());
        assertEquals("Laptop", responses.get(0).name());
        assertEquals("Mouse", responses.get(1).name());

        verify(productRepository).findAll();
        verifyNoMoreInteractions(productRepository);
    }

    @Test
    @DisplayName("Should return empty list when no products exist")
    void testGetAllProductsEmpty() {
        when(productRepository.findAll()).thenReturn(Collections.emptyList());

        List<ProductResponse> responses = productService.getAllProducts();

        assertNotNull(responses);
        assertEquals(0, responses.size());
        assertTrue(responses.isEmpty());

        verify(productRepository).findAll();
    }

    @Test
    @DisplayName("Should handle single product retrieval")
    void testGetAllProductsSingleItem() {
        when(productRepository.findAll()).thenReturn(Collections.singletonList(savedProduct));

        List<ProductResponse> responses = productService.getAllProducts();

        assertNotNull(responses);
        assertEquals(1, responses.size());
        assertEquals("Laptop", responses.get(0).name());
    }

    @Test
    @DisplayName("Should create multiple products successfully")
    void testCreateMultipleProducts() {
        Product product2 = Product.builder()
                .id(2L)
                .name("Mouse")
                .description("Wireless Mouse")
                .price(BigDecimal.valueOf(50.00))
                .build();

        ProductRequest request2 = ProductRequest.builder()
                .name("Mouse")
                .description("Wireless Mouse")
                .price(BigDecimal.valueOf(50.00))
                .build();

        when(productRepository.save(any(Product.class)))
                .thenReturn(savedProduct)
                .thenReturn(product2);

        ProductResponse response1 = productService.createProduct(productRequest);
        ProductResponse response2 = productService.createProduct(request2);

        assertNotNull(response1);
        assertNotNull(response2);
        assertNotEquals(response1.id(), response2.id());
        assertEquals("Laptop", response1.name());
        assertEquals("Mouse", response2.name());

        verify(productRepository, times(2)).save(any(Product.class));
    }

    @Test
    @DisplayName("Should maintain price precision in product creation")
    void testCreateProductPricePrecision() {
        ProductRequest preciseRequest = ProductRequest.builder()
                .name("Precision Test")
                .description("Price precision test")
                .price(BigDecimal.valueOf(99.99))
                .build();

        Product preciseProduct = Product.builder()
                .id(3L)
                .name("Precision Test")
                .description("Price precision test")
                .price(BigDecimal.valueOf(99.99))
                .build();

        when(productRepository.save(any(Product.class))).thenReturn(preciseProduct);

        ProductResponse response = productService.createProduct(preciseRequest);

        assertEquals(BigDecimal.valueOf(99.99), response.price());
    }

    @Test
    @DisplayName("Should handle product names with special characters")
    void testCreateProductWithSpecialCharacters() {
        ProductRequest specialRequest = ProductRequest.builder()
                .name("Product-2024 (Pro)")
                .description("Special/Characters & Symbols")
                .price(BigDecimal.valueOf(100.00))
                .build();

        Product specialProduct = Product.builder()
                .id(4L)
                .name("Product-2024 (Pro)")
                .description("Special/Characters & Symbols")
                .price(BigDecimal.valueOf(100.00))
                .build();

        when(productRepository.save(any(Product.class))).thenReturn(specialProduct);

        ProductResponse response = productService.createProduct(specialRequest);

        assertTrue(response.name().contains("2024"));
        assertTrue(response.description().contains("Special"));
    }

    @Test
    @DisplayName("Should verify repository is called with Product entity")
    void testRepositoryCallVerification() {
        when(productRepository.save(any(Product.class))).thenReturn(savedProduct);

        productService.createProduct(productRequest);

        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    @DisplayName("Should return correct count of products in list")
    void testProductListSize() {
        List<Product> products = Arrays.asList(
                savedProduct,
                Product.builder().id(2L).name("Mouse").description("Desc").price(BigDecimal.valueOf(50)).build(),
                Product.builder().id(3L).name("Keyboard").description("Desc").price(BigDecimal.valueOf(75)).build()
        );

        when(productRepository.findAll()).thenReturn(products);

        List<ProductResponse> responses = productService.getAllProducts();

        assertEquals(3, responses.size());
    }

    @Test
    @DisplayName("Should handle large product lists")
    void testLargeProductList() {
        List<Product> largeList = Arrays.asList(
                savedProduct,
                Product.builder().id(2L).name("Product2").description("Desc").price(BigDecimal.valueOf(100)).build(),
                Product.builder().id(3L).name("Product3").description("Desc").price(BigDecimal.valueOf(150)).build(),
                Product.builder().id(4L).name("Product4").description("Desc").price(BigDecimal.valueOf(200)).build(),
                Product.builder().id(5L).name("Product5").description("Desc").price(BigDecimal.valueOf(250)).build()
        );

        when(productRepository.findAll()).thenReturn(largeList);

        List<ProductResponse> responses = productService.getAllProducts();

        assertEquals(5, responses.size());

        verify(productRepository).findAll();
    }
}
