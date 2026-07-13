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

---

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

---

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

---

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
