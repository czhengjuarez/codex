# Reliability Domain

Rules for building systems that are resilient, observable, and recoverable.

---

## When to Use What

### Dependency Cataloguing

| Need | Requirement |
|------|-------------|
| Own a production service | **MUST** declare its dependencies in your service catalog using a `dependsOn` field |
| Depend on services, data sources, or infrastructure | **MUST** include them in dependency declarations |
| Require kernel-level functionality (eBPF, non-standard syscalls, kernel version constraints) | **MUST** document it in service catalog annotations |
| Produce data consumed by other services | **SHOULD** declare the data source as a catalogued resource |

### Failure State Review

| Need | Requirement |
|------|-------------|
| Dependency is security-related (auth, authorization, access control) | **MUST** fail-closed |
| Classify a dependency's failure behavior | **MUST** document current vs. desired behavior for availability, consistency, and validation failures |

### Startup Dependency Behavior

| Classification | Requirement |
|---------------|-------------|
| **Hard** startup dependency | Service **MUST** abort when that dependency is unavailable at startup |
| **Soft** startup dependency | Service **MUST** emit metrics indicating degraded startup and document unavailable features |
| **Cached** startup dependency | Cache **MUST** have a defined maximum TTL; **MUST NOT** be used for security-critical dependencies |
| Hard startup dependencies overall | **MUST** form a directed acyclic graph — no circular dependencies |

### Cascading Failure Prevention

| Need | Requirement |
|------|-------------|
| Make external calls | **MUST** set timeouts on every call |
| Have external dependencies | **SHOULD** implement circuit breakers to fail fast when dependencies are unhealthy |
| Implement circuit breakers | **MUST** emit metrics on state transitions |
| Implement retries | **SHOULD** use retry budgets (typically 10–20% of request volume) and track via metrics |

### Scope of Impact

| Need | Requirement |
|------|-------------|
| Dependency failure can cause global service impact | Changes **MUST** use a staggered rollout with health mediation |
| Changes affect hard startup dependencies | **MUST** use staggered rollout — startup failures are global scope |

### Killswitches & Manual Recovery

| Need | Requirement |
|------|-------------|
| Feature enabled by a data dependency | **MUST** implement a killswitch for that feature |
| Implement killswitches | **MUST** be tested in CI and subject to the same change control procedures |
| Reverting a change is NOT sufficient to recover | **MUST** document manual intervention steps as a runbook |

### Break Glass Access

| Need | Requirement |
|------|-------------|
| Own an internal admin tool or API | **MUST** register it in your service catalog |
| Own an internal admin tool | **MUST** assess whether it requires break glass access: *"Would this tool plausibly be needed during a total edge outage?"* |
| Tool requires break glass access | **MUST** be reachable without traversing your primary production path |
| Tool requires break glass + authentication | **MUST** implement a break glass authentication path |
| Tool has break glass access | **MUST** provide audit logging — actor identity and actions taken |
| Tool has break glass access | **MUST** document a break glass runbook: access URL, auth method, available operations |
| Tool has break glass access | **MUST** validate the access pathway and authentication quarterly |
| Tool has break glass access | **MUST NOT** depend on a specific individual being available to operate it |
| Tool has break glass access | Operating it **MUST NOT** require copy-pasting obscure commands or tribal knowledge |
| Break glass exercise fails | **MUST** log it and remediate promptly |

### CI/CD Gates

| Need | Requirement |
|------|-------------|
| Deploy a production service | Service catalog entry **MUST** be present with `dependsOn` populated and dependency review within 30 days |

### Incident Reports

| Requirement | Detail |
|-------------|--------|
| Summary | 2–3 sentences: **IMPACT**, **ROOT CAUSE**, and **RESOLUTION** in terms any engineer can understand |
| Impact section | **WHO** was affected, **HOW MANY** (numbers + percentages), **HOW LONG** (UTC timestamps), **HOW BAD** (customer experience, not just technical symptoms) |
| Metrics or graphs | **MUST** link to data sources (dashboards, queries) for verification |
| SLO impact | State which SLO was impacted and error budget burned; if no SLO covers it, acknowledge the gap and create a follow-up ticket |
| Customer-detected incident | **MUST** create a follow-up ticket for alerting improvement |
| Trigger description | Link to the specific deployment/change; distinguish trigger from root cause |
| Root causes | Use "5 whys" thinking to reach systemic issues, not just proximate causes |
| Each root cause | **MUST** have a linked follow-up ticket: *Prevents* (prevention), *Monitors* (detection/alerting), *Follows Up* (investigation) |
| Root cause affecting other systems | Follow-ups **SHOULD** address the issue broadly, not just this instance |
| Timeline | UTC timestamps in `YYYY-MM-DD HH:MM` format; label 8 milestones: ISSUE INTRODUCED, TRIGGER EVENT, IMPACT BEGINS, FIRST ALERT, INVESTIGATION BEGINS, INCIDENT DECLARED, IMPACT ENDS, INCIDENT RESOLVED |
| Detection gap > 30 min | **SHOULD** include a root cause explaining what went wrong with detection |
| Remediation gap > 30 min | **SHOULD** include follow-ups to address the delay |
| Follow-up actions | **MUST** be technical controls — not process changes alone; avoid "we'll be more careful" without automation |
| Blamelessness | **MUST** be blameless — focus on systemic issues; do not call out individuals by name |

### Anti-Patterns

