# Security Domain

Rules for building secure systems by default.


---

### SECURITY-001: Never hardcode secrets in source code


**Rule**: API keys, passwords, tokens, and certificates must never appear in source code, configuration files committed to version control, or log output.

**Rationale**: Secrets in source code are trivially discoverable via git history, search tools, and leaked repositories. Rotation is difficult once secrets are embedded in code.

**Good example**:
```python
import os
db_password = os.environ["DB_PASSWORD"]  # from secrets manager or env
```

**Bad example**:
```python
db_password = "s3cr3t_p@ssw0rd"  # hardcoded — will appear in git forever
```

**Notes**: Use a secrets manager (e.g., HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager) for production secrets. Use `.env` files locally (gitignored) for development.


### SECURITY-002: Validate and sanitize all user input


**Rule**: All data from external sources (HTTP requests, message queues, files, environment variables) must be validated against an expected schema before use.

**Rationale**: Unvalidated input is the root cause of injection attacks (SQL, command, SSRF, XSS). Validation at the boundary prevents malformed data from propagating into internal systems.

**Good example**:
```python
class CreateUserRequest(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=0, le=150)

@app.post("/users")
def create_user(body: CreateUserRequest):  # validated by pydantic
    ...
```

**Bad example**:
```python
@app.post("/users")
def create_user(request):
    data = request.json()
    db.execute(f"INSERT INTO users VALUES ('{data['name']}')")  # SQL injection
```


### SECURITY-003: Use parameterized queries for all database operations


**Rule**: Never construct SQL queries by string concatenation or interpolation. Always use parameterized queries or ORM methods.

**Rationale**: String-concatenated SQL queries are vulnerable to SQL injection regardless of how the input appears to be validated. Parameterized queries eliminate this class of vulnerability entirely.

**Good example**:
```python
cursor.execute(
    "SELECT * FROM users WHERE email = %s AND active = %s",
    (email, True)
)
```

**Bad example**:
```python
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
# SQL injection if email = "' OR '1'='1"
```


### SECURITY-004: Enforce least-privilege access for all service accounts


**Rule**: Service accounts and IAM roles must be granted only the minimum permissions required for the service to function. Wildcard (`*`) permissions in production are not permitted.

**Rationale**: Over-privileged service accounts amplify the blast radius of a compromise. A service that only reads from one S3 bucket should not have write access to all buckets.

**Good example**:
```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-bucket/reports/*"
}
```

**Bad example**:
```json
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```


### SECURITY-005: Require authentication and authorization on all internal APIs


**Rule**: Internal service-to-service APIs must authenticate callers and enforce authorization checks. "Internal network" is not a sufficient trust boundary.

**Rationale**: Lateral movement inside a network is common after an initial compromise. Mutual TLS, service tokens, or signed requests ensure that even internal callers are verified.

**Good example**:
```python
@app.middleware("http")
async def verify_service_token(request, call_next):
    token = request.headers.get("X-Service-Token")
    if not verify_service_token(token):
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    return await call_next(request)
```


### SECURITY-006: Enable HTTPS/TLS for all external-facing endpoints


**Rule**: All services that accept connections from outside the internal network must use TLS 1.2 or higher. HTTP-only endpoints are not permitted in production.


### SECURITY-007: Log security-relevant events with structured fields


**Rule**: Authentication attempts (success and failure), authorization decisions, and access to sensitive data must be logged with structured fields including timestamp, user/service identity, resource, and outcome.

**Rationale**: Security logs are required for incident response, forensics, and compliance. Unstructured logs are difficult to query and alert on.

**Good example**:
```python
logger.info("auth.login", extra={
    "user_id": user.id,
    "ip": request.remote_addr,
    "method": "password",
    "success": True,
    "timestamp": datetime.utcnow().isoformat(),
})
```


### SECURITY-008: [Scaffold] Define dependency vulnerability scanning policy


**Rule**: <!-- Define when and how dependencies are scanned for known vulnerabilities (e.g., on every PR, nightly) -->


### SECURITY-009: [Scaffold] Define secret rotation policy


**Rule**: <!-- Define how frequently secrets are rotated and how rotation is automated -->


### SECURITY-010: [Scaffold] Define security review requirements for new features


**Rule**: <!-- Define what triggers a security review (e.g., new external endpoint, auth change, PII handling) -->


### SECURITY-011: [Scaffold] Require MFA for production access


**Rule**: <!-- Define your MFA requirements for production system access -->


### SECURITY-012: [Scaffold] Define data classification and handling tiers


**Rule**: <!-- Classify data (public, internal, confidential, restricted) and define handling requirements per tier -->


### SECURITY-013: [Scaffold] Define penetration testing cadence


**Rule**: <!-- Define when external or internal penetration tests are required -->


### SECURITY-014: [Scaffold] Define incident response process for security events


**Rule**: <!-- Define the response process for detected security incidents (containment, notification, remediation) -->
