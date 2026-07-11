# Benchmark - Apache Bench (ab)

HTTP load testing using [Apache Bench](http://httpd.apache.org/docs/2.4/programs/ab.html) (ab) -- a classic command-line tool for benchmarking HTTP servers.

## Tool

- **Runtime:** Apache Bench (ab) 2.3
- **Dependencies:** None (standalone executable)
- **Auth:** Requires manual token refresh (tokens expire in 5 minutes)

## Prerequisites

1. Docker Compose services running (`docker-compose up -d`)
2. Apache Bench installed and available in PATH or at known path

## Quick Start

### Get a Fresh Token

```bash
curl -X POST "http://keycloak:8080/realms/spring-boot-micro-services-realm/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=spring-cloud-client" \
  -d "client_secret=<your-secret>"
```

### Run GET Benchmark

```bash
ab -n 1000 -c 10 \
  -H "Authorization: Bearer <token>" \
  -e result-csv-tsv/get-product-percentiles.csv \
  -g result-csv-tsv/get-product-chart.tsv \
  http://api-gateway:8888/api/product
```

### Run POST Benchmark

```bash
# Create request body file
echo '{"name":"Benchmark Product","description":"Test","price":9.99}' > post-body.json

ab -n 1000 -c 10 \
  -p post-body.json \
  -T "application/json" \
  -H "Authorization: Bearer <token>" \
  -e result-csv-tsv/post-product-percentiles.csv \
  -g result-csv-tsv/post-product-chart.tsv \
  http://api-gateway:8888/api/product
```

## Configuration

Edit the `.env` file in this directory:

```env
KEYCLOAK_URL=http://keycloak:8080
REALM=spring-boot-micro-services-realm
CLIENT_ID=spring-cloud-client
CLIENT_SECRET=your-client-secret
TARGET_HOST=api-gateway
TARGET_PORT=8888
CONCURRENCY=10
REQUESTS=1000
```

| Variable | Description | Default |
|---|---|---|
| `KEYCLOAK_URL` | Keycloak server URL | `http://keycloak:8080` |
| `REALM` | Keycloak realm name | `spring-boot-micro-services-realm` |
| `CLIENT_ID` | OAuth2 client ID | `spring-cloud-client` |
| `CLIENT_SECRET` | OAuth2 client secret | *(empty)* |
| `TARGET_HOST` | API Gateway hostname | `api-gateway` |
| `TARGET_PORT` | API Gateway port | `8888` |
| `CONCURRENCY` | Number of concurrent requests | `10` |
| `REQUESTS` | Total number of requests | `1000` |

## ab Flags Reference

| Flag | Description |
|---|---|
| `-n` | Total number of requests |
| `-c` | Number of concurrent requests |
| `-H` | Add HTTP header (e.g., `Authorization: Bearer <token>`) |
| `-p` | File containing POST body data |
| `-T` | Content-Type header for POST (e.g., `application/json`) |
| `-e` | Output file for percentage percentiles (CSV) |
| `-g` | Output file for gnuplot/TSV data |

## Output Files

### Markdown Results (`result-md/`)

| File | Description |
|---|---|
| `result-md/summary.md` | Combined results for all endpoints |
| `result-md/product-service-get-all-products.md` | GET /api/product detailed results |
| `result-md/product-service-post-create-product.md` | POST /api/product detailed results |
| `result-md/order-service-post-create-order.md` | POST /api/order detailed results |

### Raw Data (`result-csv-tsv/`)

| File | Description |
|---|---|
| `result-csv-tsv/get-product-percentiles.csv` | Latency percentiles for GET /api/product |
| `result-csv-tsv/get-product-chart.tsv` | Per-request timing data for charting |
| `result-csv-tsv/post-product-percentiles.csv` | Latency percentiles for POST /api/product |
| `result-csv-tsv/post-product-chart.tsv` | Per-request timing data for charting |
| `result-csv-tsv/post-order-percentiles.csv` | Latency percentiles for POST /api/order |
| `result-csv-tsv/post-order-chart.tsv` | Per-request timing data for charting |

## Metrics Provided by ab

| Metric | Description |
|---|---|
| Requests/sec | Throughput (total requests / time) |
| Time per request | Mean latency per request |
| Transfer rate | Data received per second |
| Connection Times | Connect, processing, waiting, total times |
| Percentiles | 50%, 66%, 75%, 80%, 90%, 95%, 98%, 99%, 100% |

## Example Output

```
Concurrency Level:      10
Time taken for tests:   40.651 seconds
Complete requests:      1000
Failed requests:        0
Requests per second:    24.60 [#/sec] (mean)
Time per request:       406.509 [ms] (mean)

Percentage of the requests served within a certain time (ms)
  50%    383
  66%    420
  75%    443
  80%    463
  90%    517
  95%    586
  98%    746
  99%    920
 100%   1144 (longest request)
```

## Limitations

- **Token Expiry:** ab sends the same token for all requests. If the token expires during the benchmark, requests will return 401. Use shorter duration or refresh token before each run.
- **No Auto Token Refresh:** Unlike the Node.js benchmarks, ab does not automatically refresh tokens.
- **Single Connection Pool:** ab uses a fixed concurrency level without connection reuse optimization.
