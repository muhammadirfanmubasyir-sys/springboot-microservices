# Benchmark - JMeter

HTTP load testing using [Apache JMeter](https://jmeter.apache.org/) -- a Java-based load testing tool for measuring performance.

## Tool

- **Runtime:** Java 8+ (JMeter 5.6.3)
- **Dependencies:** Apache JMeter (auto-downloaded on first run)
- **Auth:** Automatically fetches OAuth2 Bearer token from Keycloak before each test

## Prerequisites

1. Docker Compose services running (`docker-compose up -d`)
2. **Java 8+** installed (`java -version` to verify)
3. No npm install needed

## Quick Start

```bash
cd benchmark/jmeter

# Option 1: Generate JMX plans + run benchmarks
node run-benchmarks.mjs

# Option 2: Run existing JMX plans from plans/ folder
node run.mjs
```

## Configuration

Edit the `.env` file in this directory:

```env
KEYCLOAK_URL=http://keycloak:8080
REALM=spring-boot-micro-services-realm
CLIENT_ID=spring-cloud-client
CLIENT_SECRET=<your-client-secret>
TARGET_HOST=api-gateway
TARGET_PORT=8888
CONCURRENCY=10
DURATION_SEC=10
RAMP_UP_SEC=2
```

| Variable | Description | Default |
|---|---|---|
| `KEYCLOAK_URL` | Keycloak server URL | `http://keycloak:8080` |
| `REALM` | Keycloak realm name | `spring-boot-micro-services-realm` |
| `CLIENT_ID` | OAuth2 client ID | `spring-cloud-client` |
| `CLIENT_SECRET` | OAuth2 client secret | *(empty)* |
| `TARGET_HOST` | API Gateway hostname | `api-gateway` |
| `TARGET_PORT` | API Gateway port | `8888` |
| `CONCURRENCY` | Number of concurrent threads | `10` |
| `DURATION_SEC` | Test duration in seconds | `10` |
| `RAMP_UP_SEC` | Thread ramp-up period | `2` |

## Adding a New Endpoint

Edit `benchmark.jmx` and add a new ThreadGroup + HTTPSamplerProxy block, or add a new entry in `run-benchmarks.mjs`:

```js
{
  name: "My Service - GET Endpoint",
  method: "GET",
  path: "/api/my-endpoint",
  jtl: "get-my-endpoint.jtl",
}
```

## Output Files

| Path | Description |
|---|---|
| `md/summary.md` | Combined Markdown results for all endpoints |
| `html/summary.html` | Combined HTML results with styled table |
| `md/*.md` | Individual Markdown results per endpoint |
| `html/*.html` | Individual HTML results per endpoint |
| `charts-graphs/*/index.html` | JMeter HTML dashboard with charts & graphs per endpoint |
| `results/*.jtl` | Raw JMeter CSV result files |
| `logs/*.log` | JMeter log files |
| `plans/*.jmx` | Auto-generated test plans (from `run-benchmarks.mjs`) |

## Metrics Collected

| Metric | Description |
|---|---|
| Requests/sec | Total requests divided by elapsed time |
| Avg Latency | Mean response time |
| P50 Latency | Median (50th percentile) |
| P90 Latency | 90th percentile |
| P95 Latency | 95th percentile (tail latency) |
| P99 Latency | 99th percentile (worst case) |
| Max Latency | Slowest response |
| Throughput | Data transferred per second (MB/s) |
| Status Codes | Distribution of HTTP status codes |

## Running JMeter Manually

```bash
# Set JMETER_HOME if JMeter is not in default location
set JMETER_HOME=C:\apache-jmeter-5.6.3

# Run the test plan
%JMETER_HOME%\bin\jmeter.bat -n -t benchmark.jmx -Jconcurrency=10 -Jduration=10 -l results/output.jtl
```

## Comparison with Other Tools

| Feature | JMeter | mjs | autocannon |
|---|---|---|---|
| Runtime | Java | Node.js | Node.js |
| Dependencies | None (auto-download) | None | npm |
| GUI Mode | Yes | No | No |
| Distributed Testing | Yes | No | No |
| Protocol Support | HTTP, JDBC, JMS, etc. | HTTP only | HTTP only |
| Result Formats | CSV, XML, HTML | Markdown | JSON, Markdown |

## Cleanup

To remove generated files:

```bash
rm -rf results/*.jtl *.md *.html *.log
```
