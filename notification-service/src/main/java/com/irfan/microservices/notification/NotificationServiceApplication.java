package com.irfan.microservices.notification;

import io.micrometer.observation.annotation.Observed;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@Slf4j
public class NotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @KafkaListener(topics = "OrderCompletedTopic", groupId = "notification-group")
    @Observed(name = "message.count")
    public void handleOrderCompleted(OrderCompletedEvent event) {
        log.info("================================================================");
        log.info("ORDER COMPLETED - Order Number: {}", event.getOrderNumber());
        log.info("================================================================");
    }

    @KafkaListener(topics = "OrderCancelledTopic", groupId = "notification-group")
    @Observed(name = "message.count")
    public void handleOrderCancelled(OrderCancelledEvent event) {
        log.info("================================================================");
        log.info("ORDER CANCELLED - Order Number: {}, Reason: {}",
                event.getOrderNumber(), event.getReason());
        log.info("================================================================");
    }
}
