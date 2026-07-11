# Benchmark Results: Apache Bench Summary

**Date:** 2026-07-11
**Tool:** Apache Bench (ab) 2.3
**Concurrency:** 10
**Requests per endpoint:** 1000

---

## Product Service - GET All Products

**Target:** `GET http://api-gateway:8888/api/product`

| Metric | Value |
|---|---|
| Total Requests | 1000 |
| Successful (2xx) | 1000 |
| Requests/sec | **24.60** |
| Avg Latency | 406.51 ms |
| P50 Latency | 382.93 ms |
| P95 Latency | 586.29 ms |
| P99 Latency | 920.37 ms |
| Max Latency | 1144.05 ms |

---

## Product Service - POST Create Product

**Target:** `POST http://api-gateway:8888/api/product`

| Metric | Value |
|---|---|
| Total Requests | 1000 |
| Non-2xx Responses | 1000 |
| Requests/sec | **70.23** |
| Avg Latency | 142.40 ms |
| P50 Latency | 130.72 ms |
| P95 Latency | 243.10 ms |
| P99 Latency | 283.51 ms |
| Max Latency | 390.15 ms |

---

## Order Service - POST Create Order

**Target:** `POST http://api-gateway:8888/api/order`

| Metric | Value |
|---|---|
| Total Requests | 1000 |
| Non-2xx Responses | 1000 |
| Requests/sec | **72.53** |
| Avg Latency | 137.87 ms |
| P50 Latency | 113.66 ms |
| P95 Latency | 264.80 ms |
| P99 Latency | 478.42 ms |
| Max Latency | 788.60 ms |

---

## Comparison Table

| Endpoint | RPS | Avg Latency | P50 | P95 | P99 | Max |
|---|---|---|---|---|---|---|
| GET /api/product | 24.60 | 406.51 ms | 382.93 ms | 586.29 ms | 920.37 ms | 1144.05 ms |
| POST /api/product | 70.23 | 142.40 ms | 130.72 ms | 243.10 ms | 283.51 ms | 390.15 ms |
| POST /api/order | 72.53 | 137.87 ms | 113.66 ms | 264.80 ms | 478.42 ms | 788.60 ms |

**Note:** POST benchmarks show non-2xx responses due to JWT token expiry during the test. For accurate authentication benchmarks, use the Node.js (`mjs`) or `autocannon` tools which auto-refresh tokens.
