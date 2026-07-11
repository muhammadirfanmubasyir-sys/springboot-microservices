# Benchmark

HTTP load testing tool for the microservices API Gateway. Uses Node.js native `http` module (zero dependencies) to measure throughput and latency under concurrent load.

## Tool

- **Runtime:** Node.js (>= 18)
- **Dependencies:** None (uses built-in `node:http`, `node:fs`, `node:path`)
- **Auth:** Automatically fetches OAuth2 Bearer token from Keycloak before each test (client credentials grant)

## Prerequisites

1. Docker Compose services running (`docker-compose up -d`)
2. **Node.js >= 18** (no npm install needed -- uses only built-in modules)
3. Keycloak accessible at the configured URL

## Quick Start

From the project root:

```bash
node benchmark/mjs/benchmark.mjs
```

Or from the benchmark/mjs directory:

```bash
cd benchmark/mjs
node benchmark.mjs
```

Results are written as Markdown files to the `benchmark/mjs/` directory.

## Configuration

Edit the `.env` file in the `benchmark/mjs/` directory:

```env
KEYCLOAK_URL=http://keycloak:8080
REALM=spring-boot-micro-services-realm
CLIENT_ID=spring-cloud-client
CLIENT_SECRET=sI7ShfpTE5Eaw10UYkS0j6lVCsPjxjFK
TARGET_HOST=api-gateway
TARGET_PORT=8888
CONCURRENCY=10
DURATION_SEC=10
```

| Variable | Description | Default |
|---|---|---|
| `KEYCLOAK_URL` | Keycloak server URL | `http://keycloak:8080` |
| `REALM` | Keycloak realm name | `spring-boot-micro-services-realm` |
| `CLIENT_ID` | OAuth2 client ID | `spring-cloud-client` |
| `CLIENT_SECRET` | OAuth2 client secret | *(empty)* |
| `TARGET_HOST` | API Gateway hostname | `api-gateway` |
| `TARGET_PORT` | API Gateway port | `8888` |
| `CONCURRENCY` | Number of concurrent HTTP workers | `10` |
| `DURATION_SEC` | How long each benchmark runs (seconds) | `10` |

## Adding a New Endpoint

Add a new `benchmark()` call in the `main()` function:

```js
allResults.push(
  await benchmark(
    "My Service - POST Endpoint Name",   // Display name
    "POST",                               // HTTP method
    "/api/my-endpoint",                   // Path
    { key: "value" }                      // Request body (omit for GET)
  )
);
```

## Metrics Collected

| Metric | Description |
|---|---|
| Requests/sec | Total requests divided by elapsed time |
| Avg Latency | Mean response time |
| Min/Max Latency | Fastest and slowest response |
| P50 Latency | Median (50th percentile) |
| P95 Latency | 95th percentile (tail latency) |
| P99 Latency | 99th percentile (worst case) |
| Status Codes | Distribution of HTTP status codes |

## Output Files

| File | Description |
|---|---|
| `summary.md` | Combined results for all endpoints |
| `product-service-get-all-products.md` | GET /api/product results |
| `product-service-post-create-product.md` | POST /api/product results |
| `order-service-post-create-order.md` | POST /api/order results |

## Environment-Specific URLs

When running locally vs in Docker, update `TARGET_HOST` and `KEYCLOAK_URL`:

| Environment | TARGET_HOST | KEYCLOAK_URL |
|---|---|---|
| Docker Compose | `api-gateway` | `http://keycloak:8080` |
| Local (no Docker) | `localhost` | `http://localhost:8080` |

## Example Output

```
============================================================
  Benchmarking: Product Service - GET All Products
  GET http://api-gateway:8888/api/product
  Concurrency: 10 | Duration: 10s
============================================================

  Results:
  ─────────────────────────────────────────
  Total Requests:     716
  Successful:         716
  Errors:             0
  Requests/sec:       66.27
  Avg Latency:        149.31 ms
  Min Latency:        32.70 ms
  Max Latency:        519.21 ms
  P50 Latency:        141.41 ms
  P95 Latency:        287.09 ms
  P99 Latency:        413.39 ms
  Status Codes:       {"200":716}
  Actual Duration:    10.80s
  ─────────────────────────────────────────
```
