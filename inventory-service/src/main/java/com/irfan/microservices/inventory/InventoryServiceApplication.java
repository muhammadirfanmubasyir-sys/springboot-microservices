package com.irfan.microservices.inventory;

import com.irfan.microservices.inventory.model.Inventory;
import com.irfan.microservices.inventory.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

    @Bean
    public CommandLineRunner loadData(InventoryRepository inventoryRepository) {
        return args -> {
            Inventory inventory = new Inventory();
            inventory.setSkuCode("Iphone-73");
            inventory.setQuantity(10);
            inventoryRepository.save(inventory);

            inventory = new Inventory();
            inventory.setSkuCode("Iphone-83");
            inventory.setQuantity(0);
            inventoryRepository.save(inventory);
        };
    }
}
