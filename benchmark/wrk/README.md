# Benchmark (wrk)

HTTP load testing tool for the microservices API Gateway using [wrk](https://github.com/wg/wrk). Measures throughput and latency under concurrent load with OAuth2 Bearer token authentication.

## Tool

- **Runtime:** wrk + Node.js (>= 18)
- **Auth:** Automatically fetches OAuth2 Bearer token from Keycloak before each test (client credentials grant)
- **Scripting:** Custom Lua script (`wrk-auth.lua`) handles Authorization header injection

## Prerequisites

1. Docker Compose services running (`docker-compose up -d`)
2. **wrk** installed and available in PATH
3. **Node.js >= 18** (for the runner script)
4. Keycloak accessible at the configured URL

### Installing wrk

> **Note:** wrk does not have native Windows support. Use WSL or Docker on Windows.

**macOS:**
```bash
brew install wrk
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y wrk
```

**Windows (WSL) — Recommended:**
```powershell
# Enable WSL (requires admin PowerShell)
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart, then install Ubuntu
wsl --install -d Ubuntu

# Inside WSL Ubuntu
sudo apt-get update
sudo apt-get install -y wrk
```

**Windows (Docker):**
```bash
docker run --rm williamyeh/wrk -t2 -c10 -d10s http://host.docker.internal:8888/api/product
```

**Build from source (Linux/macOS):**
```bash
sudo apt-get install -y build-essential libssl-dev git   # Debian/Ubuntu
# OR: sudo yum groupinstall -y "Development Tools"       # CentOS/RHEL

git clone https://github.com/wg/wrk.git
cd wrk
make -j$(nproc)
sudo cp wrk /usr/local/bin/
```

### Verify Installation

```bash
wrk --version
```

## Quick Start

From the project root:

```bash
node benchmark/wrk/benchmark.mjs
```

Or from the benchmark/wrk directory:

```bash
cd benchmark/wrk
node benchmark.mjs
```

Results are written as Markdown files to the `benchmark/wrk/result/` directory.

## Running wrk Directly (No Authentication)

If your API does not require authentication (or auth is disabled for testing), you can run wrk directly without `benchmark.mjs`.

### Basic GET Request

```bash
# Linux/macOS
wrk -t2 -c10 -d10s --latency http://localhost:8888/api/product

# Windows (WSL)
wsl -d Ubuntu-24.04 -- wrk -t2 -c10 -d10s --latency http://localhost:8888/api/product
```

### POST Request with Body

Create a Lua script for POST requests:

```lua
-- post.lua
wrk.method = "POST"
wrk.body   = '{"name":"Product","description":"Test","price":9.99}'
wrk.headers["Content-Type"] = "application/json"
```

```bash
wrk -t2 -c10 -d10s --latency -s post.lua http://localhost:8888/api/product
```

### With Custom Headers

```bash
wrk -t2 -c10 -d10s --latency \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:8888/api/product
```

### wrk Command Reference

| Flag | Description | Example |
|---|---|---|
| `-t` | Number of threads | `-t2` (2 threads) |
| `-c` | Number of connections (concurrency) | `-c100` (100 concurrent requests) |
| `-d` | Duration | `-d30s` (30 seconds), `-d5m` (5 minutes) |
| `-s` | Lua script file | `-s post.lua` |
| `-H` | Add HTTP header | `-H "Authorization: Bearer token"` |
| `--latency` | Print detailed latency stats | |
| `--timeout` | Socket/request timeout | `--timeout 10s` |
| `-v` | Print version | |

### Concurrency: Threads vs Connections

`-c` (connections) is the total number of concurrent HTTP requests. `-t` (threads) is how many threads split those connections.

```
-c100 -t2   → 100 concurrent connections, 2 threads (50 each)
-c50  -t10  → 50 concurrent connections, 10 threads (5 each)
-c200 -t4   → 200 concurrent connections, 4 threads (50 each)
```

**Rule of thumb:** Set `-t` to match your CPU cores, and `-c` to the concurrency level you want to test.

### Quick Test Examples

```bash
# Light load (2 threads, 10 connections, 10 seconds)
wrk -t2 -c10 -d10s --latency http://localhost:8888/api/product

# Medium load (4 threads, 50 connections, 30 seconds)
wrk -t4 -c50 -d30s --latency http://localhost:8888/api/product

# Heavy load (8 threads, 200 connections, 60 seconds)
wrk -t8 -c200 -d60s --latency http://localhost:8888/api/product

# Custom timeout (5 second timeout per request)
wrk -t2 -c10 -d10s --latency --timeout 5s http://localhost:8888/api/product
```

> **Note:** wrk output goes to stdout. Redirect to a file if needed:
> ```bash
> wrk -t2 -c10 -d10s --latency http://localhost:8888/api/product > result.txt
> ```

## Configuration

Edit the `.env` file in the `benchmark/wrk/` directory:

```env
KEYCLOAK_URL=http://keycloak:8080
REALM=spring-boot-micro-services-realm
CLIENT_ID=spring-cloud-client
CLIENT_SECRET=sI7ShfpTE5Eaw10UYkS0j6lVCsPjxjFK
TARGET_HOST=api-gateway
TARGET_PORT=8888
CONNECTIONS=10
THREADS=2
DURATION_SEC=10
WSL_DISTRO=Ubuntu-24.04
```

| Variable | Description | Default |
|---|---|---|
| `KEYCLOAK_URL` | Keycloak server URL | `http://keycloak:8080` |
| `REALM` | Keycloak realm name | `spring-boot-micro-services-realm` |
| `CLIENT_ID` | OAuth2 client ID | `spring-cloud-client` |
| `CLIENT_SECRET` | OAuth2 client secret | *(empty)* |
| `TARGET_HOST` | API Gateway hostname | `api-gateway` |
| `TARGET_PORT` | API Gateway port | `8888` |
| `CONNECTIONS` | Number of HTTP connections | `10` |
| `THREADS` | Number of threads | `2` |
| `DURATION_SEC` | How long each benchmark runs (seconds) | `10` |
| `WSL_DISTRO` | WSL distribution name for wrk | `Ubuntu-24.04` |

## Adding a New Endpoint

Add a new `runBenchmark()` call in the `main()` function:

```js
allResults.push(
  await runBenchmark(
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
| Transfer/sec | Data transfer rate in KB |
| Min Latency | Fastest response |
| Avg Latency | Mean response time |
| P50 Latency | Median (50th percentile) |
| P75 Latency | 75th percentile |
| P90 Latency | 90th percentile |
| P95 Latency | 95th percentile (tail latency) |
| P99 Latency | 99th percentile (worst case) |
| P99.9 Latency | 99.9th percentile |
| Max Latency | Slowest response |
| Error Counts | Connect, read, write, timeout errors |

## Output Files

All results are written to `benchmark/wrk/result/`:

| File | Description |
|---|---|
| `result/summary.md` | Combined results for all endpoints |
| `result/product-service-get-all-products.md` | GET /api/product results |
| `result/product-service-post-create-product.md` | POST /api/product results |
| `result/order-service-post-create-order.md` | POST /api/order results |
| `result/inventory-service-get-inventory.md` | GET /api/inventory results |

## Architecture

```
benchmark/wrk/
├── .env                  # Environment configuration
├── .env.example          # Configuration template
├── benchmark.mjs         # Node.js runner script
├── wrk-auth.lua          # wrk Lua script (auth + output formatting)
├── README.md             # This file
└── result/               # Benchmark results (generated)
    ├── summary.md
    ├── product-service-get-all-products.md
    ├── product-service-post-create-product.md
    ├── order-service-post-create-order.md
    └── inventory-service-get-inventory.md
```

**Flow:**
1. `benchmark.mjs` fetches OAuth2 token from Keycloak
2. Token is written to a temp file for wrk Lua script
3. `wrk` executes with custom Lua script that injects the Bearer token
4. Output is parsed and converted to Markdown
5. Individual and summary `.md` files are written

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
  Connections: 10 | Threads: 2 | Duration: 10s
============================================================

  Running 10s test @ http://api-gateway:8888/api/product
  2 threads and 10 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    142.31ms   89.42ms 512.67ms   72.34%
    Req/Sec    36.82      12.05    62.00     68.50%
  Latency Distribution
     50%  128.45ms
     75%  178.23ms
     90%  256.89ms
     95%  312.45ms
     99%  423.67ms
  368 requests in 10.01s, 58.23KB read
  Requests/sec:   36.76
  Transfer/sec:    5.82KB
─────────────────────────────────────────────────
  Requests/sec:   36.76
  Transfer/sec:    5.82 KB
  Total Requests: 368
  Total Errors:   0 (connect: 0, read: 0, write: 0, timeout: 0)
─────────────────────────────────────────────────
```
