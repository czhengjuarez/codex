# Engineering Codex

The Engineering Codex is how we build software at [Your Org]. It covers the standards, tools, and patterns that apply across every engineering team.

---

## What it covers

| Domain | What lives here |
|--------|-----------------|
| [AI](./ai.md) | LLM usage, AI infrastructure, responsible AI practices |
| [API Design](./api-design.md) | REST and gRPC conventions, versioning, error shapes |
| [Code Quality](./code-quality.md) | Review standards, naming, testing, managing tech debt |
| [Control Plane](./control-plane.md) | Config management, staged rollouts, failure state review |
| [Data Management](./data-management.md) | Migrations, transactions, encryption, retention |
| [Dependencies](./dependencies.md) | Lock files, supply chain, vulnerability management |
| [Documentation](./documentation.md) | Code comments, docstrings, ADRs, READMEs |
| [Python](./python.md) | Python tooling decisions, types, ML/data stack |
| [Reliability](./reliability.md) | SLOs, incident reports, dependency cataloguing, break glass |
| [Rust](./rust.md) | Error handling, unsafe, panic observability, tooling |
| [Security](./security.md) | Secrets, input validation, auth, access control, audit logging |
| [TypeScript](./typescript.md) | Type system, error handling, resilience, observability |

---

## How the Engineering Codex works

Rules are organized by domain. Each rule has:

- A unique ID (e.g., `RELIABILITY-002`) for traceability in code review and AI tools
- A **Rule** — one imperative sentence stating what to do or not do
- A **Rationale** — why it matters and what problem it prevents
- **Examples** — good and bad, realistic not toy

Many domain pages also include a **"When to Use What"** section — a quick-reference table of tooling decisions specific to that domain. Fill in the `[define yours]` entries with your org's standard libraries and services.

---

## Engineering principles

These apply across all domains:

1. **Correctness before performance** — write it right first; optimize when you have data
2. **Explicit over implicit** — code that shows its intent is easier to review, debug, and hand off
3. **Fail fast and loudly** — surface errors at the boundary; don't let bad state propagate silently
4. **Observability is not optional** — if you can't measure it, you can't fix it
5. **Security by default** — the secure path should be the easy path
6. **Design for reversibility** — prefer changes that can be rolled back without a migration

---

## Related

- [Codex Skill for AI Agents](/skills) — load these rules into your AI coding tools
- [Writing RFCs](/rfc) — how to propose changes to the Engineering Codex
- [RFC Process](/governance/rfc-process) — governance and approval lifecycle
