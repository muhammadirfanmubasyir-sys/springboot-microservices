# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-13T05:52:50.341Z
**Target:** `GET http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 10s (actual: 11.45s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 264 |
| Successful | 264 |
| Errors | 0 |
| Requests/sec | **23.06** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 56.22 |
| Avg | 428.10 |
| P50 | 271.49 |
| P95 | 860.01 |
| P99 | 3255.87 |
| Max | 3437.14 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 264 |

---

# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-13T05:52:50.341Z
**Target:** `POST http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 10s (actual: 12.43s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 427 |
| Successful | 427 |
| Errors | 0 |
| Requests/sec | **34.35** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 79.72 |
| Avg | 287.76 |
| P50 | 227.47 |
| P95 | 433.69 |
| P99 | 2190.73 |
| Max | 2265.42 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 427 |

---

# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-13T05:52:50.341Z
**Target:** `POST http://api-gateway:8888/api/order`
**Concurrency:** 10
**Duration:** 10s (actual: 11.12s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 116 |
| Successful | 116 |
| Errors | 0 |
| Requests/sec | **10.43** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 513.00 |
| Avg | 931.22 |
| P50 | 915.08 |
| P95 | 1351.38 |
| P99 | 1648.22 |
| Max | 1735.09 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 116 |

---

# Benchmark Results: Inventory Service - GET Inventory

**Date:** 2026-07-13T05:52:50.341Z
**Target:** `GET http://api-gateway:8888/api/inventory?skuCode=iPhone_15`
**Concurrency:** 10
**Duration:** 10s (actual: 10.68s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 522 |
| Successful | 522 |
| Errors | 0 |
| Requests/sec | **48.88** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 31.63 |
| Avg | 203.17 |
| P50 | 179.18 |
| P95 | 396.06 |
| P99 | 514.95 |
| Max | 739.94 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 522 |
