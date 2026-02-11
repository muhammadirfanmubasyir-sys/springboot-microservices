package com.irfan.microservices.inventory.controller;

import com.irfan.microservices.inventory.dto.InventoryResponse;
import com.irfan.microservices.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/{sku-code}")
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStockBySkuCode(@PathVariable("sku-code") String skuCode) {
        return inventoryService.isInStockBySkuCode(skuCode);
    }

    @GetMapping("/check-stock")
    @ResponseStatus(HttpStatus.OK)
    public boolean isInStockBySkuCodeAndQty(@RequestParam String skuCode, @RequestParam Integer quantity) {
        return inventoryService.isInStockBySkuCodeAndQty(skuCode, quantity);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> retrieveProductList(@RequestParam List<String> skuCode) {
        return inventoryService.getProductList(skuCode);
    }
}
