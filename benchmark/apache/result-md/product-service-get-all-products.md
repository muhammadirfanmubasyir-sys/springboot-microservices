# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-11
**Target:** `GET http://api-gateway:8888/api/product`
**Tool:** Apache Bench (ab) 2.3
**Concurrency:** 10
**Total Requests:** 1000

## Summary

| Metric | Value |
|---|---|
| Total Requests | 1000 |
| Successful (2xx) | 1000 |
| Failed | 0 |
| Requests/sec | **24.60** |
| Transfer rate | 20888.55 KB/s |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 84.94 |
| Avg | 406.51 |
| P50 | 382.93 |
| P90 | 517.37 |
| P95 | 586.29 |
| P99 | 920.37 |
| Max | 1144.05 |

## Connection Times (ms)

| Stat | Min | Mean | Median | Max |
|---|---|---|---|---|
| Connect | 0 | 1 | 1 | 5 |
| Processing | 85 | 403 | 381 | 1143 |
| Waiting | 70 | 350 | 331 | 1065 |
| Total | 85 | 404 | 383 | 1144 |

## Percentile Distribution

| Percentage | Latency (ms) |
|---|---|
| 50% | 383 |
| 66% | 420 |
| 75% | 443 |
| 80% | 463 |
| 90% | 517 |
| 95% | 586 |
| 98% | 746 |
| 99% | 920 |
| 100% | 1144 |
