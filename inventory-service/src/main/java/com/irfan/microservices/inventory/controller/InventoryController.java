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
     *  This is called by Order Service Application: /api/inventory?skuCode=xxx
     *
     * @param skuCode
     * @return
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> retrieveProductList(@RequestParam List<String> skuCode) {
        return inventoryService.getProductList(skuCode);
    }
}