| Bad | Why | Instead |
|-----|-----|---------|
| Timeouts not set on external calls | Single slow dependency brings down the service | Set explicit connect + read timeouts everywhere |
| Fixed-interval retries | Creates synchronized retry storms under load | Exponential backoff with jitter |
| Circuit breaker with no metrics | Silent failure — no visibility on state transitions | Emit state-transition metrics |
| Killswitch not tested in CI | Killswitch fails when you need it most | Test killswitch in CI as part of change control |
| Incident report blames an individual | Chills future reporting; misses systemic causes | Focus on process and system gaps |
| "We'll be more careful" as a follow-up | Not a technical control; won't survive team changes | Automate the safeguard |
| No SLO for a service in production | No shared definition of "working"; no alerting threshold | Define SLOs before shipping |
| [define yours] | [define yours] | [define yours] |

---

## Rules

### RELIABILITY-001: Define SLOs before shipping a new service

**Rule**: Every service that handles production traffic must have defined Service Level Objectives (SLOs) for availability and latency before its first production deployment.

**Rationale**: SLOs are the contract between a service and its users. Without them, there is no shared definition of "working correctly," no alerting threshold, and no basis for prioritizing reliability work.

**Good example**:
```yaml
# slo.yaml
service: payment-processor
slos:
  - name: availability
    target: 99.9%
    window: 30d
  - name: p99_latency
    target: 500ms
    window: 7d
```

**Bad example**:
```
# Shipped without any SLO definition.
# On-call engineer discovers service is "slow" only via customer complaint.
```


### RELIABILITY-002: All external calls must have timeouts

**Rule**: Every call to an external service, database, or API must have an explicit timeout configured.

**Rationale**: Without timeouts, a slow or unresponsive dependency can exhaust connection pools, block threads, and cascade into a full outage. Timeouts are the first line of defense against dependency failures.

**Good example**:
```python
response = requests.get(
    "https://api.example.com/data",
    timeout=(3.05, 10)  # (connect timeout, read timeout)
)
```

**Bad example**:
```python
response = requests.get("https://api.example.com/data")
# No timeout — will block indefinitely if the server hangs
```


### RELIABILITY-003: Use exponential backoff with jitter for retries

**Rule**: When retrying failed requests, use exponential backoff with random jitter. Never use fixed-interval retries in production code.

**Rationale**: Fixed-interval retries under load create synchronized retry storms that amplify the failure. Jitter spreads retries across time, reducing thundering herd effects.

**Good example**:
```python
import random, time

def retry_with_backoff(fn, max_attempts=5, base_delay=0.5):
    for attempt in range(max_attempts):
        try:
            return fn()
        except TransientError:
            if attempt == max_attempts - 1:
                raise
            delay = base_delay * (2 ** attempt) + random.uniform(0, 0.5)
            time.sleep(delay)
```

**Bad example**:
```python
for _ in range(5):
    try:
        return call_service()
    except Exception:
        time.sleep(1)  # Fixed interval — all retries hit at the same time
```


### RELIABILITY-004: Emit structured metrics for every service operation

**Rule**: Every significant operation (request, job, background task) must emit structured metrics including success/failure count, latency, and error type.

**Rationale**: Without metrics, the only way to detect degradation is customer complaints. Structured metrics enable automated alerting, dashboards, and SLO burn rate calculations.

**Good example**:
```python
with metrics.timer("payment.process.latency"):
    try:
        result = process_payment(request)
        metrics.increment("payment.process.success")
    except PaymentError as e:
        metrics.increment("payment.process.error", tags={"reason": e.code})
        raise
```


### RELIABILITY-005: Implement health check endpoints on all services

**Rule**: Every HTTP service must expose a `/health` (liveness) and `/ready` (readiness) endpoint that load balancers and orchestrators can use to route traffic.

**Rationale**: Without health endpoints, load balancers cannot detect degraded instances, and deployments cannot safely roll out or roll back.

**Good example**:
```python
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/ready")
def ready():
    db.ping()           # check dependencies
    cache.ping()
    return {"status": "ready"}
```

**Notes**: `/health` should always return 200 if the process is alive. `/ready` should return 503 if dependencies are unavailable.


### RELIABILITY-006: Use feature flags for risky rollouts

**Rule**: New features that touch critical paths, change data models, or affect performance must be gated behind a feature flag to allow gradual rollout and instant rollback.

**Rationale**: Full deploys are all-or-nothing. Feature flags allow percentage-based rollout, targeted testing, and instant kill-switch without a revert deployment.

**Good example**:
```python
if feature_flags.is_enabled("new_checkout_flow", user_id=user.id):
    return new_checkout(cart)
else:
    return legacy_checkout(cart)
```


### RELIABILITY-007: [Scaffold] Define on-call runbook requirements

**Rule**: Every alert must link to a runbook that explains what the alert means, how to investigate, and how to resolve it.

**Rationale**: Reduce MTTR — on-call engineers should not need to reverse-engineer alerts at 3am.


### RELIABILITY-008: [Scaffold] Set circuit breaker thresholds for downstream dependencies

**Rule**: <!-- Define when and how circuit breakers should be used for downstream service calls -->

**Rationale**: Prevent cascading failures when dependencies degrade.


### RELIABILITY-009: [Scaffold] Define data backup and recovery standards

**Rule**: <!-- Define your org's backup frequency, retention period, and recovery time objectives -->

**Rationale**: Untested backups are not backups. Define RTO and RPO before you need them.


### RELIABILITY-010: [Scaffold] Require chaos/fault injection testing for critical paths

**Rule**: <!-- Define when fault injection or chaos testing is required -->


### RELIABILITY-011: [Scaffold] Define capacity planning review cadence

**Rule**: <!-- Define how often services are reviewed for capacity headroom and growth projections -->
