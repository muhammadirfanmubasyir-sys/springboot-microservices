# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-11
**Target:** `POST http://api-gateway:8888/api/order`
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
| Requests/sec | **72.53** |
| Transfer rate | 26.21 KB/s |

**Note:** All requests returned non-2xx status codes (likely 401 Unauthorized due to token expiry during benchmark).

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 25.40 |
| Avg | 137.87 |
| P50 | 113.66 |
| P90 | 216.17 |
| P95 | 264.80 |
| P99 | 478.42 |
| Max | 788.60 |

## Connection Times (ms)

| Stat | Min | Mean | Median | Max |
|---|---|---|---|---|
| Connect | 0 | 1 | 1 | 10 |
| Processing | 25 | 129 | 113 | 789 |
| Waiting | 25 | 127 | 110 | 781 |
| Total | 25 | 130 | 114 | 789 |

## Percentile Distribution

| Percentage | Latency (ms) |
|---|---|
| 50% | 114 |
| 66% | 137 |
| 75% | 155 |
| 80% | 169 |
| 90% | 216 |
| 95% | 265 |
| 98% | 341 |
| 99% | 478 |
| 100% | 789 |
