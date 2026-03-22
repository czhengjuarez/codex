# Control Plane Domain

Rules for building and operating control plane systems and configuration management.


---

### CP-001: Control plane changes must be auditable and reversible


**Rule**: Every configuration change applied by the control plane must be logged with: who initiated it, what changed (before/after diff), when, and why. All changes must be reversible within the SLO window.

**Rationale**: Control planes operate at scale. A misconfiguration can affect thousands of nodes simultaneously. Audit logs enable forensics; reversibility limits blast radius.

**Good example**:
```python
audit_log.record(
    actor=request.actor,
    action="update_config",
    resource=f"node/{node_id}",
    diff={"before": old_config, "after": new_config},
    reason=request.reason,
    timestamp=utcnow(),
)
apply_config(node_id, new_config)
```

**Bad example**:
```python
# No audit log, no diff, no reason
apply_config(node_id, new_config)
```


### CP-002: Use staged rollouts for control plane changes


**Rule**: Control plane configuration changes must be rolled out in stages (e.g., canary → 10% → 50% → 100%) with automated health checks between stages. Full simultaneous rollouts to all nodes are not permitted for production changes.

**Rationale**: Simultaneous changes across all nodes can turn a local defect into a global outage. Staged rollouts limit the blast radius and allow automated rollback before full propagation.

**Good example**:
```yaml
rollout:
  stages:
    - target: canary
      size: 1%
      wait: 10m
      health_check: true
    - target: region
      size: 10%
      wait: 30m
      health_check: true
    - target: global
      size: 100%
```


### CP-003: Validate configuration schemas before applying


**Rule**: All configuration updates must be validated against a versioned schema before being applied to any node. Invalid configurations must be rejected with a clear error — never silently ignored or partially applied.

**Rationale**: Silently applying invalid or partial configuration leads to split-brain states and inconsistent behavior across nodes that are extremely difficult to diagnose.

**Good example**:
```python
errors = schema.validate(new_config, version=config.schema_version)
if errors:
    raise ConfigValidationError(errors)
apply_config(node_id, new_config)
```


### CP-004: Control plane APIs must be idempotent


**Rule**: All control plane API operations that mutate state must be idempotent. Applying the same configuration twice must produce the same result as applying it once.

**Rationale**: Control plane operations are frequently retried due to network failures, timeouts, and agent restarts. Non-idempotent operations in a retry loop cause inconsistent state.


### CP-005: Separate read and write paths in the control plane


**Rule**: Control plane systems must separate the read path (configuration distribution to agents/nodes) from the write path (accepting configuration updates). These paths have different consistency, latency, and availability requirements.

**Rationale**: Coupling reads and writes creates a single point of failure. The read path must be highly available even when the write path is degraded. Separation allows independent scaling and failure isolation.


### CP-006: [Scaffold] Define consistency model for distributed configuration


**Rule**: <!-- Define whether your control plane uses eventual consistency, linearizability, or causal consistency, and document the guarantees clients can rely on -->

**Rationale**: <!-- Clients need to know what consistency guarantees they can assume when reading configuration -->


### CP-007: [Scaffold] Define agent heartbeat and liveness requirements


**Rule**: <!-- Define the heartbeat interval, missed-heartbeat threshold, and action taken when an agent is declared unhealthy -->


### CP-008: [Scaffold] Define configuration drift detection policy


**Rule**: <!-- Define how configuration drift (applied config diverging from desired config) is detected, alerted on, and remediated -->
