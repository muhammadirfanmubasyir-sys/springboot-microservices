# Order Saga Pattern - Orchestration Implementation

## Overview

This document describes the implementation of the **Order Saga Pattern** using the **Orchestration** approach in the Spring Boot Microservices project.

## What is a Saga?

A **Saga** is a sequence of local transactions that update data across multiple microservices. If a step fails, the saga executes compensating transactions to undo the previous changes.

### Why Saga?

In a microservices architecture, each service has its own database. Traditional distributed transactions (2PC) are not practical. The Saga pattern provides a way to maintain data consistency across services without tight coupling.

## Architecture

### Orchestration Pattern

In the orchestration pattern, a central **orchestrator** coordinates the entire saga. The orchestrator tells participants what to do, in what order, and handles compensation if something fails.

```
┌─────────────────────────────────────────────────────────────────┐
│                        SAGA ORCHESTRATOR                        │
│                     (Order Service)                             │
├─────────────────────────────────────────────────────────────────┤
│  1. Create Order (PENDING)                                      │
│  2. Call Inventory Service (HTTP)                               │
│  3. Handle Response (CONFIRMED or CANCELLED)                    │
│  4. Publish Kafka Event                                         │
└─────────────────────────────────────────────────────────────────┘
```

### Flow Diagram

```
Client
  │
  │  POST /api/order
  ▼
┌──────────────────┐
│  Orchestrator     │
│  (Order Service)  │
└────────┬─────────┘
         │
         │  Step 1: Create Order (PENDING)
         ▼
┌──────────────────┐
│  Order Database   │
│  (PostgreSQL)     │
└──────────────────┘
         │
         │  Step 2: Call Inventory Service
         ▼
┌──────────────────┐
│  Inventory        │
│  Service (HTTP)   │
└────────┬─────────┘
         │
         │  Step 3: Handle Response
         ├─── Success ──► Update Order (CONFIRMED)
         │                      │
         │                      ▼
         │               Publish OrderCompletedEvent
         │
         └─── Failure ──► Update Order (CANCELLED)
                                │
                                ▼
                         Publish OrderCancelledEvent
                                │
                                ▼
┌──────────────────┐
│  Notification     │
│  Service (Kafka)  │
└──────────────────┘
```

## Order Status Flow

```
PENDING ──────────► CONFIRMED (Happy Path)
    │
    └──────────────► CANCELLED (Failure Path)
```

### Status Descriptions

| Status | Description |
|--------|-------------|
| `PENDING` | Order created, waiting for inventory reservation |
| `CONFIRMED` | Inventory reserved successfully, order confirmed |
| `CANCELLED` | Inventory reservation failed, order cancelled |

## Kafka Topics

| Topic | Producer | Consumer | Purpose |
|-------|----------|----------|---------|
| `OrderCreatedTopic` | order-service | inventory-service | New order created |
| `InventoryReservedTopic` | inventory-service | order-service | Stock reserved |
| `InventoryFailedTopic` | inventory-service | order-service | Stock reservation failed |
| `OrderCompletedTopic` | order-service | notification-service | Order confirmed |
| `OrderCancelledTopic` | order-service | notification-service | Order cancelled |

## Event Definitions

### OrderCreatedEvent
```json
{
    "orderNumber": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
        {
            "skuCode": "iPhone-15",
            "quantity": 2,
            "price": 999.99
        }
    ]
}
```

### InventoryReservedEvent
```json
{
    "orderNumber": "550e8400-e29b-41d4-a716-446655440000",
    "reservedSkuCodes": ["iPhone-15"]
}
```

### InventoryFailedEvent
```json
{
    "orderNumber": "550e8400-e29b-41d4-a716-446655440000",
    "failedSkuCodes": ["iPhone-15"],
    "reason": "Insufficient stock for SKU: iPhone-15"
}
```

### OrderCompletedEvent
```json
{
    "orderNumber": "550e8400-e29b-41d4-a716-446655440000"
}
```

### OrderCancelledEvent
```json
{
    "orderNumber": "550e8400-e29b-41d4-a716-446655440000",
    "reason": "Insufficient stock for SKU: iPhone-15"
}
```

## Implementation Details

### 1. Order Entity

The Order entity now includes a status field:

```java
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String orderNumber;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderLineItems> orderLineItemsList;
}
```

### 2. OrchestratorService

The OrchestratorService is the central coordinator:

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class OrchestratorService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder myWebClientBuilder;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public String startSaga(OrderRequest orderRequest) {
        // Step 1: Create order with PENDING status
        Order order = createOrder(orderRequest);
        order.setStatus(OrderStatus.PENDING);
        order = orderRepository.save(order);

        try {
            // Step 2: Call Inventory Service
            InventoryResponse[] responses = callInventoryService(order);

            // Step 3: Handle response
            if (allInStock(responses)) {
                order.setStatus(OrderStatus.CONFIRMED);
                orderRepository.save(order);
                kafkaTemplate.send("OrderCompletedTopic",
                    new OrderCompletedEvent(order.getOrderNumber()));
                return "Order placed successfully";
            }
        } catch (Exception e) {
            // Compensate on failure
            order.setStatus(OrderStatus.CANCELLED);
            orderRepository.save(order);
            kafkaTemplate.send("OrderCancelledTopic",
                new OrderCancelledEvent(order.getOrderNumber(), e.getMessage()));
            return "Order cancelled: " + e.getMessage();
        }
    }
}
```

### 3. Inventory Service

The Inventory Service provides stock reservation:

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Transactional
    public List<String> reserveStock(String orderNumber, List<String> skuCodes) {
        List<String> reservedSkuCodes = new ArrayList<>();

        for (String skuCode : skuCodes) {
            Inventory inventory = inventoryRepository.findBySkuCode(skuCode)
                    .orElse(null);

            if (inventory != null && inventory.getQuantity() > 0) {
                inventory.setQuantity(inventory.getQuantity() - 1);
                inventoryRepository.save(inventory);
                reservedSkuCodes.add(skuCode);
            } else {
                throw new IllegalArgumentException("Insufficient stock for SKU: " + skuCode);
            }
        }

        return reservedSkuCodes;
    }

    @Transactional
    public void releaseStock(String orderNumber, List<String> skuCodes) {
        for (String skuCode : skuCodes) {
            inventoryRepository.findBySkuCode(skuCode).ifPresent(inventory -> {
                inventory.setQuantity(inventory.getQuantity() + 1);
                inventoryRepository.save(inventory);
            });
        }
    }
}
```

