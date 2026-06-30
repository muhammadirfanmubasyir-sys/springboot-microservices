package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.dto.InventoryResponse;
import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Inventory Service Unit Tests")
public class InventoryServiceTest {
    @Mock
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private InventoryService inventoryService;

    private Inventory testInventory;
    private String testSkuCode;
    private Integer testQuantity;

    @BeforeEach
    void setUp() {
        testSkuCode = "iPhone-50";
        testQuantity = 100;
        testInventory = new Inventory();
        testInventory.setId(1L);
        testInventory.setSkuCode(testSkuCode);
        testInventory.setQuantity(testQuantity);
    }

    @Test
    @DisplayName("Test Find Native With SkuCode And Quantity")
    public void testFindNativeWithSkuCodeAndQuantity() {
        String skuCode = "Iphone-50";
        Integer qty = 1;

        Optional<Inventory> expectedInventory = Optional.of(new Inventory());
        Mockito.when(inventoryRepository.findNativeWithSkuCodeAndQuantity(skuCode, qty)).thenReturn(expectedInventory);

        Optional<Inventory> actualInventory = inventoryRepository
                .findNativeWithSkuCodeAndQuantity(skuCode, qty);

        Assertions.assertEquals(expectedInventory, actualInventory);

        verify(inventoryRepository).findNativeWithSkuCodeAndQuantity(skuCode, qty);
    }

    @Test
    @DisplayName("Should return true when product is in stock by SKU code")
    public void testIsInStockBySkuCodeSuccess() {
        when(inventoryRepository.findBySkuCode(testSkuCode))
                .thenReturn(Optional.of(testInventory));

        boolean result = inventoryService.isInStockBySkuCode(testSkuCode);

        assertTrue(result);
        verify(inventoryRepository).findBySkuCode(testSkuCode);
    }

    @Test
    @DisplayName("Should return false when product is not in stock by SKU code")
    public void testIsInStockBySkuCodeNotFound() {
        when(inventoryRepository.findBySkuCode("NonExistent-SKU"))
                .thenReturn(Optional.empty());

        boolean result = inventoryService.isInStockBySkuCode("NonExistent-SKU");

        assertFalse(result);
        verify(inventoryRepository).findBySkuCode("NonExistent-SKU");
    }

    @Test
    @DisplayName("Should return true when product quantity is sufficient")
    public void testIsInStockBySkuCodeAndQtySuccess() {
        when(inventoryRepository.findNativeWithSkuCodeAndQuantity(testSkuCode, 50))
                .thenReturn(Optional.of(testInventory));

        boolean result = inventoryService.isInStockBySkuCodeAndQty(testSkuCode, 50);

        assertTrue(result);
        verify(inventoryRepository).findNativeWithSkuCodeAndQuantity(testSkuCode, 50);
    }

    @Test
    @DisplayName("Should return false when product quantity is insufficient")
    public void testIsInStockBySkuCodeAndQtyInsufficientQuantity() {
        when(inventoryRepository.findNativeWithSkuCodeAndQuantity(testSkuCode, 200))
                .thenReturn(Optional.empty());

        boolean result = inventoryService.isInStockBySkuCodeAndQty(testSkuCode, 200);

        assertFalse(result);
        verify(inventoryRepository).findNativeWithSkuCodeAndQuantity(testSkuCode, 200);
    }

    @Test
    @DisplayName("Should return list of inventory responses for valid SKU codes")
    public void testGetProductListSuccess() {
        Inventory inventory2 = new Inventory();
        inventory2.setId(2L);
        inventory2.setSkuCode("Samsung-100");
        inventory2.setQuantity(50);

        List<String> skuCodes = Arrays.asList(testSkuCode, "Samsung-100");
        when(inventoryRepository.findBySkuCodeIn(skuCodes))
                .thenReturn(Arrays.asList(testInventory, inventory2));

        List<InventoryResponse> result = inventoryService.getProductList(skuCodes);

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(testSkuCode, result.get(0).getSkuCode());
        assertTrue(result.get(0).isInStock());
        verify(inventoryRepository).findBySkuCodeIn(skuCodes);
    }

