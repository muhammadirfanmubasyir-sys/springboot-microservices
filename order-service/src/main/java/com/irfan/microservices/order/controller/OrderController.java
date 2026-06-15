package com.irfan.microservices.order.controller;

import com.irfan.microservices.order.dto.OrderRequest;
import com.irfan.microservices.order.service.OrderService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import io.github.resilience4j.timelimiter.annotation.TimeLimiter;
import io.micrometer.observation.annotation.Observed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
//  case 1
//    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_1")

//  case 2 : Circuit breaker with timeout
//    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_2")
//    @TimeLimiter(name ="inventory")
//    Resilience4j Timeout properties => for slow behaviour in Inventory Service
//    props: resilience4j.timelimiter.instances.inventory.timeout-duration=3s

//  case 3: Circuit breaker with retry first then timeout
//    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_2")
//    @Retry(name = "inventory")
//    @TimeLimiter(name ="inventory")
//    props: #Resilience4j Retry properties
//    resilience4j.retry.instances.inventory.max-attempts=3
//    resilience4j.retry.instances.inventory.wait-duration=5s

    @Observed(name="order.count")
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_1")
    public String placeOrder(@RequestBody OrderRequest orderRequest) {
        return orderService.placeOrder(orderRequest);
    }

    public String fallbackMethod_1(OrderRequest request, RuntimeException ex) {
        return "oops, something went wrong, please order again later!";
    }

    //  for case 2 and 3 : timeout and retry with timeout
    //  @CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_2")
    //  @TimeLimiter(name ="inventory")
    //  @Retry(name = "inventory")
    //  public CompletableFuture<String> placeOrder (@RequestBody OrderRequest orderRequest) {
    //       return CompletableFuture.supplyAsync(()-> orderService.placeOrder(orderRequest));
    //  }

    //  public CompletableFuture<String> fallbackMethod_2(OrderRequest request, RuntimeException ex) {
    //    return  CompletableFuture.supplyAsync(()-> "oops, something went wrong, please order again later!");
    //  }
}
