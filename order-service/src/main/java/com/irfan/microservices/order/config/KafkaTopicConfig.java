package com.irfan.microservices.order.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

    @Bean
    public NewTopic orderCreatedTopic() {
        return TopicBuilder.name("OrderCreatedTopic")
                .build();
    }

    @Bean
    public NewTopic inventoryReservedTopic() {
        return TopicBuilder.name("InventoryReservedTopic")
                .build();
    }

    @Bean
    public NewTopic inventoryFailedTopic() {
        return TopicBuilder.name("InventoryFailedTopic")
                .build();
    }

    @Bean
    public NewTopic orderCompletedTopic() {
        return TopicBuilder.name("OrderCompletedTopic")
                .build();
    }

    @Bean
    public NewTopic orderCancelledTopic() {
        return TopicBuilder.name("OrderCancelledTopic")
                .build();
    }
}
