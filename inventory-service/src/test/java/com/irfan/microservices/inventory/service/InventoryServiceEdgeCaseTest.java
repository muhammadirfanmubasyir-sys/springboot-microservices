package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Service Edge Case Tests")
class InventoryServiceEdgeCaseTest {

    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private InventoryService inventoryService;

    private Inventory testInventory;

    @BeforeEach
    void setUp() {
        testInventory = new Inventory();
        testInventory.setId(1L);
        testInventory.setSkuCode("iPhone-50");
        testInventory.setQuantity(10);
    }

    @Test
    @DisplayName("Should throw exception when reserving stock for non-existent SKU")
    void testReserveStockSkuNotFound() {
        when(inventoryRepository.findBySkuCode("NonExistent"))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () ->
                inventoryService.reserveStock("ORDER-12345", List.of("NonExistent")));
    }

    @Test
    @DisplayName("Should reserve multiple SKUs successfully")
    void testReserveStockMultipleSkus() {
        Inventory inv2 = new Inventory();
        inv2.setId(2L);
        inv2.setSkuCode("Samsung-100");
        inv2.setQuantity(5);

        when(inventoryRepository.findBySkuCode("iPhone-50"))
                .thenReturn(Optional.of(testInventory));
        when(inventoryRepository.findBySkuCode("Samsung-100"))
                .thenReturn(Optional.of(inv2));

        List<String> reserved = inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100"));

        assertEquals(2, reserved.size());
        assertEquals(9, testInventory.getQuantity());
        assertEquals(4, inv2.getQuantity());
        verify(inventoryRepository).save(testInventory);
        verify(inventoryRepository).save(inv2);
    }

    @Test
    @DisplayName("Should throw exception when second SKU has insufficient stock")
    void testReserveStockSecondSkuInsufficient() {
        Inventory inv2 = new Inventory();
        inv2.setId(2L);
        inv2.setSkuCode("Samsung-100");
        inv2.setQuantity(0);

        when(inventoryRepository.findBySkuCode("iPhone-50"))
                .thenReturn(Optional.of(testInventory));
        when(inventoryRepository.findBySkuCode("Samsung-100"))
                .thenReturn(Optional.of(inv2));

        assertThrows(IllegalArgumentException.class, () ->
                inventoryService.reserveStock("ORDER-12345", List.of("iPhone-50", "Samsung-100")));

        verify(inventoryRepository).save(testInventory);
        verify(inventoryRepository, never()).save(inv2);
    }

    @Test
    @DisplayName("Should release stock when inventory not found (no-op)")
    void testReleaseStockInventoryNotFound() {
        when(inventoryRepository.findBySkuCode("NonExistent"))
                .thenReturn(Optional.empty());

        assertDoesNotThrow(() ->
                inventoryService.releaseStock("ORDER-12345", List.of("NonExistent")));

        verify(inventoryRepository, never()).save(any());
    }

    @Test
    @DisplayName("Should release stock for multiple SKUs")
    void testReleaseStockMultipleSkus() {
        Inventory inv2 = new Inventory();
        inv2.setId(2L);
        inv2.setSkuCode("Samsung-100");
        inv2.setQuantity(5);

        when(inventoryRepository.findBySkuCode("iPhone-50"))
                .thenReturn(Optional.of(testInventory));
        when(inventoryRepository.findBySkuCode("Samsung-100"))
                .thenReturn(Optional.of(inv2));

        inventoryService.releaseStock("ORDER-12345", List.of("iPhone-50", "Samsung-100"));

        assertEquals(11, testInventory.getQuantity());
        assertEquals(6, inv2.getQuantity());
        verify(inventoryRepository).save(testInventory);
        verify(inventoryRepository).save(inv2);
    }

    @Test
    @DisplayName("Should handle getProductList with single SKU")
    void testGetProductListSingleSku() {
        when(inventoryRepository.findBySkuCodeIn(List.of("iPhone-50")))
                .thenReturn(List.of(testInventory));

        var result = inventoryService.getProductList(List.of("iPhone-50"));

        assertEquals(1, result.size());
        assertEquals("iPhone-50", result.get(0).getSkuCode());
        assertTrue(result.get(0).isInStock());
    }

    @Test
    @DisplayName("Should handle getProductList with mixed stock items")
    void testGetProductListMixedStock() {
        Inventory outOfStock = new Inventory();
        outOfStock.setId(3L);
        outOfStock.setSkuCode("OutOfStock-SKU");
        outOfStock.setQuantity(0);

        when(inventoryRepository.findBySkuCodeIn(List.of("iPhone-50", "OutOfStock-SKU")))
                .thenReturn(List.of(testInventory, outOfStock));

        var result = inventoryService.getProductList(List.of("iPhone-50", "OutOfStock-SKU"));

        assertEquals(2, result.size());
        assertTrue(result.get(0).isInStock());
        assertFalse(result.get(1).isInStock());
    }
}
