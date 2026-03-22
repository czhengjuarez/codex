# TypeScript Domain

Standards for writing safe, maintainable TypeScript across services, libraries, and web applications.

---

## When to Use What

### Type System

| Need | Requirement |
|------|-------------|
| Write TypeScript | **MUST NOT** use `any` — use `unknown` and narrow with type guards |
| Write TypeScript | **MUST NOT** use `!` (non-null assertion) — parse into non-optional types at boundaries |
| Use `as Type` | Only in parse functions after validation — **MUST NOT** cast without validation |
| Receive external data | **MUST** parse into precise types once at system boundaries |
| Schema validation | Use a Standard Schema-compatible library — [define yours] (e.g., zod, valibot, arktype) |
| Write a parse function | **MUST** return the refined type, never `void` |
| Model domain state with multiple variants | Use discriminated unions where each variant carries exactly its required data |
| Prevent mixing semantically different values of the same primitive type | Use branded types |

### Error Handling

| Need | Approach |
|------|----------|
| Recoverable errors (validation, not found, permission denied, business rules, external service failures) | Use Result types — [define yours] (e.g., `better-result`) |
| Truly exceptional unrecoverable failures (invariant violations, missing env vars at startup) | Throw exceptions |
| Define error types | Use discriminated unions with a `_tag` discriminant for type narrowing |

### Testing

| Need | Use |
|------|-----|
| TypeScript testing framework | [define yours] (e.g., Vitest) |
| Test philosophy | Integration-heavy with minimal mocking — test behavior, not implementation |
| Property-based testing | [define yours] (e.g., `fast-check`) |
| Type-safe partial mocks | [define yours] |
| Mocking style | **SHOULD NOT** use `vi.mock()` or `jest.mock()` — inject dependencies properly instead |

### Dependency Injection

| Context | Approach |
|---------|----------|
| Simple dependency injection | Pass dependencies as function parameters |
| Group multiple dependencies | Use a context object |
| Services with many methods sharing dependencies | Use constructor injection |

### Tooling

