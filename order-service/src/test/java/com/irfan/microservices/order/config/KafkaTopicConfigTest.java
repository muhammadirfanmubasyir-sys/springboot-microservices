package com.irfan.microservices.order.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.context.annotation.Configuration;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Kafka Topic Config Unit Tests")
class KafkaTopicConfigTest {

    @InjectMocks
    private KafkaTopicConfig kafkaTopicConfig;

    @Test
    @DisplayName("Should have @Configuration annotation")
    void testClassAnnotation() {
        assertTrue(KafkaTopicConfig.class.isAnnotationPresent(Configuration.class));
    }

    @Test
    @DisplayName("Should create OrderCreatedTopic bean")
    void testOrderCreatedTopic() {
        NewTopic topic = kafkaTopicConfig.orderCreatedTopic();
        assertNotNull(topic);
        assertEquals("OrderCreatedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create InventoryReservedTopic bean")
    void testInventoryReservedTopic() {
        NewTopic topic = kafkaTopicConfig.inventoryReservedTopic();
        assertNotNull(topic);
        assertEquals("InventoryReservedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create InventoryFailedTopic bean")
    void testInventoryFailedTopic() {
        NewTopic topic = kafkaTopicConfig.inventoryFailedTopic();
        assertNotNull(topic);
        assertEquals("InventoryFailedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create OrderCompletedTopic bean")
    void testOrderCompletedTopic() {
        NewTopic topic = kafkaTopicConfig.orderCompletedTopic();
        assertNotNull(topic);
        assertEquals("OrderCompletedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create OrderCancelledTopic bean")
    void testOrderCancelledTopic() {
        NewTopic topic = kafkaTopicConfig.orderCancelledTopic();
        assertNotNull(topic);
        assertEquals("OrderCancelledTopic", topic.name());
    }
}
