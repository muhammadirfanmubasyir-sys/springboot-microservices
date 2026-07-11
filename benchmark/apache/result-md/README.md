# Benchmark Results - Markdown

Formatted benchmark results in Markdown format for easy reading and sharing.

## Overview

These results were generated using **Apache Bench (ab) 2.3** with the following configuration:

- **Target:** API Gateway at `http://api-gateway:8888`
- **Concurrency:** 10 simultaneous connections
- **Requests:** 1000 per endpoint
- **Authentication:** OAuth2 Bearer token from Keycloak

## Files

| File | Endpoint | Method | Description |
|---|---|---|---|
| `summary.md` | All | - | Combined results for all endpoints |
| `product-service-get-all-products.md` | `/api/product` | GET | List all products |
| `product-service-post-create-product.md` | `/api/product` | POST | Create a new product |
| `order-service-post-create-order.md` | `/api/order` | POST | Place a new order |

## Metrics Included

Each result file contains the following sections:

### Summary

| Metric | Description |
|---|---|
| Total Requests | Number of requests sent |
| Successful (2xx) | Requests with 2xx status codes |
| Non-2xx Responses | Requests with non-2xx status codes |
| Failed | Requests that failed (connection errors, etc.) |
| Requests/sec | Throughput (total requests / time) |
| Transfer rate | Data received per second |

### Latency (ms)

| Metric | Description |
|---|---|
| Min | Minimum response time |
| Avg | Average response time |
| P50 | Median (50th percentile) |
| P90 | 90th percentile |
| P95 | 95th percentile (tail latency) |
| P99 | 99th percentile (worst case) |
| Max | Maximum response time |

### Connection Times (ms)

| Metric | Description |
|---|---|
| Connect | Time to establish TCP connection |
| Processing | Time from request sent to first byte received |
| Waiting | Time waiting for first byte (excludes connect) |
| Total | Total request time |

### Percentile Distribution

| Percentage | Latency threshold |
|---|---|
| 50% | Median latency |
| 66% | 66th percentile |
| 75% | 75th percentile |
| 80% | 80th percentile |
| 90% | 90th percentile |
| 95% | 95th percentile |
| 98% | 98th percentile |
| 99% | 99th percentile |
| 100% | Maximum latency |

## Quick Comparison

| Endpoint | RPS | Avg Latency | P50 | P90 | P95 | P99 | Max |
|---|---|---|---|---|---|---|---|
| GET /api/product | 24.60 | 406.51 ms | 382.93 ms | 517.37 ms | 586.29 ms | 920.37 ms | 1144.05 ms |
| POST /api/product | 70.23 | 142.40 ms | 130.72 ms | 214.91 ms | 243.10 ms | 283.51 ms | 390.15 ms |
| POST /api/order | 72.53 | 137.87 ms | 113.66 ms | 216.17 ms | 264.80 ms | 478.42 ms | 788.60 ms |

## Notes

- **POST benchmarks** show `Non-2xx responses: 1000` because ab does not support OAuth2 token refresh. The JWT token expired during the test, causing 401 Unauthorized responses.
- For accurate authentication benchmarks, use the Node.js (`mjs`) or `autocannon` tools which auto-refresh tokens.
- The latency metrics are still valid for measuring gateway overhead and network performance.

## Related Files

- Raw CSV/TSV data: [`../result-csv-tsv/`](../result-csv-tsv/)
- Benchmark tool: [`../README.md`](../README.md)