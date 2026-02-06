package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Transactional(readOnly = true)
    public boolean isInStock(String skuCode) {
        boolean isInStock = inventoryRepository.findBySkuCode(skuCode).isPresent();
        log.info(" STOCK PRODUCT [" + skuCode + "] IS " + isInStock );
        return  isInStock;
    }

    public boolean isInStock(String skuCode, Integer quantity) {
        boolean isInStock = inventoryRepository.findBySkuCodeAndQuantity(skuCode, quantity).isPresent();
        log.info(" STOCK PRODUCT [" + skuCode + "] AND QTY [" + quantity + "] IS " + isInStock );
        return  isInStock;
    }
}
