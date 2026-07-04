package com.irfan.api.gateway;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Api Gateway Application Unit Tests")
class ApiGatewayApplicationTest {

    @Test
    @DisplayName("Should have @SpringBootApplication annotation")
    void testSpringBootApplicationAnnotation() {
        assertTrue(ApiGatewayApplication.class.isAnnotationPresent(SpringBootApplication.class));
    }

    @Test
    @DisplayName("Should have @EnableDiscoveryClient annotation")
    void testEnableDiscoveryClientAnnotation() {
        assertTrue(ApiGatewayApplication.class.isAnnotationPresent(EnableDiscoveryClient.class));
    }

    @Test
    @DisplayName("Should have main method with String[] parameter")
    void testMainMethodExists() throws NoSuchMethodException {
        Method method = ApiGatewayApplication.class.getMethod("main", String[].class);
        assertNotNull(method);
        assertEquals(void.class, method.getReturnType());
    }
}
