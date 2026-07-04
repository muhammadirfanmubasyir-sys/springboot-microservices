package com.irfan.microservices.inventory.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreatedEvent {
    private String orderNumber;
    private List<OrderItemEvent> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemEvent {
        private String skuCode;
        private Integer quantity;
        private BigDecimal price;
    }
}
