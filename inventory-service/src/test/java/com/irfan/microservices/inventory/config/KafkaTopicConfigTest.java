package com.irfan.microservices.inventory.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Configuration;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Inventory Kafka Topic Config Unit Tests")
class KafkaTopicConfigTest {

    private final KafkaTopicConfig kafkaTopicConfig = new KafkaTopicConfig();

    @Test
    @DisplayName("Should have @Configuration annotation")
    void testClassAnnotation() {
        assertTrue(KafkaTopicConfig.class.isAnnotationPresent(Configuration.class));
    }

    @Test
    @DisplayName("Should create OrderCreatedTopic")
    void testOrderCreatedTopic() {
        NewTopic topic = kafkaTopicConfig.orderCreatedTopic();
        assertNotNull(topic);
        assertEquals("OrderCreatedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create InventoryReservedTopic")
    void testInventoryReservedTopic() {
        NewTopic topic = kafkaTopicConfig.inventoryReservedTopic();
        assertNotNull(topic);
        assertEquals("InventoryReservedTopic", topic.name());
    }

    @Test
    @DisplayName("Should create InventoryFailedTopic")
    void testInventoryFailedTopic() {
        NewTopic topic = kafkaTopicConfig.inventoryFailedTopic();
        assertNotNull(topic);
        assertEquals("InventoryFailedTopic", topic.name());
    }
}
