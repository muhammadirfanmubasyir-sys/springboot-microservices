# Benchmark Results: Product Service - GET All Products

**Date:** 2026-07-14T03:47:46.681Z
**Tool:** wrk
**Target:** `GET http://api-gateway:8888/api/product`
**Connections:** 10 | **Threads:** 2 | **Duration:** 10s

## Summary

| Metric | Value |
|---|---|
| Total Requests | 4148 |
| Errors | 0 |
| Requests/sec | **411.57** |
| Transfer/sec | 170.89 KB |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 1.08 |
| Avg | 56.66 |
| P50 | N/A |
| P75 | N/A |
| P90 | N/A |
| P95 | N/A |
| P99 | N/A |
| P99.9 | 792.38 |
| Max | 818.62 |

## Errors

| Type | Count |
|---|---|
| Connect | 0 |
| Read | 0 |
| Write | 0 |
| Timeout | 0 |

## Raw Output

```
Running 10s test @ http://api-gateway:8888/api/product
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    56.66ms  113.56ms 818.62ms   92.41%
    Req/Sec   230.62    184.72     0.91k    77.14%
  Latency Distribution
     50%   17.98ms
     75%   47.51ms
     90%  128.63ms
     99%  670.67ms
  4148 requests in 10.08s, 1.68MB read
  Non-2xx or 3xx responses: 4148
Requests/sec:    411.57
Transfer/sec:    170.89KB
─────────────────────────────────────────────────
  Requests/sec:   411.57
  Transfer/sec:   170.89 KB
  Total Requests: 4148
  Total Errors:   0 (connect: 0, read: 0, write: 0, timeout: 0)
─────────────────────────────────────────────────
  Latency Distribution (ms)
─────────────────────────────────────────────────
  P50.0      17.98
  P75.0      47.51
  P90.0     128.63
  P95.0     259.54
  P99.0     670.67
  P99.9     792.38
─────────────────────────────────────────────────
  Latency (ms)
─────────────────────────────────────────────────
  Min        1.08
  Avg       56.66
  Max      818.62
─────────────────────────────────────────────────
  Status Codes
─────────────────────────────────────────────────
  Total: 4148
  Errors: 0
─────────────────────────────────────────────────

```
