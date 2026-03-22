# Review Policy

This document defines who can review and approve Codex rules, quorum requirements, and how conflicts are resolved.

## Roles

### Contributor
Any engineer in the organization. Can:
- Propose new rules (open a PR)
- Comment on any RFC
- Approve RFCs for domains they work in regularly

### Domain Owner
An engineer (or small group) designated as responsible for a specific domain. Can:
- Approve rule changes in their domain
- Deprecate rules in their domain
- Request escalation

### Codex Maintainer
A small group (2–4 people) responsible for the overall quality and consistency of the Codex. Can:
- Approve rule changes in any domain
- Resolve conflicts between rules
- Make binding escalation decisions
- Appoint domain owners

> **Adapting this**: Replace these roles with your org's actual structure. Common alternatives: "Tech Lead", "Principal Engineer", "Architecture Council".

---

## Quorum requirements

| Change type | Required approvals |
|-------------|-------------------|
| New rule (proposed → approved) | 2 approvals (at least 1 domain owner or maintainer) |
| Minor amendment (examples, notes, typos) | 1 approval (any reviewer) |
| Substantive amendment (rule statement change) | 2 approvals (at least 1 domain owner or maintainer) |
| Deprecation | 1 approval (domain owner or maintainer) |
| Escalated decision | 1 Codex Maintainer (binding) |

---

## Who counts as a reviewer?

Any engineer who:
1. Has read the proposal in full
2. Has left at least one substantive comment **or** explicitly states "no concerns"
3. Has clicked "Approve" on the GitHub PR

Self-approval is not permitted. The PR author cannot count toward quorum.

---

## Review timeline

| Stage | Default duration |
|-------|-----------------|
| Open review period | 5 business days |
| Author response window | 3 business days after last comment |
| Escalation resolution | 5 business days |

Extensions can be granted by a Codex Maintainer. Post in the engineering channel to request one.

---

## Blocking a rule

Any engineer can **block** a proposal by:
1. Leaving a `Request Changes` review on GitHub
2. Clearly stating the blocking reason

A block must be resolved before the rule can be merged. Resolution options:
- Author updates the proposal to address the concern
- Blocker withdraws the block after discussion
- Escalation (see below)

Blocking without explanation is not valid. A block must name a specific concern.

---

## Conflict resolution

When two rules conflict with each other (e.g., a new rule contradicts an existing one):

1. The PR author must note the conflict in the PR description
2. Reviewers must decide: amend the new rule, amend the existing rule, or deprecate the existing rule
3. The chosen resolution must be reflected in the PR before merge

If no consensus is reached, escalate.

---

## Escalation

Escalation is available when:
- A rule has been blocked for more than 10 business days
- Reviewers disagree and cannot reach consensus
- There is a conflict between domain owners

To escalate:
1. Add the label `escalated` to the PR
2. Tag a Codex Maintainer in a comment
3. The Codex Maintainer reviews the thread and makes a binding decision within 5 business days

Escalation decisions are final. They are recorded in the PR thread.

---

## Domain owners

Update this table when ownership changes.

| Domain | Owner(s) | Updated |
|--------|----------|---------|
| ai | <!-- @handle --> | <!-- date --> |
| api-design | <!-- @handle --> | |
| code-quality | <!-- @handle --> | |
| control-plane | <!-- @handle --> | |
| data-management | <!-- @handle --> | |
| dependencies | <!-- @handle --> | |
| documentation | <!-- @handle --> | |
| python | <!-- @handle --> | |
| reliability | <!-- @handle --> | |
| rust | <!-- @handle --> | |
| security | <!-- @handle --> | |

---

## Codex Maintainers

| Name | GitHub | Since |
|------|--------|-------|
| <!-- Name --> | <!-- @handle --> | <!-- date --> |

---

## Amendments to this policy

Changes to this review policy itself require:
- 3 approvals from Codex Maintainers
- A 10 business day review period
- Announcement to the engineering organization