| Need | Requirement |
|------|-------------|
| TypeScript compiler settings | **MUST** enable strict settings: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature` |
| Linting and formatting | [define yours] — prefer fast tooling (e.g., Biome, oxlint) |
| Linting configuration | Use defaults, enable strict correctness rules, avoid purely stylistic rules |

---

## Resilience

### Timeouts

| Need | Use |
|------|-----|
| Timeouts on external calls | **MUST** set timeouts — use [define yours] (e.g., `AbortSignal.timeout()` for fetch) |
| Timeout any promise | [define yours] (e.g., `p-timeout`) |
| Fallback value on timeout | [define yours] with fallback option |

### Retries

| Need | Use |
|------|-----|
| Retries with exponential backoff | **SHOULD** use jitter — [define yours] (e.g., `p-retry`) |
| Abort retries on specific errors | Throw a non-retryable error type to prevent retrying non-transient failures |
| Typed retry errors | [define yours] |

### Circuit Breakers & Graceful Degradation

| Need | Requirement |
|------|-------------|
| Call external dependencies | **SHOULD** implement circuit breakers to stop calling failing services |
| External dependency fails | **SHOULD** degrade functionality gracefully rather than fail entirely |

### Concurrency Control

| Need | Use |
|------|-----|
| Limit concurrent requests when mapping over arrays | [define yours] with a concurrency option (e.g., `p-map`) |
| Shared concurrency limit across multiple operations | [define yours] (e.g., `p-limit`) |

### Partial Success

| Need | Use |
|------|-----|
| Multiple independent operations where some failures are acceptable | `Promise.allSettled` instead of `Promise.all` |

### Cancellation

| Need | Requirement |
|------|-------------|
| Cancellation support in async functions | Accept `signal?: AbortSignal` as a parameter |
| Receive an `AbortSignal` | **MUST** propagate it through the entire call chain — never swallow |
| Loops performing async work | Call `signal?.throwIfAborted()` before I/O and between iterations |
| Resources needing cleanup on abort | Use `signal.addEventListener('abort', cleanup)` |
| Catch errors from cancellable operations | Handle `AbortError` gracefully — do not treat cancellation as a failure |
| Combine user cancellation with timeout | Use `AbortSignal.any()` to compose multiple signals |
| Fetch data in React effects | Create an `AbortController` and call `abort()` in the cleanup function |

---

## Performance

| Situation | Requirement |
|-----------|-------------|
| Validate data at the boundary | Trust types afterward — do not re-validate in hot paths |
| Use `.reduce()` to accumulate results | Mutate the accumulator instead of spreading to avoid O(n²) complexity |
| Spread arrays or objects in loops | Use `push()` or direct assignment instead |
| `await` in loops where operations are independent | Use `Promise.all` or [define yours] for parallel execution |
| `array.find()` or `array.includes()` in loops | Build a `Map` or `Set` first for O(1) lookups |
| Chain multiple array methods on large arrays | Use `flatMap` or `reduce` for single-pass processing |
| Use regex patterns in loops | Compile regex outside the loop and reuse the pattern object |

---

## Web Services

### HTTP Framework

| Need | Use |
|------|-----|
| Build an HTTP service | [define yours] |

### Architecture

| Need | Approach |
|------|----------|
| Expose services to multiple interfaces (REST, CLI, MCP) | Design with a pure core wrapped by transport shells |
| Support AI agent consumption | Expose structured interfaces via CLI, REST, RPC, or MCP shells |

### Request Validation

| Need | Use |
|------|-----|
| Validate request bodies, params, or query strings | [define yours] with schema validation |
| Custom validation error responses | Provide an error callback to the validator |

### Route Organization

| Need | Approach |
|------|----------|
| Organize routes in larger applications | Compose sub-applications or routers |
| Shared configuration across multiple apps | Use a factory pattern |

### Error Handling (HTTP)

| Need | Approach |
|------|----------|
| Signal expected HTTP errors | Throw typed HTTP exception |
| Global error handling | Use a top-level error handler to catch and format errors consistently |
| Custom 404 responses | Define a `notFound` handler |

### Anti-Patterns (HTTP)

| Bad | Why | Instead |
|-----|-----|---------|
| Access env vars via `globalThis` or untyped env | No type safety | Use typed bindings/context |
| Parse JSON manually | Trusts input | Use schema validation at the boundary |
| Mock platform bindings manually in tests | Brittle | Use platform-native test utilities |

---

## Observability

### Logging Infrastructure

| Need | Use |
|------|-----|
| Structured logging in [define yours — edge/serverless runtime] | [define yours] |
| Structured logging in Node.js | [define yours] (e.g., `pino`) |
| Tracing in [define yours — edge/serverless runtime] | [define yours] |
| Custom spans | [define yours] |
| Custom analytics or metrics | [define yours] |
| Distributed tracing in Node.js services | [define yours] (e.g., OpenTelemetry) |

### Structured Logging

| Need | Requirement |
|------|-------------|
| Log data | Log JSON objects, **not** interpolated strings |
| Request correlation | Attach request IDs, user IDs, and trace IDs to every log via child loggers |
| Log placement | Log at boundaries (HTTP handlers, queue consumers, scheduled jobs) — not inside tight loops |
| Event naming | Use `snake_case` for event names |

### Log Levels

| Situation | Level |
|-----------|-------|
| Operation fails requiring immediate attention | `fatal` |
| Operation fails with user impact requiring human attention | `error` |
| Behavior is degraded but recovered, or approaching limits | `warn` |
| Business events or audit trail | `info` |
| Internal state for troubleshooting | `debug` |

### Error Logging

| Need | Requirement |
|------|-------------|
| Error occurs | **MUST** log with full context: what failed, why, context, impact |
| Log an error | **MUST** include: event name, affected entity IDs, input parameters, error message, stack trace |
| Cannot handle an error | Log with full context and rethrow to preserve the stack |
| HTTP handlers | Implement error boundary logging to catch all unhandled errors |

### Tracing

| Need | Requirement |
|------|-------------|
| Track requests across services | Propagate trace context using W3C Trace Context format |
| Track operation timing | Use span logging with start/end events and duration |
| Call downstream services | Propagate `traceparent` header and log call start/end |

### Anti-Patterns (Observability)

| Bad | Why | Instead |
|-----|-----|---------|
| Catch errors and swallow silently | Failures become invisible | Always log with context |
| Log errors without context | Impossible to debug | Include what, why, and correlation IDs |
| Log sensitive user data | Privacy and security violation | Redact passwords, tokens, PII before logging |

---

## Anti-Patterns

| Bad | Why | Instead |
|-----|-----|---------|
| `any` type | Disables type checking entirely | `unknown` + type guard narrowing |
| `!` non-null assertion | Crashes at runtime on null | Parse into non-optional types at boundaries |
| `as Type` without validation | False type safety | Only cast after validation in parse functions |
| Re-validate inside hot paths | Wasted CPU | Validate at boundary, trust types inside |
| Fixed-interval retries | Retry storms under load | Exponential backoff with jitter |
| `Promise.all` for independent operations that can partially fail | One failure aborts all | `Promise.allSettled` |
| Ignore `AbortSignal` from callers | Operations can't be cancelled | Propagate `signal` through the call chain |
| `O(n²)` spread in loops | Performance degrades with scale | Mutate accumulator; build Map/Set upfront |
| [define yours] | [define yours] | [define yours] |
