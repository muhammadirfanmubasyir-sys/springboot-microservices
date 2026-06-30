package com.irfan.microservices.inventory.controller;

import com.irfan.microservices.inventory.dto.InventoryResponse;
import com.irfan.microservices.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/{my-code}")
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStockBySkuCode(@PathVariable("my-code") String skuCode) {
        return inventoryService.isInStockBySkuCode(skuCode);
    }

    @GetMapping("/check-stock")
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStockBySkuCodeAndQty(@RequestParam String skuCode, @RequestParam Integer quantity) {
        return inventoryService.isInStockBySkuCodeAndQty(skuCode, quantity);
    }

    /**
     * This is called by Order Service Application: /api/inventory?skuCode=xxx
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> retrieveProductList(@RequestParam List<String> skuCode) {
        return inventoryService.getProductList(skuCode);
    }

    /**
     * Reserve stock for an order (saga step)
     */
    @PostMapping("/reserve")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> reserveStock(@RequestBody Map<String, Object> request) {
        String orderNumber = (String) request.get("orderNumber");
        @SuppressWarnings("unchecked")
        List<String> skuCodes = (List<String>) request.get("skuCodes");

        List<String> reservedSkuCodes = inventoryService.reserveStock(orderNumber, skuCodes);
        return Map.of(
                "orderNumber", orderNumber,
                "reservedSkuCodes", reservedSkuCodes,
                "status", "RESERVED"
        );
    }

    /**
     * Release reserved stock (compensation for saga)
     */
    @PostMapping("/release")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, Object> releaseStock(@RequestBody Map<String, Object> request) {
        String orderNumber = (String) request.get("orderNumber");
        @SuppressWarnings("unchecked")
        List<String> skuCodes = (List<String>) request.get("skuCodes");

        inventoryService.releaseStock(orderNumber, skuCodes);
        return Map.of(
                "orderNumber", orderNumber,
                "status", "RELEASED"
        );
    }
}
