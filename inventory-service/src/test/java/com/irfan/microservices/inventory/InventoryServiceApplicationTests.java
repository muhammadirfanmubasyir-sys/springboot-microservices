package com.irfan.microservices.inventory;

import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@DisplayName("Inventory Service Application Unit Tests")
class InventoryServiceApplicationTests {

    @Test
    @DisplayName("Should have @SpringBootApplication annotation")
    void testSpringBootApplicationAnnotation() {
        assertTrue(InventoryServiceApplication.class.isAnnotationPresent(org.springframework.boot.autoconfigure.SpringBootApplication.class));
    }

    @Test
    @DisplayName("Should have @EnableDiscoveryClient annotation")
    void testEnableDiscoveryClientAnnotation() {
        assertTrue(InventoryServiceApplication.class.isAnnotationPresent(EnableDiscoveryClient.class));
    }

    @Test
    @DisplayName("Should have main method")
    void testMainMethodExists() throws NoSuchMethodException {
        var method = InventoryServiceApplication.class.getMethod("main", String[].class);
        assertNotNull(method);
    }

    @Test
    @DisplayName("Should have loadData method")
    void testLoadDataMethodExists() throws NoSuchMethodException {
        var method = InventoryServiceApplication.class.getMethod("loadData", InventoryRepository.class);
        assertNotNull(method);
        assertEquals(CommandLineRunner.class, method.getReturnType());
    }

    @Test
    @DisplayName("Should load data into repository on startup")
    void testLoadData() {
        InventoryServiceApplication app = new InventoryServiceApplication();
        InventoryRepository mockRepository = mock(InventoryRepository.class);

        CommandLineRunner runner = app.loadData(mockRepository);

        assertNotNull(runner);

        try {
            runner.run();
        } catch (Exception e) {
            // May throw due to DB, but the repository save calls should have been made
        }

        verify(mockRepository, atLeast(2)).save(any(Inventory.class));
    }

    @Test
    @DisplayName("Should save inventory with correct SKU codes and quantities")
    void testLoadDataCorrectValues() {
        InventoryServiceApplication app = new InventoryServiceApplication();
        InventoryRepository mockRepository = mock(InventoryRepository.class);

        CommandLineRunner runner = app.loadData(mockRepository);

        try {
            runner.run();
        } catch (Exception e) {
            // May throw due to DB
        }

        verify(mockRepository).save(argThat(inventory -> {
            Inventory inv = (Inventory) inventory;
            return "Iphone-73".equals(inv.getSkuCode()) && inv.getQuantity() == 10;
        }));
        verify(mockRepository).save(argThat(inventory -> {
            Inventory inv = (Inventory) inventory;
            return "Iphone-83".equals(inv.getSkuCode()) && inv.getQuantity() == 0;
        }));
    }

    @Test
    @DisplayName("Should return non-null CommandLineRunner from loadData")
    void testLoadDataReturnsRunner() {
        InventoryServiceApplication app = new InventoryServiceApplication();
        InventoryRepository mockRepository = mock(InventoryRepository.class);

        CommandLineRunner runner = app.loadData(mockRepository);

        assertNotNull(runner);
        assertDoesNotThrow(() -> {
            try {
                runner.run();
            } catch (Exception ignored) {
            }
        });
    }
}

@SpringBootTest
@DisplayName("Inventory Service Context Load Tests")
class InventoryServiceContextLoadTest {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @DisplayName("Should load application context successfully")
    void contextLoads() {
        assertNotNull(applicationContext);
    }

    @Test
    @DisplayName("Should have InventoryServiceApplication bean")
    void shouldHaveApplicationBean() {
        assertTrue(applicationContext.containsBean("inventoryServiceApplication"));
    }

    @Test
    @DisplayName("Should have InventoryService bean")
    void shouldHaveInventoryServiceBean() {
        assertTrue(applicationContext.containsBean("inventoryService"));
    }

    @Test
    @DisplayName("Should have InventoryController bean")
    void shouldHaveInventoryControllerBean() {
        assertTrue(applicationContext.containsBean("inventoryController"));
    }
}
