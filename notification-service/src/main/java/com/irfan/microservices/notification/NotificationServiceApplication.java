package com.irfan.microservices.notification;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@Slf4j
public class NotificationServiceApplication {
     public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @KafkaListener(topics = "NotificationTopic", groupId = "myGroup")
    public void handleNotificationTopic(OrderPlacedEvent orderPlacedEvent) {
         log.info("================================================================");
         log.info("Order Received with Number = {}", orderPlacedEvent.getOrderNumber());
         log.info("================================================================");
    }
}
