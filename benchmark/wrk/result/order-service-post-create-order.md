# Benchmark Results: Order Service - POST Create Order

**Date:** 2026-07-14T03:48:08.771Z
**Tool:** wrk
**Target:** `POST http://api-gateway:8888/api/order`
**Connections:** 10 | **Threads:** 2 | **Duration:** 10s

## Summary

| Metric | Value |
|---|---|
| Total Requests | 3832 |
| Errors | 0 |
| Requests/sec | **379.47** |
| Transfer/sec | 157.55 KB |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 2.17 |
| Avg | 34.54 |
| P50 | N/A |
| P75 | N/A |
| P90 | N/A |
| P95 | N/A |
| P99 | N/A |
| P99.9 | 447.78 |
| Max | 503.74 |

## Errors

| Type | Count |
|---|---|
| Connect | 0 |
| Read | 0 |
| Write | 0 |
| Timeout | 0 |

## Raw Output

```
Running 10s test @ http://api-gateway:8888/api/order
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    34.54ms   44.25ms 503.73ms   92.57%
    Req/Sec   192.30     88.47   440.00     68.69%
  Latency Distribution
     50%   22.67ms
     75%   39.41ms
     90%   66.49ms
     99%  251.40ms
  3832 requests in 10.10s, 1.55MB read
  Non-2xx or 3xx responses: 3832
Requests/sec:    379.47
Transfer/sec:    157.55KB
─────────────────────────────────────────────────
  Requests/sec:   379.47
  Transfer/sec:   157.55 KB
  Total Requests: 3832
  Total Errors:   0 (connect: 0, read: 0, write: 0, timeout: 0)
─────────────────────────────────────────────────
  Latency Distribution (ms)
─────────────────────────────────────────────────
  P50.0      22.67
  P75.0      39.41
  P90.0      66.49
  P95.0     101.59
  P99.0     251.40
  P99.9     447.78
─────────────────────────────────────────────────
  Latency (ms)
─────────────────────────────────────────────────
  Min        2.17
  Avg       34.54
  Max      503.74
─────────────────────────────────────────────────
  Status Codes
─────────────────────────────────────────────────
  Total: 3832
  Errors: 0
─────────────────────────────────────────────────

```
