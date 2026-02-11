package com.irfan.microservices.inventory.repository;

import com.irfan.microservices.inventory.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findBySkuCode(String skuCode);
    Optional<Inventory> findBySkuCodeAndQuantity(String skuCode, Integer quantity);
    Optional<Inventory> findBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);

    @Query("SELECT obj FROM Inventory obj WHERE obj.skuCode = :skuCode AND obj.quantity >= :qty")
    Optional<Inventory> findWithSkuCodeAndQuantity(@Param("skuCode") String skuCode, @Param("qty") Integer quantity);

    @Query(value = "SELECT * FROM inventory WHERE sku_code = :skuCode AND quantity >= :qty LIMIT 1", nativeQuery = true)
    Optional<Inventory> findNativeWithSkuCodeAndQuantity(@Param("skuCode") String skuCode, @Param("qty") Integer quantity);

    List<Inventory> findBySkuCodeIn(List<String> listOfSkuCode);
}
