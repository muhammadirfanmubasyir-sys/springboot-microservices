# Benchmark Results: Product Service - POST Create Product

**Date:** 2026-07-14T03:47:57.932Z
**Tool:** wrk
**Target:** `POST http://api-gateway:8888/api/product`
**Connections:** 10 | **Threads:** 2 | **Duration:** 10s

## Summary

| Metric | Value |
|---|---|
| Total Requests | 2321 |
| Errors | 0 |
| Requests/sec | **229.79** |
| Transfer/sec | 95.41 KB |

## Latency (ms)

| Percentile | Value |
|---|---|
| Min | 2.77 |
| Avg | 59.14 |
| P50 | N/A |
| P75 | N/A |
| P90 | N/A |
| P95 | N/A |
| P99 | N/A |
| P99.9 | 544.06 |
| Max | 583.48 |

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
    Latency    59.14ms   70.43ms 583.47ms   89.78%
    Req/Sec   118.80     75.23   410.00     66.49%
  Latency Distribution
     50%   35.88ms
     75%   69.79ms
     90%  131.04ms
     99%  378.36ms
  2321 requests in 10.10s, 0.94MB read
  Non-2xx or 3xx responses: 2321
Requests/sec:    229.79
Transfer/sec:     95.41KB
─────────────────────────────────────────────────
  Requests/sec:   229.79
  Transfer/sec:   95.41 KB
  Total Requests: 2321
  Total Errors:   0 (connect: 0, read: 0, write: 0, timeout: 0)
─────────────────────────────────────────────────
  Latency Distribution (ms)
─────────────────────────────────────────────────
  P50.0      35.88
  P75.0      69.79
  P90.0     131.03
  P95.0     193.97
  P99.0     378.36
  P99.9     544.06
─────────────────────────────────────────────────
  Latency (ms)
─────────────────────────────────────────────────
  Min        2.77
  Avg       59.14
  Max      583.48
─────────────────────────────────────────────────
  Status Codes
─────────────────────────────────────────────────
  Total: 2321
  Errors: 0
─────────────────────────────────────────────────

```
