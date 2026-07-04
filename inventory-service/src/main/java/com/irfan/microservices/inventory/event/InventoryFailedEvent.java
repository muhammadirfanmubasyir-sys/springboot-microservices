package com.irfan.microservices.inventory.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryFailedEvent {
    private String orderNumber;
    private List<String> failedSkuCodes;
    private String reason;
}
