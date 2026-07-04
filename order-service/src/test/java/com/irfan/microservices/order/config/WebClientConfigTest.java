package com.irfan.microservices.order.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("WebClient Config Unit Tests")
class WebClientConfigTest {

    @InjectMocks
    private WebClientConfig webClientConfig;

    @Test
    @DisplayName("Should have @Configuration annotation")
    void testClassAnnotation() {
        assertTrue(WebClientConfig.class.isAnnotationPresent(Configuration.class));
    }

    @Test
    @DisplayName("Should create WebClient.Builder bean")
    void testMyWebClientBuilder() {
        WebClient.Builder builder = webClientConfig.myWebClientBuilder();
        assertNotNull(builder);
    }

    @Test
    @DisplayName("Should have @LoadBalanced annotation on myWebClientBuilder method")
    void testLoadBalancedAnnotation() throws NoSuchMethodException {
        Method method = WebClientConfig.class.getMethod("myWebClientBuilder");
        assertTrue(method.isAnnotationPresent(LoadBalanced.class));
    }

    @Test
    @DisplayName("Should have @Bean annotation on myWebClientBuilder method")
    void testBeanAnnotation() throws NoSuchMethodException {
        Method method = WebClientConfig.class.getMethod("myWebClientBuilder");
        assertTrue(method.isAnnotationPresent(org.springframework.context.annotation.Bean.class));
    }

    @Test
    @DisplayName("Should return WebClient.Builder from myWebClientBuilder")
    void testReturnType() throws NoSuchMethodException {
        Method method = WebClientConfig.class.getMethod("myWebClientBuilder");
        assertEquals(WebClient.Builder.class, method.getReturnType());
    }
}
