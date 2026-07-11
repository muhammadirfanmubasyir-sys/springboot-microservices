# Benchmark - autocannon

HTTP load testing using [autocannon](https://github.com/mcollina/autocannon) -- a fast HTTP/1.1 benchmarking tool for Node.js.

## Tool

- **Runtime:** Node.js (>= 18)
- **Dependencies:** `autocannon` (installed via npm)
- **Auth:** Automatically fetches OAuth2 Bearer token from Keycloak before each test

## Prerequisites

1. Docker Compose services running (`docker-compose up -d`)
2. Node.js >= 18 installed
3. Run `npm install` in this directory first

## Quick Start

```bash
cd benchmark/ab
npm install
node run-benchmarks.mjs
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
| `CONCURRENCY` | Number of concurrent connections | `10` |
| `DURATION_SEC` | Test duration in seconds | `10` |

## Adding a New Endpoint

Add a new entry to the `benchmarks` array in `run-benchmarks.mjs`:

```js
{
  name: "My Service - GET Endpoint",
  method: "GET",
  path: "/api/my-endpoint",
  body: null,
  contentType: null,
}
```

For POST/PUT requests with a body:

```js
{
  name: "My Service - POST Endpoint",
  method: "POST",
  path: "/api/my-endpoint",
  body: JSON.stringify({ key: "value" }),
  contentType: "application/json",
}
```

## Output Files

| File | Description |
|---|---|
| `summary.md` | Combined results for all endpoints |
| `*.json` | Raw autocannon JSON output per endpoint |
| `*.md` | Formatted markdown results per endpoint |

## Metrics Collected

| Metric | Description |
|---|---|
| Requests/sec | Total requests divided by elapsed time |
| Avg Latency | Mean response time |
| P50 Latency | Median (50th percentile) |
| P99 Latency | 99th percentile (worst case) |
| Max Latency | Slowest response |
| Throughput | Data transferred per second (MB/s) |
| Status Codes | Distribution of HTTP status codes |

## Example Output

```
┌─────────┬───────┬───────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼───────┼───────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 38 ms │ 96 ms │ 223 ms │ 293 ms │ 107.34 ms │ 55.04 ms │ 501 ms │
└─────────┴───────┴───────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg   │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Req/Sec   │ 56      │ 56      │ 81      │ 148     │ 94,1  │ 25,25   │ 56      │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────┼─────────┼─────────┤
│ Bytes/Sec │ 23.8 kB │ 23.8 kB │ 34.4 kB │ 62.9 kB │ 40 kB │ 10.7 kB │ 23.8 kB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────┴─────────┴─────────┘
```

## Cleanup

To remove npm artifacts:

```bash
rm -rf node_modules package.json package-lock.json
```
