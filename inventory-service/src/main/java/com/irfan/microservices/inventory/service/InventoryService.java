package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.dto.InventoryResponse;
import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Transactional(readOnly = true)
    public boolean isInStockBySkuCode(String skuCode) {
        boolean isInStock = inventoryRepository.findBySkuCode(skuCode).isPresent();
        log.info("STOCK PRODUCT [{}] IS {}", skuCode, isInStock);
        return isInStock;
    }

    public boolean isInStockBySkuCodeAndQty(String skuCode, Integer quantity) {
        boolean isInStock = inventoryRepository.findNativeWithSkuCodeAndQuantity(skuCode, quantity).isPresent();
        log.info("STOCK PRODUCT [{}] AND QTY [{}] IS {}", skuCode, quantity, isInStock);
        return isInStock;
    }

    @Transactional(readOnly = true)
    public List<InventoryResponse> getProductList(List<String> listOfSkuCode) {
        List<InventoryResponse> listOfResponse = inventoryRepository.findBySkuCodeIn(listOfSkuCode)
                .stream()
                .map(inventory ->
                    InventoryResponse.builder()
                            .skuCode(inventory.getSkuCode())
                            .inStock(inventory.getQuantity() > 0)
                            .build()
                ).toList();
        log.info("getProductList() SIZE = {}", listOfResponse.size());
        return listOfResponse;
    }

    @Transactional
    public List<String> reserveStock(String orderNumber, List<String> skuCodes) {
        log.info("Reserving stock for order: {}, SKUs: {}", orderNumber, skuCodes);
        List<String> reservedSkuCodes = new ArrayList<>();

        for (String skuCode : skuCodes) {
            Inventory inventory = inventoryRepository.findBySkuCode(skuCode)
                    .orElse(null);

            if (inventory != null && inventory.getQuantity() > 0) {
                inventory.setQuantity(inventory.getQuantity() - 1);
                inventoryRepository.save(inventory);
                reservedSkuCodes.add(skuCode);
                log.info("Reserved stock for SKU: {}, remaining quantity: {}", skuCode, inventory.getQuantity());
            } else {
                log.warn("Cannot reserve stock for SKU: {} - insufficient quantity", skuCode);
                throw new IllegalArgumentException("Insufficient stock for SKU: " + skuCode);
            }
        }

        log.info("Stock reserved successfully for order: {}, reserved SKUs: {}", orderNumber, reservedSkuCodes);
        return reservedSkuCodes;
    }

    @Transactional
    public void releaseStock(String orderNumber, List<String> skuCodes) {
        log.info("Releasing stock for order: {}, SKUs: {}", orderNumber, skuCodes);

        for (String skuCode : skuCodes) {
            inventoryRepository.findBySkuCode(skuCode).ifPresent(inventory -> {
                inventory.setQuantity(inventory.getQuantity() + 1);
                inventoryRepository.save(inventory);
                log.info("Released stock for SKU: {}, new quantity: {}", skuCode, inventory.getQuantity());
            });
        }

        log.info("Stock released successfully for order: {}", orderNumber);
    }
}
