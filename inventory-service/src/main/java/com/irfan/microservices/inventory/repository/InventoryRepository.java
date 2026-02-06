package com.irfan.microservices.inventory.repository;

import com.irfan.microservices.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findBySkuCode(String skuCode);
    Optional<Inventory> findBySkuCodeAndQuantity(String skuCode, Integer quantity);
}
