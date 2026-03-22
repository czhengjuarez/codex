# Rust Domain

Rules for writing safe, idiomatic, performant Rust.

---

## When to Use What

### Panic & Error Observability

| Need | Requirement |
|------|-------------|
| Track panics in a Rust service | **MUST** install a panic hook as the first line in `fn main()` to emit a `panics_total` metric — use [define yours] |
| Track error-reporting events (e.g., Sentry) in a Rust service | **SHOULD** install an error-reporting hook — use [define yours] |
| Use a telemetry/foundations framework that manages hooks automatically | No changes required — hooks are already installed |
| Build a Rust service without an opinionated framework | **MUST** install the panic hook explicitly as the first line in `fn main()` |
| Use `catch_unwind` in a Rust service | **SHOULD** review usage — handled panics may still be reported as unhandled depending on hook implementation |
| Write a panic hook | **MUST** avoid triggering panics within the hook itself — a panic inside a panic hook will abort the process |
| Panics may occur on a hot code path | **SHOULD** ensure panic reporting is rate-limited to avoid overwhelming metrics and error-reporting infrastructure |

### Async Runtime

| Need | Use |
|------|-----|
| Async runtime for a new service | [define yours] |
| Mix async runtimes across crates | Requires explicit justification — [define yours] |

### Error Handling Libraries

| Context | Use |
|---------|-----|
| Library crate (callers need typed error variants) | `thiserror` |
| Application/binary crate (context and propagation) | `anyhow` |

### Testing & Benchmarking

| Need | Use |
|------|-----|
| Unit and integration tests | `cargo test` — [define yours] for conventions |
| Benchmarking | [define yours] (e.g., `criterion`, `divan`) |
| Profiling in production | [define yours] (e.g., `flamegraph`, `perf`) |

### Toolchain & CI

| Need | Use |
|------|-----|
| Rust toolchain version | Pin via `rust-toolchain.toml` — [define yours] for MSRV policy |
| Linting in CI | `cargo clippy -- -D warnings` at minimum |
| Formatting | `cargo fmt --check` in CI |
| Dependency auditing | [define yours] (e.g., `cargo audit`) |

### Anti-Patterns

| Bad | Why | Instead |
|-----|-----|---------|
| `unwrap()` in production code | Panics on `None`/`Err` — availability incident | Use `?` operator; `expect("reason")` when panic is intentional |
| `unsafe` without a `// SAFETY:` comment | Reviewer cannot assess soundness | Document why it's necessary and why it's sound |
| Shared `Arc<Mutex<T>>` as default | Deadlocks, contention, hard to reason about | Prefer channels; use mutex only when shared mutable state is required |
| No `Cargo.lock` for a binary | Non-reproducible builds in CI and production | Commit `Cargo.lock` for binaries |
| `Cargo.lock` committed for a library | Downstream consumers resolve their own tree | Do not commit `Cargo.lock` for library crates |
| Panic hook installed after other initialization | Panics during startup are untracked | Install panic hook as the **first** line in `fn main()` |
| Fixed-interval retries | Retry storms under load | Exponential backoff with jitter |
| [define yours] | [define yours] | [define yours] |

---

### RUST-001: Prefer `?` operator over explicit `unwrap()` in production code


**Rule**: Use the `?` operator to propagate errors in production code. Reserve `unwrap()` and `expect()` for tests, prototypes, or cases where a panic is genuinely the correct response to an invariant violation.

**Rationale**: `unwrap()` on `None` or `Err` causes a panic that brings down the thread or process. `?` propagates errors to the caller, enabling proper handling. In long-running services, panics are availability incidents.

**Good example**:
```rust
fn read_config(path: &Path) -> Result<Config, ConfigError> {
    let contents = fs::read_to_string(path)?;
    let config = toml::from_str(&contents)?;
    Ok(config)
}
```

**Bad example**:
```rust
fn read_config(path: &Path) -> Config {
    let contents = fs::read_to_string(path).unwrap(); // panics if file missing
    toml::from_str(&contents).unwrap()                // panics if parse fails
}
```

