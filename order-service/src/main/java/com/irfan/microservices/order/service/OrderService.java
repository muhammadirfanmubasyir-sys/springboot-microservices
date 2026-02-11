package com.irfan.microservices.order.service;

import com.irfan.microservices.order.client.InventoryClient;
import com.irfan.microservices.order.dto.InventoryResponse;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.model.OrderLineItems;
import com.irfan.microservices.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient; //feign client
    private final WebClient myWebClient;

    public void placeOrder(OrderRequest orderRequest) throws Exception {
        ;
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapTo)
                //.filter(OrderLineItems -> (OrderLineItems.getQuantity() != -1))
                .toList();
        order.setOrderLineItemsList(orderLineItems);

        List<String> skuCodes = order.getOrderLineItemsList().stream()
                .map(OrderLineItems::getSkuCode)
                .toList();
        //Call Inventory Service
        InventoryResponse[] arrInventoryResponse = myWebClient.get()
                .uri("http://localhost:8082/api/inventory",
                        uriBuilder ->
                                uriBuilder.queryParam("skuCode", skuCodes).build()
                )
                .retrieve()
                .bodyToMono(InventoryResponse[].class)
                .block();

        boolean allProductInStock = false;
        if (arrInventoryResponse != null) {
            allProductInStock = Arrays.stream(arrInventoryResponse)
                    .allMatch(InventoryResponse::isInStock);
        }

        if (allProductInStock) {
            order = orderRepository.save(order);
            log.info("ORDER PLACED SUCCESSFULLY, ID = " + order.getId());
        } else {
            throw new IllegalArgumentException("Product is not in stock, please try again later");
        }

}

    private OrderLineItems mapTo(OrderLineItemsDto orderLineItemsDto) {
        String skuCode = orderLineItemsDto.getSkuCode();
        Integer qty = orderLineItemsDto.getQuantity();
        BigDecimal price = orderLineItemsDto.getPrice();

        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setSkuCode(skuCode);
        orderLineItems.setQuantity(qty);
        orderLineItems.setPrice(price);

        return orderLineItems;
    }



//    using feign client
//    boolean isProductInStock = inventoryClient.isInStock(
//    orderLineItemsDto.getSkuCode(), orderLineItemsDto.getQuantity());

}
