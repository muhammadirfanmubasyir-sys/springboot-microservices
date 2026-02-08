package com.irfan.microservices.inventory.service;

import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InventoryServiceTest {
    @Mock
    private InventoryRepository inventoryRepository; //mock the repository dependency

    @InjectMocks
    private InventoryService inventoryService; //inject the mock to the service

    @Test
    public void testFindNativeWithSkuCodeAndQuantity() {
        String skuCode ="Iphone-50";
        Integer qty = 1;

        Optional<Inventory> expectedInventory = Optional.of(new Inventory());
        when(inventoryRepository.findNativeWithSkuCodeAndQuantity(skuCode, qty)).thenReturn(expectedInventory);

        //Action!
        Optional<Inventory> actualInventory =  inventoryRepository
                                                .findNativeWithSkuCodeAndQuantity(skuCode, qty);

        //Assert
        Assertions.assertEquals(expectedInventory, actualInventory);

        //Verify that repository method was called
        verify(inventoryRepository).findNativeWithSkuCodeAndQuantity(skuCode, qty);
    }




}
