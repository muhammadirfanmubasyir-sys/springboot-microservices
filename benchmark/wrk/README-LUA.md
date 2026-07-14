# How benchmark.mjs and wrk-auth.lua Work Together

`benchmark.mjs` (Node.js) and `wrk-auth.lua` (Lua) collaborate to run authenticated HTTP benchmarks.

## Roles

**`benchmark.mjs`** — the orchestrator:
1. Loads `.env` config
2. Fetches OAuth2 token from Keycloak via HTTP
3. Writes the token to a temp file (`.wrk-token-*.txt`)
4. Spawns `wrk` via WSL with `-s wrk-auth.lua`
5. Parses wrk output → writes `.md` result files

**`wrk-auth.lua`** — runs *inside* wrk:
1. Reads the token from the temp file (created by benchmark.mjs)
2. Injects `Authorization: Bearer <token>` into every request
3. Formats latency distribution output

## The Bridge

The temp file (`.wrk-token-*.txt`) is the bridge between the two. benchmark.mjs writes the token, wrk-auth.lua reads it.

This pattern is needed because wrk has no native OAuth2 support — the Lua script handles auth injection.

## Flow Diagram

```
benchmark.mjs                    wrk-auth.lua
     |                                |
     |-- fetchToken()                 |
     |-- write .wrk-token-xxx.txt --->|-- init() reads token
     |                                |
     |-- execSync("wrk -s wrk-auth.lua")
     |       |                        |
     |       +---- wrk runs --------->|-- request() sends HTTP
     |                                |   with Bearer header
     |       <---- wrk output --------+
     |                                |
     |-- parseWrkOutput()             |-- done() prints stats
     +-- write result/*.md            |
```

## Why Lua?

wrk uses LuaJIT for extensibility. The Lua script can:
- Modify request headers, method, and body (`request()` function)
- Inspect responses (`response()` function)
- Print custom output after the test (`done()` function)
- Access wrk stats (latency, throughput, errors)

Without Lua, wrk cannot inject OAuth2 Bearer tokens.

## Token Lifecycle

1. benchmark.mjs calls Keycloak `/token` endpoint
2. Receives `{ access_token: "eyJ..." }`
3. Writes raw token string to `.wrk-token-<timestamp>.txt`
4. wrk starts, loads `wrk-auth.lua`
5. `init()` in Lua reads the temp file, sets `wrk.headers["Authorization"]`
6. Every `request()` sent by wrk includes the Bearer token
7. benchmark.mjs deletes the temp file after wrk finishes
