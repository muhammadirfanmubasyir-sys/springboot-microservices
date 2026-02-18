package com.irfan.microservices.order.controller;

import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest) {
        try {
            orderService.placeOrder(orderRequest);
        } catch (Exception ex) {
            ex.printStackTrace();
            log.info(ex.getMessage());
            throw new RuntimeException(ex.getMessage());
        }

        return "Order places successfully";
    }
}
