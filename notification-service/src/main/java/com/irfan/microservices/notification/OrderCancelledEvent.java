package com.irfan.microservices.notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCancelledEvent {
    private String orderNumber;
    private String reason;
}
