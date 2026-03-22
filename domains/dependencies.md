# Dependencies Domain

Rules for managing third-party dependencies safely and sustainably.


---

### DEP-001: Vet new dependencies before adding them


**Rule**: Before adding a new third-party dependency, evaluate: license compatibility, maintenance activity (last commit, open issues), download count, known vulnerabilities, and whether the functionality could be implemented in-house with reasonable effort.

**Rationale**: Every dependency is a trust decision. A poorly maintained or malicious dependency can introduce security vulnerabilities, licensing issues, or operational risk. The cost of evaluation is far lower than the cost of a supply chain incident.

**Checklist**:
- [ ] License is compatible with your project (MIT, Apache 2.0, BSD — check your policy)
- [ ] Has been maintained within the last 12 months
- [ ] No critical unpatched CVEs
- [ ] Download volume suggests production use
- [ ] You understand what it does (read the source for critical paths)


### DEP-002: Use a lock file for all dependency installations


**Rule**: All projects must use a lock file (`package-lock.json`, `Cargo.lock`, `poetry.lock`, `uv.lock`, etc.) and commit it to version control. CI must install from the lock file, not resolve from scratch.

**Rationale**: Without a lock file, `npm install` or `pip install` on two different days can produce different results. Lock files make builds reproducible and dependency updates deliberate and reviewable.

**Good example**:
```bash
# Install from lock file (reproducible)
npm ci              # not npm install
poetry install      # uses poetry.lock
cargo build         # uses Cargo.lock
```

**Bad example**:
```bash
npm install         # resolves latest compatible versions — not reproducible
# + no Cargo.lock committed to the repo
```


### DEP-003: Update dependencies on a regular schedule


**Rule**: Dependencies must be reviewed and updated on a regular schedule (at minimum monthly for security patches; quarterly for major version updates). Stale dependencies accumulate security debt.

**Rationale**: Unpatched dependencies are the most common vector for supply chain attacks. Regular updates keep the window of exposure small and make each update incremental rather than a large, risky migration.

**Notes**: Use automated tools (Dependabot, Renovate) to open PRs for dependency updates. Review and merge them promptly rather than letting them accumulate.


### DEP-004: Do not vendor dependencies unless necessary


**Rule**: Do not copy third-party code into the repository (vendoring) unless there is a specific technical requirement (e.g., air-gapped builds, critical fork). Vendored code does not receive upstream security updates.

**Rationale**: Vendored dependencies diverge from upstream, miss security patches, and create confusion about what version is in use. Package managers handle dependency resolution more safely than manual vendoring.

**Notes**: If vendoring is required, document the reason, the upstream version vendored, and the process for applying upstream security patches.


### DEP-005: Pin base image versions in container builds


**Rule**: Container base images must be pinned to a specific digest or version tag, not `latest`. The `latest` tag is mutable and can change unexpectedly between builds.

**Good example**:
```dockerfile
FROM python:3.12.3-slim-bookworm@sha256:abc123...
# or at minimum:
FROM python:3.12.3-slim-bookworm
```

**Bad example**:
```dockerfile
FROM python:latest   # changes on every new Python release
FROM ubuntu          # completely unpinned
```


### DEP-006: [Scaffold] Define approved license list


**Rule**: <!-- Define which open source licenses are approved for use in your org (e.g., MIT, Apache 2.0, BSD) and which are prohibited (e.g., AGPL, GPL in commercial products) -->


### DEP-007: [Scaffold] Define vulnerability scanning and remediation SLA


**Rule**: <!-- Define your SLA for remediating known vulnerabilities by severity (e.g., Critical: 7 days, High: 30 days, Medium: 90 days) -->