    @Test
    @DisplayName("Should return empty list when no products found")
    public void testGetProductListEmpty() {
        List<String> skuCodes = Arrays.asList("Unknown-1", "Unknown-2");
        when(inventoryRepository.findBySkuCodeIn(skuCodes))
                .thenReturn(Collections.emptyList());

        List<InventoryResponse> result = inventoryService.getProductList(skuCodes);

        assertNotNull(result);
        assertEquals(0, result.size());
        verify(inventoryRepository).findBySkuCodeIn(skuCodes);
    }

    @Test
    @DisplayName("Should correctly identify out of stock products")
    public void testGetProductListWithOutOfStockItems() {
        Inventory outOfStockInventory = new Inventory();
        outOfStockInventory.setId(3L);
        outOfStockInventory.setSkuCode("OutOfStock-SKU");
        outOfStockInventory.setQuantity(0);

        List<String> skuCodes = Arrays.asList(testSkuCode, "OutOfStock-SKU");
        when(inventoryRepository.findBySkuCodeIn(skuCodes))
                .thenReturn(Arrays.asList(testInventory, outOfStockInventory));

        List<InventoryResponse> result = inventoryService.getProductList(skuCodes);

        assertEquals(2, result.size());
        assertTrue(result.get(0).isInStock());
        assertFalse(result.get(1).isInStock());
    }

    @Test
    @DisplayName("Should handle quantity equal to zero as out of stock")
    public void testZeroQuantityIsOutOfStock() {
        testInventory.setQuantity(0);

        List<String> skuCodes = Collections.singletonList(testSkuCode);
        when(inventoryRepository.findBySkuCodeIn(skuCodes))
                .thenReturn(Collections.singletonList(testInventory));

        List<InventoryResponse> result = inventoryService.getProductList(skuCodes);

        assertFalse(result.get(0).isInStock());
    }

    @Test
    @DisplayName("Should verify repository is called with correct parameters")
    public void testRepositoryCallVerification() {
        when(inventoryRepository.findBySkuCode(anyString()))
                .thenReturn(Optional.of(testInventory));

        inventoryService.isInStockBySkuCode(testSkuCode);

        verify(inventoryRepository, times(1)).findBySkuCode(testSkuCode);
        verifyNoMoreInteractions(inventoryRepository);
    }

    @Test
    @DisplayName("Should handle multiple calls to inventory service")
    public void testMultipleCalls() {
        when(inventoryRepository.findBySkuCode(testSkuCode))
                .thenReturn(Optional.of(testInventory));
        when(inventoryRepository.findNativeWithSkuCodeAndQuantity(testSkuCode, 50))
                .thenReturn(Optional.of(testInventory));

        inventoryService.isInStockBySkuCode(testSkuCode);
        inventoryService.isInStockBySkuCodeAndQty(testSkuCode, 50);

        verify(inventoryRepository).findBySkuCode(testSkuCode);
        verify(inventoryRepository).findNativeWithSkuCodeAndQuantity(testSkuCode, 50);
    }

    @Test
    @DisplayName("Should reserve stock successfully")
    public void testReserveStockSuccess() {
        when(inventoryRepository.findBySkuCode(testSkuCode))
                .thenReturn(Optional.of(testInventory));

        List<String> reservedSkuCodes = inventoryService.reserveStock("ORDER-12345", List.of(testSkuCode));

        assertNotNull(reservedSkuCodes);
        assertEquals(1, reservedSkuCodes.size());
        assertEquals(testSkuCode, reservedSkuCodes.get(0));
        assertEquals(99, testInventory.getQuantity());
        verify(inventoryRepository).save(testInventory);
    }

    @Test
    @DisplayName("Should throw exception when reserving stock for out of stock item")
    public void testReserveStockOutOfStock() {
        testInventory.setQuantity(0);
        when(inventoryRepository.findBySkuCode(testSkuCode))
                .thenReturn(Optional.of(testInventory));

        assertThrows(IllegalArgumentException.class, () ->
                inventoryService.reserveStock("ORDER-12345", List.of(testSkuCode)));
    }

    @Test
    @DisplayName("Should release stock successfully")
    public void testReleaseStockSuccess() {
        testInventory.setQuantity(99);
        when(inventoryRepository.findBySkuCode(testSkuCode))
                .thenReturn(Optional.of(testInventory));

        inventoryService.releaseStock("ORDER-12345", List.of(testSkuCode));

        assertEquals(100, testInventory.getQuantity());
        verify(inventoryRepository).save(testInventory);
    }
}
