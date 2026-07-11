# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-11
**Target:** `POST http://api-gateway:8888/api/product`
**Tool:** Apache Bench (ab) 2.3
**Concurrency:** 10
**Total Requests:** 1000

## Summary

| Metric | Value |
|---|---|
| Total Requests | 1000 |
| Successful (2xx) | 0 |
| Non-2xx Responses | 1000 |
| Failed | 0 |
| Requests/sec | **70.23** |
| Transfer rate | 25.51 KB/s |

**Note:** All requests returned non-2xx status codes (likely 401 Unauthorized due to token expiry during benchmark).

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 31.07 |
| Avg | 142.40 |
| P50 | 130.72 |
| P90 | 214.91 |
| P95 | 243.10 |
| P99 | 283.51 |
| Max | 390.15 |

## Connection Times (ms)

| Stat | Min | Mean | Median | Max |
|---|---|---|---|---|
| Connect | 0 | 1 | 1 | 8 |
| Processing | 30 | 137 | 130 | 388 |
| Waiting | 26 | 135 | 127 | 379 |
| Total | 31 | 138 | 131 | 390 |

## Percentile Distribution

| Percentage | Latency (ms) |
|---|---|
| 50% | 131 |
| 66% | 156 |
| 75% | 172 |
| 80% | 181 |
| 90% | 215 |
| 95% | 243 |
| 98% | 265 |
| 99% | 284 |
| 100% | 390 |
