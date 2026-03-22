# Data Management Domain

Rules for storing, migrating, and managing data safely.


---

### DATA-001: All schema migrations must be backward compatible


**Rule**: Database schema migrations must be backward compatible with the previous application version. Migrations that break the currently running version are not permitted to run during a deployment.

**Rationale**: Zero-downtime deployments require that both the old and new application versions can operate against the same schema simultaneously. Breaking migrations force big-bang deploys with downtime.

**Good example**:
```sql
-- Step 1: Add column as nullable (backward compatible — old app ignores it)
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Step 2: (after full rollout) backfill data
UPDATE users SET phone = ... WHERE phone IS NULL;

-- Step 3: (separate deploy) add NOT NULL constraint
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
```

**Bad example**:
```sql
-- Drops a column the old app still reads — will break running instances
ALTER TABLE users DROP COLUMN legacy_field;
```


### DATA-002: Never delete data; use soft deletes or archive strategies


**Rule**: Production data must not be hard-deleted unless required by a compliance obligation. Use soft deletes (`deleted_at` timestamp) or move data to an archive tier.

**Rationale**: Hard-deleted data is unrecoverable. Soft deletes enable undo functionality, audit trails, and forensics. Compliance requirements (GDPR right-to-erasure) can be satisfied by purging after the required retention period.

**Good example**:
```sql
-- Soft delete
UPDATE users SET deleted_at = NOW() WHERE id = $1;

-- Query active users
SELECT * FROM users WHERE deleted_at IS NULL;
```

**Bad example**:
```sql
DELETE FROM users WHERE id = $1;  -- irrecoverable
```


### DATA-003: Index foreign keys and commonly queried fields


**Rule**: Foreign key columns and fields used in `WHERE`, `JOIN`, or `ORDER BY` clauses in frequent queries must have indexes. Schema migrations that add frequently queried columns must include corresponding indexes.

**Rationale**: Missing indexes cause full table scans that degrade performance non-linearly as data grows. This is a class of problem that doesn't appear in development but causes production incidents at scale.

**Good example**:
```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);
```


### DATA-004: Use database transactions for multi-step writes


**Rule**: Any operation that performs multiple related writes to the database must wrap them in a transaction to ensure atomicity.

**Rationale**: Without transactions, a partial failure leaves the database in an inconsistent state that may be invisible until later and difficult to remediate.

**Good example**:
```python
with db.transaction():
    account = db.get_account(account_id, lock=True)
    account.balance -= amount
    db.update(account)
    db.insert(Transaction(account_id=account_id, amount=-amount))
```

**Bad example**:
```python
# Two separate writes — failure between them leaves inconsistent state
account.balance -= amount
db.update(account)
db.insert(Transaction(account_id=account_id, amount=-amount))
```


### DATA-005: Encrypt sensitive data at rest


**Rule**: Sensitive data (PII, credentials, payment information) must be encrypted at rest using a KMS-managed key. Application-level encryption is required for fields that should not be readable by database administrators.


### DATA-006: [Scaffold] Define data retention and purge policy


**Rule**: <!-- Define how long different data classes are retained and how purges are automated -->


### DATA-007: [Scaffold] Define read replica usage policy


**Rule**: <!-- Define when read replicas may be used and how replication lag is handled for consistency-sensitive reads -->


### DATA-008: [Scaffold] Define large object storage standards


**Rule**: <!-- Define standards for storing large objects (images, documents, exports) — object storage vs database, naming conventions, lifecycle rules -->


### DATA-009: [Scaffold] Define event sourcing and CQRS usage guidelines


**Rule**: <!-- If your org uses event sourcing or CQRS, define when these patterns are appropriate and required -->
