# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-13T07:38:57.382Z
**Target:** `GET http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 9.64s
**Tool:** Apache JMeter 5.6.3

## Summary

| Metric | Value |
|---|---|
| Total Requests | 156 |
| Successful | 156 |
| Errors | 0 |
| Requests/sec | **16.19** |
| Throughput | 5.29 MB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 147 |
| Average | 644.71 |
| P50 | 464 |
| P90 | 1430 |
| P95 | 1587 |
| P99 | 1919 |
| Max | 2039 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 156 |

---

# Benchmark Results: Inventory Service - GET Inventory

**Date:** 2026-07-13T07:38:57.382Z
**Target:** `GET http://api-gateway:8888/api/inventory?skuCode=iPhone_15`
**Concurrency:** 10
**Duration:** 8.86s
**Tool:** Apache JMeter 5.6.3

## Summary

| Metric | Value |
|---|---|
| Total Requests | 682 |
| Successful | 682 |
| Errors | 0 |
| Requests/sec | **76.99** |
| Throughput | 0.03 MB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 31 |
| Average | 134.44 |
| P50 | 93 |
| P90 | 223 |
| P95 | 337 |
| P99 | 995 |
| Max | 1255 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 682 |

---

# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-13T07:38:57.382Z
**Target:** `POST http://api-gateway:8888/api/order`
**Concurrency:** 10
**Duration:** 9.10s
**Tool:** Apache JMeter 5.6.3

## Summary

| Metric | Value |
|---|---|
| Total Requests | 249 |
| Successful | 249 |
| Errors | 0 |
| Requests/sec | **27.37** |
| Throughput | 0.01 MB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 99 |
| Average | 399.88 |
| P50 | 272 |
| P90 | 955 |
| P95 | 1231 |
| P99 | 2010 |
| Max | 2156 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 249 |

---

# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-13T07:38:57.382Z
**Target:** `POST http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 9.47s
**Tool:** Apache JMeter 5.6.3

## Summary

| Metric | Value |
|---|---|
| Total Requests | 860 |
| Successful | 860 |
| Errors | 0 |
| Requests/sec | **90.82** |
| Throughput | 0.04 MB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 16 |
| Average | 105.86 |
| P50 | 78 |
| P90 | 191 |
| P95 | 248 |
| P99 | 696 |
| Max | 751 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 860 |
