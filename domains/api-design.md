# API Design Domain

Rules for designing consistent, evolvable REST and gRPC APIs.


---

### API-001: Version all public APIs from the start


**Rule**: All public APIs must include an explicit version in the URL path (`/v1/`, `/v2/`) or header from their initial release.

**Rationale**: Retrofitting versioning onto an unversioned API requires breaking changes or complex negotiation logic. Starting with versioning enables backward-compatible evolution.

**Good example**:
```
GET /v1/users/{id}
POST /v1/payments
```

**Bad example**:
```
GET /users/{id}        # no version — impossible to introduce breaking changes later
POST /payments
```


### API-002: Use nouns, not verbs, in REST resource paths


**Rule**: REST endpoint paths must identify resources (nouns), not actions (verbs). Use HTTP methods to express the action.

**Rationale**: Verb-based paths are RPC-style, not REST. They lead to inconsistency (`/getUser`, `/fetchUser`, `/retrieveUser`) and make APIs harder to explore.

**Good example**:
```
GET    /v1/users/{id}        # retrieve a user
POST   /v1/users             # create a user
PUT    /v1/users/{id}        # replace a user
DELETE /v1/users/{id}        # delete a user
```

**Bad example**:
```
GET  /v1/getUser?id=123
POST /v1/createUser
POST /v1/deleteUser
```


### API-003: Return consistent error response shapes


**Rule**: All API error responses must use a consistent JSON structure with at minimum: `error` (machine-readable code), `message` (human-readable description), and `request_id`.

**Rationale**: Inconsistent error shapes force clients to write different parsing logic for each endpoint. A standard structure enables generic error handling and debugging.

**Good example**:
```json
{
  "error": "user_not_found",
  "message": "No user exists with id 42",
  "request_id": "req_8f3k2j9x",
  "docs_url": "https://docs.example.com/errors/user_not_found"
}
```

**Bad example**:
```json
{ "status": "error", "msg": "not found" }
// or
{ "code": 404, "description": "User 42 not found" }
// Different shape on every endpoint
```


### API-004: Use ISO 8601 for all date and time fields


**Rule**: All date and datetime values in API requests and responses must use ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`) in UTC. Unix timestamps are acceptable as an addition but not a replacement.

**Rationale**: Inconsistent date formats (epoch milliseconds, custom strings, local time) are a major source of integration bugs. ISO 8601 UTC is unambiguous and universally parseable.

**Good example**:
```json
{
  "created_at": "2024-03-15T14:32:00Z",
  "expires_at": "2024-04-15T14:32:00Z"
}
```

**Bad example**:
```json
{
  "created_at": 1710510720,
  "expires_at": "04/15/2024 2:32 PM"
}
```


### API-005: Never expose internal IDs directly; use opaque identifiers


**Rule**: Public API resource identifiers must be opaque (UUIDs, base62-encoded, or prefixed slugs). Never expose sequential database integer IDs.

**Rationale**: Sequential integer IDs reveal record counts, enable enumeration attacks, and couple the API to internal database implementation details.

**Good example**:
```json
{ "id": "usr_8f3k2j9xmQr" }
```

**Bad example**:
```json
{ "id": 4271 }  // reveals that ~4271 users exist; trivially enumerable
```


### API-006: Paginate all list endpoints


**Rule**: All endpoints that return collections must support pagination. Cursor-based pagination is preferred over offset pagination for large or frequently changing datasets.

**Rationale**: Unbounded list responses degrade performance and can exhaust client memory. Cursor-based pagination is more stable than offset pagination when records are inserted or deleted between pages.

**Good example**:
```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}
```


### API-007: [Scaffold] Define rate limiting and throttling standards


**Rule**: <!-- Define your org's standard for rate limiting public and internal APIs -->


### API-008: [Scaffold] Define authentication scheme for APIs


**Rule**: <!-- Define whether to use Bearer tokens, API keys, mTLS, or a combination for authenticating API clients -->


### API-009: [Scaffold] Define deprecation and sunset policy for API versions


**Rule**: <!-- Define how API versions are deprecated, how clients are notified, and how long sunset periods last -->


### API-010: [Scaffold] Define OpenAPI spec requirements


**Rule**: <!-- Define whether OpenAPI specs are required, how they are generated (code-first vs spec-first), and where they are published -->


### API-011: [Scaffold] Define idempotency key requirements for write operations


**Rule**: <!-- Define which mutation endpoints require idempotency keys and how they are implemented -->


### API-012: [Scaffold] Define webhook and event delivery standards


**Rule**: <!-- Define payload structure, retry policy, signing, and delivery guarantees for webhooks -->
