package com.irfan.discovery.server;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Discovery Server Application Unit Tests")
class DiscoveryServerApplicationTest {

    @Test
    @DisplayName("Should have @SpringBootApplication annotation")
    void testSpringBootApplicationAnnotation() {
        assertTrue(DiscoveryServerApplication.class.isAnnotationPresent(SpringBootApplication.class));
    }

    @Test
    @DisplayName("Should have @EnableEurekaServer annotation")
    void testEnableEurekaServerAnnotation() {
        assertTrue(DiscoveryServerApplication.class.isAnnotationPresent(EnableEurekaServer.class));
    }

    @Test
    @DisplayName("Should have main method with String[] parameter")
    void testMainMethodExists() throws NoSuchMethodException {
        Method method = DiscoveryServerApplication.class.getMethod("main", String[].class);
        assertNotNull(method);
        assertEquals(void.class, method.getReturnType());
    }
}
