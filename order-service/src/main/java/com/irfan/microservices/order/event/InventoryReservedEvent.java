package com.irfan.microservices.order.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryReservedEvent {
    private String orderNumber;
    private List<String> reservedSkuCodes;
}
