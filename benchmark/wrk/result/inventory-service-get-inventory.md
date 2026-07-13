# Benchmark Results: Inventory Service - GET Inventory

**Date:** 2026-07-14T03:48:19.534Z
**Tool:** wrk
**Target:** `GET http://api-gateway:8888/api/inventory?skuCode=iPhone_15`
**Connections:** 10 | **Threads:** 2 | **Duration:** 10s

## Summary

| Metric | Value |
|---|---|
| Total Requests | 4717 |
| Errors | 0 |
| Requests/sec | **468.30** |
| Transfer/sec | 194.43 KB |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 1.64 |
| Avg | 28.60 |
| P50 | N/A |
| P75 | N/A |
| P90 | N/A |
| P95 | N/A |
| P99 | N/A |
| P99.9 | 292.00 |
| Max | 332.69 |

## Errors

| Type | Count |
|---|---|
| Connect | 0 |
| Read | 0 |
| Write | 0 |
| Timeout | 0 |

## Raw Output

```
Running 10s test @ http://api-gateway:8888/api/inventory?skuCode=iPhone_15
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    28.60ms   34.63ms 332.70ms   90.37%
    Req/Sec   240.00    132.15   650.00     63.08%
  Latency Distribution
     50%   17.59ms
     75%   33.68ms
     90%   61.93ms
     99%  187.66ms
  4717 requests in 10.07s, 1.91MB read
  Non-2xx or 3xx responses: 4717
Requests/sec:    468.30
Transfer/sec:    194.43KB
─────────────────────────────────────────────────
  Requests/sec:   468.30
  Transfer/sec:   194.43 KB
  Total Requests: 4717
  Total Errors:   0 (connect: 0, read: 0, write: 0, timeout: 0)
─────────────────────────────────────────────────
  Latency Distribution (ms)
─────────────────────────────────────────────────
  P50.0      17.59
  P75.0      33.68
  P90.0      61.93
  P95.0      92.39
  P99.0     187.66
  P99.9     292.00
─────────────────────────────────────────────────
  Latency (ms)
─────────────────────────────────────────────────
  Min        1.64
  Avg       28.60
  Max      332.69
─────────────────────────────────────────────────
  Status Codes
─────────────────────────────────────────────────
  Total: 4717
  Errors: 0
─────────────────────────────────────────────────

```