**Notes**: `expect("message")` is preferred over bare `unwrap()` when a panic is intentional — the message aids debugging. Document why the panic is safe.


### RUST-002: Use `thiserror` for library errors, `anyhow` for application errors


**Rule**: Define error types with `thiserror` in library crates to give callers typed error variants. Use `anyhow` in application/binary crates where error context and propagation matter more than type exhaustiveness.

**Rationale**: Library callers need to `match` on error variants — `thiserror` makes this ergonomic. Applications care more about context and traceability — `anyhow` adds error chaining with minimal boilerplate.

**Good example**:
```rust
// Library crate
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ParseError {
    #[error("invalid header: {0}")]
    InvalidHeader(String),
    #[error("unexpected EOF at byte {0}")]
    UnexpectedEof(usize),
}
```

```rust
// Application crate
use anyhow::{Context, Result};

fn load_config(path: &Path) -> Result<Config> {
    let text = fs::read_to_string(path)
        .with_context(|| format!("failed to read config from {}", path.display()))?;
    Ok(toml::from_str(&text)?)
}
```


### RUST-003: Avoid `unsafe` without justification and review


**Rule**: Every `unsafe` block must have a comment explaining why it is necessary and why it is sound. All `unsafe` code must be reviewed by at least one engineer familiar with Rust's safety invariants.

**Rationale**: `unsafe` bypasses Rust's memory safety guarantees. Unsound `unsafe` code causes undefined behavior that is often subtle, non-deterministic, and only manifests under specific conditions.

**Good example**:
```rust
// SAFETY: `ptr` is valid for `len` bytes because it was obtained from
// `Vec::as_mut_ptr()` and `len` was checked against `vec.len()` above.
let slice = unsafe { std::slice::from_raw_parts_mut(ptr, len) };
```

**Bad example**:
```rust
let slice = unsafe { std::slice::from_raw_parts_mut(ptr, len) };
// No explanation — reviewer cannot assess soundness
```


### RUST-004: Run `clippy` with deny on common lint categories in CI


**Rule**: CI pipelines must run `cargo clippy -- -D warnings` at minimum. Projects should additionally deny `clippy::pedantic` lints where appropriate and document suppressions.

**Rationale**: Clippy catches a large class of logic errors, performance anti-patterns, and idiomatic violations that the compiler does not. Running it in CI ensures the codebase stays clean.

**Good example**:
```yaml
# .github/workflows/ci.yml
- name: Clippy
  run: cargo clippy --all-targets --all-features -- -D warnings
```


### RUST-005: Use `Arc<Mutex<T>>` only when shared mutable state is necessary


**Rule**: Prefer message-passing (channels) over shared mutable state. When `Arc<Mutex<T>>` is used, document the invariants the lock protects and keep critical sections as short as possible.

**Rationale**: Shared mutable state is a common source of deadlocks and contention bugs. Channels make data flow explicit and often eliminate the need for locks entirely.

**Good example**:
```rust
// Prefer: use a channel to communicate results
let (tx, rx) = tokio::sync::mpsc::channel(32);
tokio::spawn(async move { tx.send(compute()).await.unwrap(); });
let result = rx.recv().await;
```


### RUST-006: Pin `Cargo.lock` in binaries; do not commit it for libraries


**Rule**: Commit `Cargo.lock` for binary crates and applications to ensure reproducible builds. Do not commit `Cargo.lock` for library crates — it is not used by downstream consumers.

**Rationale**: Locking binaries ensures that CI, staging, and production all use identical dependency trees. Libraries should not lock because their consumers resolve the final dependency tree.


### RUST-007: [Scaffold] Define async runtime policy (Tokio, async-std, etc.)


**Rule**: <!-- Define which async runtime is standard in your org and when mixing is permitted -->


### RUST-008: [Scaffold] Define MSRV (Minimum Supported Rust Version) policy


**Rule**: <!-- Define how MSRV is determined, documented, and updated for libraries and services -->


### RUST-009: [Scaffold] Define benchmarking and profiling standards


**Rule**: <!-- Define when benchmarks are required and which tools (criterion, divan, flamegraph) to use -->
