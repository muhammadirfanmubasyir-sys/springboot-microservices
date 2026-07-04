package com.irfan.microservices.notification;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.annotation.KafkaListener;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Notification Service Unit Tests")
class NotificationServiceApplicationTest {

    @InjectMocks
    private NotificationServiceApplication notificationService;

    private OrderCompletedEvent completedEvent;
    private OrderCancelledEvent cancelledEvent;

    @BeforeEach
    void setUp() {
        completedEvent = new OrderCompletedEvent("ORDER-12345");
        cancelledEvent = new OrderCancelledEvent("ORDER-67890", "Out of stock");
    }

    @Test
    @DisplayName("Should handle order completed event without error")
    void testHandleOrderCompleted() {
        assertDoesNotThrow(() -> notificationService.handleOrderCompleted(completedEvent));
    }

    @Test
    @DisplayName("Should handle order cancelled event without error")
    void testHandleOrderCancelled() {
        assertDoesNotThrow(() -> notificationService.handleOrderCancelled(cancelledEvent));
    }

    @Test
    @DisplayName("Should have correct KafkaListener annotation for order completed")
    void testOrderCompletedListenerAnnotation() throws NoSuchMethodException {
        Method method = NotificationServiceApplication.class
                .getMethod("handleOrderCompleted", OrderCompletedEvent.class);

        KafkaListener annotation = method.getAnnotation(KafkaListener.class);
        assertNotNull(annotation);
        assertEquals("OrderCompletedTopic", annotation.topics()[0]);
        assertEquals("notification-group", annotation.groupId());
    }

    @Test
    @DisplayName("Should have correct KafkaListener annotation for order cancelled")
    void testOrderCancelledListenerAnnotation() throws NoSuchMethodException {
        Method method = NotificationServiceApplication.class
                .getMethod("handleOrderCancelled", OrderCancelledEvent.class);

        KafkaListener annotation = method.getAnnotation(KafkaListener.class);
        assertNotNull(annotation);
        assertEquals("OrderCancelledTopic", annotation.topics()[0]);
        assertEquals("notification-group", annotation.groupId());
    }

    @Test
    @DisplayName("Should correctly create OrderCompletedEvent")
    void testOrderCompletedEventCreation() {
        OrderCompletedEvent event = new OrderCompletedEvent("ORDER-999");
        assertEquals("ORDER-999", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should correctly create OrderCancelledEvent with reason")
    void testOrderCancelledEventCreation() {
        OrderCancelledEvent event = new OrderCancelledEvent("ORDER-888", "Insufficient stock");
        assertEquals("ORDER-888", event.getOrderNumber());
        assertEquals("Insufficient stock", event.getReason());
    }

    @Test
    @DisplayName("Should correctly set and get OrderCompletedEvent fields via setters")
    void testOrderCompletedEventSetters() {
        OrderCompletedEvent event = new OrderCompletedEvent();
        event.setOrderNumber("ORDER-777");
        assertEquals("ORDER-777", event.getOrderNumber());
    }

    @Test
    @DisplayName("Should correctly set and get OrderCancelledEvent fields via setters")
    void testOrderCancelledEventSetters() {
        OrderCancelledEvent event = new OrderCancelledEvent();
        event.setOrderNumber("ORDER-666");
        event.setReason("Timeout");
        assertEquals("ORDER-666", event.getOrderNumber());
        assertEquals("Timeout", event.getReason());
    }
}
