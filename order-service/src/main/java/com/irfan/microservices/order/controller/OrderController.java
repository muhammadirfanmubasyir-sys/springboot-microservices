package com.irfan.microservices.order.controller;

import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.service.OrchestratorService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.micrometer.observation.annotation.Observed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrchestratorService orchestratorService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Observed(name="order.count")
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_CB")
    @RateLimiter(name="inventory", fallbackMethod = "fallbackMethod_RL")
    public String placeOrder(@RequestBody OrderRequest orderRequest) {
        return orchestratorService.startSaga(orderRequest);
    }

    public String fallbackMethod_CB(OrderRequest request, RuntimeException ex) {
        return "oops, something went wrong, please order again later!";
    }

    public String fallbackMethod_RL(OrderRequest request, RuntimeException ex) {
        return "You already reached 10 requests within 10 s, next wait for 3s";
    }
}