### 4. Kafka Listener

The InventorySagaListener handles events:

```java
@Component
@RequiredArgsConstructor
@Slf4j
public class InventorySagaListener {

    private final InventoryService inventoryService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "OrderCreatedTopic", groupId = "inventory-group")
    public void handleOrderCreated(OrderCreatedEvent event) {
        try {
            List<String> reservedSkuCodes = inventoryService.reserveStock(
                    event.getOrderNumber(), skuCodes);

            kafkaTemplate.send("InventoryReservedTopic",
                new InventoryReservedEvent(event.getOrderNumber(), reservedSkuCodes));

        } catch (Exception e) {
            kafkaTemplate.send("InventoryFailedTopic",
                new InventoryFailedEvent(event.getOrderNumber(), failedSkuCodes, e.getMessage()));
        }
    }
}
```

## Compensation Logic

### What is Compensation?

Compensation is the process of undoing changes when a saga step fails. In our implementation:

1. **If inventory reservation fails**: The order is cancelled
2. **If order creation fails**: No compensation needed (no changes made yet)

### Compensation Flow

```
Step 1: Create Order (PENDING) ──► Success
Step 2: Reserve Inventory ──► Failure
Step 3: Compensate ──► Cancel Order (CANCELLED)
```

## Error Handling

### Exception Types

| Exception | Cause | Handling |
|-----------|-------|----------|
| `IllegalArgumentException` | Insufficient stock | Cancel order, publish event |
| `WebClientResponseException` | HTTP call failure | Cancel order, publish event |
| `KafkaException` | Kafka send failure | Log error, retry |

### Fallback Methods

The controller includes fallback methods for resilience:

```java
@PostMapping
@CircuitBreaker(name = "inventory", fallbackMethod = "fallbackMethod_CB")
@RateLimiter(name = "inventory", fallbackMethod = "fallbackMethod_RL")
public String placeOrder(@RequestBody OrderRequest orderRequest) {
    return orchestratorService.startSaga(orderRequest);
}

public String fallbackMethod_CB(OrderRequest request, RuntimeException ex) {
    return "oops, something went wrong, please order again later!";
}

public String fallbackMethod_RL(OrderRequest request, RuntimeException ex) {
    return "You already reached 10 requests within 10 s, next wait for 3s";
}
```

## Testing

### Unit Tests

- `OrchestratorServiceTest` - Tests for saga orchestration logic
- `InventorySagaListenerTest` - Tests for Kafka event handling
- `InventoryServiceTest` - Tests for stock reservation/release

### Integration Tests

- `OrderControllerTest` - Tests for REST endpoints
- TestContainers for database testing

### Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=OrchestratorServiceTest

# Run with coverage
mvn test jacoco:report
```

## Configuration

### application.properties (order-service)

```properties
# Kafka configuration
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer
spring.kafka.producer.properties.spring.json.type.mapping=orderCreated:com.irfan.microservices.order.event.OrderCreatedEvent,inventoryReserved:com.irfan.microservices.order.event.InventoryReservedEvent,inventoryFailed:com.irfan.microservices.order.event.InventoryFailedEvent,orderCompleted:com.irfan.microservices.order.event.OrderCompletedEvent,orderCancelled:com.irfan.microservices.order.event.OrderCancelledEvent
```

### application.properties (inventory-service)

```properties
# Kafka configuration
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=inventory-group
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.springframework.kafka.support.serializer.JsonDeserializer
spring.kafka.consumer.properties.spring.json.type.mapping=orderCreated:com.irfan.microservices.inventory.event.OrderCreatedEvent,inventoryReserved:com.irfan.microservices.inventory.event.InventoryReservedEvent,inventoryFailed:com.irfan.microservices.inventory.event.InventoryFailedEvent
```

## Advantages of This Implementation

1. **Clear Visibility**: The orchestrator provides a single place to understand the entire flow
2. **Simple Compensation**: Failed orders are easily cancelled with a status update
3. **Centralized Error Handling**: All error handling logic is in the orchestrator
4. **Easy Testing**: The saga logic can be tested by mocking the orchestrator
5. **Resilient**: Circuit breaker and rate limiter protect against failures

## Limitations

1. **Single Point of Failure**: The orchestrator is a critical component
2. **Synchronous Calls**: HTTP calls to inventory service can be slow
3. **Tight Coupling**: The orchestrator knows about all services

## Future Improvements

1. **Async Inventory Calls**: Use Kafka for inventory reservation instead of HTTP
2. **Timeout Handling**: Add timeout for inventory calls
3. **Retry Logic**: Implement retry for failed inventory calls
4. **Dead Letter Queue**: Add DLQ for failed events
5. **Monitoring**: Add more metrics and tracing

## References

- [Microservices Patterns](https://microservices.io/patterns/data/saga.html)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
