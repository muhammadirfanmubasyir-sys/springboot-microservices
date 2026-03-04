package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.dto.InventoryResponse;
import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Transactional(readOnly = true)
    public boolean isInStockBySkuCode(String skuCode) {
        boolean isInStock = inventoryRepository.findBySkuCode(skuCode).isPresent();
        log.info(" STOCK PRODUCT [" + skuCode + "] IS " + isInStock );
        return  isInStock;
    }

    public boolean isInStockBySkuCodeAndQty(String skuCode, Integer quantity) {
        boolean isInStock = inventoryRepository.findNativeWithSkuCodeAndQuantity(skuCode, quantity).isPresent();
        log.info(" STOCK PRODUCT [" + skuCode + "] AND QTY [" + quantity + "] IS " + isInStock );
        return  isInStock;
    }

    @Transactional(readOnly = true)
  //  @SneakyThrows
    public List<InventoryResponse> getProductList(List<String> listOfSkuCode)  {
      //  log.info("WAIT STARTED..");
       // Thread.sleep(10*1000);
       // log.info("WAIT ENDED..");
        List<InventoryResponse>  lisOfResponse = inventoryRepository.findBySkuCodeIn(listOfSkuCode)
                .stream()
                .map(inventory ->
                    InventoryResponse.builder()
                            .skuCode(inventory.getSkuCode())
                            .inStock(inventory.getQuantity() > 0)
                            .build()
                ).toList();
        log.info("getProductList() SIZE = "+ lisOfResponse.size());
        return lisOfResponse;
    }
}
