# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-11T07:55:04.138Z
**Target:** `GET http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 10s (actual: 10.77s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 376 |
| Successful | 376 |
| Errors | 0 |
| Requests/sec | **34.92** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 99.50 |
| Avg | 283.13 |
| P50 | 272.81 |
| P95 | 426.34 |
| P99 | 532.08 |
| Max | 597.71 |

## Status Codes

| Code | Count |
|---|---|
| 200 | 376 |

---

# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-11T07:55:04.138Z
**Target:** `POST http://api-gateway:8888/api/product`
**Concurrency:** 10
**Duration:** 10s (actual: 10.58s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 1769 |
| Successful | 1769 |
| Errors | 0 |
| Requests/sec | **167.15** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 19.17 |
| Avg | 59.42 |
| P50 | 56.24 |
| P95 | 99.48 |
| P99 | 122.61 |
| Max | 167.82 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 1769 |

---

# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-11T07:55:04.138Z
**Target:** `POST http://api-gateway:8888/api/order`
**Concurrency:** 10
**Duration:** 10s (actual: 10.87s)

## Summary

| Metric | Value |
|---|---|
| Total Requests | 491 |
| Successful | 491 |
| Errors | 0 |
| Requests/sec | **45.19** |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 75.08 |
| Avg | 218.41 |
| P50 | 200.55 |
| P95 | 378.43 |
| P99 | 470.35 |
| Max | 526.85 |

## Status Codes

| Code | Count |
|---|---|
| 201 | 491 |
