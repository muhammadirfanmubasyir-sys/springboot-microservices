# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-11T08:10:04.997Z
**Target:** `GET http://api-gateway:8888/api/product`
**Connections:** 10
**Duration:** 10.1s
**Tool:** autocannon v8.0.0

## Summary

| Metric | Value |
|---|---|
| Total Requests | 222 |
| Requests/sec | **22.20** |
| Throughput | 16.76 MB/s |
| Errors | 0 |
| Timeouts | 0 |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 123 |
| Average | 442.82 |
| P50 | 401 |
| P90 | 663 |
| P99 | 1170 |
| Max | 1205 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 222 |

---

# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-11T08:10:04.997Z
**Target:** `POST http://api-gateway:8888/api/product`
**Connections:** 10
**Duration:** 10.2s
**Tool:** autocannon v8.0.0

## Summary

| Metric | Value |
|---|---|
| Total Requests | 941 |
| Requests/sec | **94.10** |
| Throughput | 0.04 MB/s |
| Errors | 0 |
| Timeouts | 0 |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 21 |
| Average | 107.34 |
| P50 | 96 |
| P90 | 173 |
| P99 | 293 |
| Max | 501 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 941 |

---

# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-11T08:10:04.997Z
**Target:** `POST http://api-gateway:8888/api/order`
**Connections:** 10
**Duration:** 10.1s
**Tool:** autocannon v8.0.0

## Summary

| Metric | Value |
|---|---|
| Total Requests | 640 |
| Requests/sec | **64.00** |
| Throughput | 0.02 MB/s |
| Errors | 0 |
| Timeouts | 0 |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 75 |
| Average | 155.16 |
| P50 | 147 |
| P90 | 208 |
| P99 | 329 |
| Max | 394 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 640 |
