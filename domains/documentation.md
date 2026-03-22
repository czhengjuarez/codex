# Documentation Domain

Rules for writing code and system documentation that stays current and useful.


---

### DOCS-001: Document the why, not the what


**Rule**: Code comments should explain why a decision was made, not what the code does. The code itself expresses what — comments are for context that cannot be inferred from the code alone.

**Rationale**: Comments that restate what the code does add noise without value and go stale when the code changes but the comment doesn't. Comments explaining non-obvious decisions or constraints have lasting value.

**Good example**:
```python
# Use a fixed-size buffer here to avoid memory growth under backpressure.
# See issue #4821 — this was the source of the OOM in prod on 2024-01-15.
buf = bytearray(MAX_BUFFER_SIZE)
```

**Bad example**:
```python
# Increment counter by 1
counter += 1
```


### DOCS-002: Every public API must have a docstring


**Rule**: All public functions, classes, and methods must have a docstring describing: what the function does, its parameters, return value, and any exceptions it raises.

**Good example**:
```python
def transfer_funds(
    from_account_id: int,
    to_account_id: int,
    amount: Decimal,
) -> TransferResult:
    """Transfer funds between two accounts atomically.

    Args:
        from_account_id: The source account ID.
        to_account_id: The destination account ID.
        amount: The amount to transfer. Must be positive.

    Returns:
        TransferResult with the new balances of both accounts.

    Raises:
        InsufficientFundsError: If the source account has insufficient balance.
        AccountNotFoundError: If either account does not exist.
    """
```


### DOCS-003: Keep READMEs current with the code


**Rule**: Every service and library must have a README that is updated alongside code changes. At minimum, a README must cover: what the project does, how to run it locally, how to run tests, and how to deploy.

**Rationale**: A README that describes an outdated setup is worse than no README — it wastes time and erodes trust in the documentation. Treating README updates as part of a PR is a forcing function.


### DOCS-004: Document architectural decisions in ADRs


**Rule**: Significant architectural decisions must be recorded as Architecture Decision Records (ADRs) in the repository. An ADR captures: the context, the options considered, the decision made, and the consequences.

**Rationale**: The code captures what was built, not why. Without ADRs, future engineers have no context for why key decisions were made and may inadvertently reverse them. ADRs make institutional knowledge explicit and durable.

**Good example**:
```markdown
# ADR-005: Use PostgreSQL for transactional data

## Status: accepted

## Context
We need a primary data store for user and payment records that supports
ACID transactions, complex queries, and a proven track record at scale.

## Decision
Use PostgreSQL hosted on managed RDS.

## Consequences
- Strong consistency guarantees for financial data
- Familiar SQL interface for the engineering team
- Operational burden is delegated to managed service
- Full-text search needs will require a separate solution (Elasticsearch)
```


### DOCS-005: [Scaffold] Define runbook requirements for production services


**Rule**: <!-- Define what a runbook must contain and when it is required (e.g., for any service that generates on-call alerts) -->


### DOCS-006: [Scaffold] Define API documentation standards


**Rule**: <!-- Define whether API documentation is generated from code or written manually, and where it is published -->
