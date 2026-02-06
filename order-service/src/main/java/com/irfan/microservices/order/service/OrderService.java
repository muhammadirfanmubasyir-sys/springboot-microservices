package com.irfan.microservices.order.service;

import com.irfan.microservices.order.client.InventoryClient;
import com.irfan.microservices.order.dto.OrderLineItemsDto;
import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.model.Order;
import com.irfan.microservices.order.model.OrderLineItems;
import com.irfan.microservices.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    public void placeOrder(OrderRequest orderRequest) throws Exception {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapTo)
                .filter(OrderLineItems -> (OrderLineItems.getQuantity() != -1))
                .toList();

        if (orderLineItems.isEmpty()) {
            log.info("ORDER LINE ITEM IS EMPTY => CANNOT PLACE ORDER!!");
            throw new RuntimeException("PRODUCT IS NOT EXIST !");
        }

        order.setOrderLineItemsList(orderLineItems);

        order = orderRepository.save(order);

        log.info("ORDER PLACED SUCCESSFULLY, ID = " + order.getId());
    }

    private OrderLineItems mapTo(OrderLineItemsDto orderLineItemsDto) {
        String skuCode = orderLineItemsDto.getSkuCode();
        Integer qty = orderLineItemsDto.getQuantity();
        BigDecimal price = orderLineItemsDto.getPrice();

        boolean isProductInStock = inventoryClient.isInStock(skuCode, qty);
        log.info("QUANTITY ["+ qty + "] FOR  PRODUCT [" + skuCode + "] IS = "+ isProductInStock);

        if (!isProductInStock) {
            qty = -1;
            log.info("QUANTITY OR PRODUCT IS NOT EXIST !");
        }

        OrderLineItems orderLineItems = new OrderLineItems();
        orderLineItems.setSkuCode(skuCode);
        orderLineItems.setQuantity(qty);
        orderLineItems.setPrice(price);

        return orderLineItems;
    }
}
