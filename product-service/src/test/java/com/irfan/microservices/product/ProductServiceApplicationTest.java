package com.irfan.microservices.product;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Product Service Application Unit Tests")
class ProductServiceApplicationTest {

    @Test
    @DisplayName("Should have @SpringBootApplication annotation")
    void testSpringBootApplicationAnnotation() {
        assertTrue(ProductServiceApplication.class.isAnnotationPresent(SpringBootApplication.class));
    }

    @Test
    @DisplayName("Should have @EnableDiscoveryClient annotation")
    void testEnableDiscoveryClientAnnotation() {
        assertTrue(ProductServiceApplication.class.isAnnotationPresent(EnableDiscoveryClient.class));
    }

    @Test
    @DisplayName("Should have main method")
    void testMainMethodExists() throws NoSuchMethodException {
        var method = ProductServiceApplication.class.getMethod("main", String[].class);
        assertNotNull(method);
    }
}

@SpringBootTest
@DisplayName("Product Service Context Load Tests")
class ProductServiceContextLoadTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @DisplayName("Should load application context successfully")
    void contextLoads() {
        assertNotNull(applicationContext);
    }

    @Test
    @DisplayName("Should have ProductServiceApplication bean")
    void shouldHaveApplicationBean() {
        assertTrue(applicationContext.containsBean("productServiceApplication"));
    }

    @Test
    @DisplayName("Should have ProductService bean")
    void shouldHaveProductServiceBean() {
        assertTrue(applicationContext.containsBean("productService"));
    }

    @Test
    @DisplayName("Should have ProductController bean")
    void shouldHaveProductControllerBean() {
        assertTrue(applicationContext.containsBean("productController"));
    }
}
