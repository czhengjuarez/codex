# RFC Process

This document describes how content is proposed, reviewed, approved, and retired across all three Codexes — Engineering, Product, and Design.

## Principles

- **Anyone can propose a change.** The process is open, not top-down. Engineers, PMs, designers, and support staff all have standing to propose.
- **Proposals are evidence-based.** Every proposal must include a rationale — why it matters and what problem it solves.
- **Content has owners.** Every approved piece of content has a named owner responsible for keeping it current.
- **Content can be deprecated.** Nothing is permanent. Old content is marked deprecated, never deleted — history matters.
- **The process is lightweight.** A PR is enough to start. Bureaucracy is a smell.

---

## Lifecycle

```
Proposed → In Review → Approved
                ↓
           Rejected (closed PR, no merge)
                ↓
           Deprecated (still exists, marked deprecated)
```

---

## What needs an RFC

| Change type | RFC required? |
|-------------|--------------|
| New engineering rule | Yes |
| New product or design principle | Yes |
| New domain or codex section | Yes |
| Amending a rule statement | Yes (substantive change) |
| Clarifying an example, fixing a typo | No (1 approval, no RFC label) |
| Deprecating existing content | No (1 approval, no RFC label) |
| Adding a new tooling `[define yours]` entry | No (1 approval) |

---

## Step 1 — Write the proposal

Before opening a PR, read [`rfc-template.md`](/rfc) — it explains what makes a good proposal and what to include.

**For Engineering rules** — add the rule to the appropriate file in `domains/`:
- Rule ID format: `DOMAIN-NNN` (e.g., `RELIABILITY-007`, `TYPESCRIPT-005`)
- Rule statement: one imperative sentence with "must" or "must not"
- Rationale: references a real problem, not a preference
- Examples: realistic, paired (good and bad)

**For Product principles** — add to `product/`:
- Written as a principle, not a rule — timeless and opinionated
- Explains the tradeoff the principle asks you to make

**For Design principles** — add to `design/`:
- Written as a principle — focused on outcomes for users, not implementation steps
- References the user impact of following or not following the principle

---

## Step 2 — Open a pull request

Open a PR against the `main` branch. Title format:

```
RFC: [Codex] Short description
```

Examples:
```
RFC: [Engineering] Require circuit breakers on all external calls
RFC: [Product] Add principle on measuring customer outcomes
RFC: [Design] Define minimum contrast standard for data visualization
RFC: [Engineering/Reliability] Never log credentials or tokens
```

In the PR description, include:
- **Motivation** — what prompted this? (incident, pattern, onboarding friction, customer feedback)
- **Alternatives considered** — what else was evaluated and why rejected?
- **Impact** — which teams, codebases, or workflows does this affect?

Add the `rfc` label to the PR.

---

## Step 3 — Review period

The review period is **5 business days** by default.

During review:
- Anyone in the org can comment
- The PR author responds to feedback and updates the proposal
- Reviewers use GitHub review approvals to signal agreement

### Review criteria

| Criterion | Question |
|-----------|----------|
| Clarity | Is it unambiguous? Could two people interpret it differently? |
| Rationale | Does the reasoning hold up? Is it evidence-based? |
| Scope | Is it too broad or too narrow? Does it belong in a single codex? |
| Conflict | Does it contradict existing content? |
| Usefulness | Would this actually change a decision someone is making? |

The last criterion is the one AI-assisted drafts most often fail: content that is well-structured but wouldn't change anyone's behavior isn't ready to approve.

---

## Step 4 — Approval

A proposal is approved when it meets the quorum in [`review-policy.md`](review-policy.md).

Once approved:
1. Merge the PR
2. The content takes effect immediately
3. If the change affects AI tool configuration, update [`skills/opencode-skill.md`](/skills)

---

## Step 5 — Communicating changes

After merging:
- Post a summary in your team's channel (engineering, product, or design as appropriate)
- If the change affects tooling decisions (`[define yours]` entries), notify affected teams
- If your org has a dedicated Codex space or channel, post there

---

## Amending approved content

**Minor amendments** (typos, clarifying examples, updating a link): 1 approval, no RFC label needed.

**Substantive amendments** (changing a rule statement, principle, or scope): full RFC process required.

---

## Deprecating content

When content is no longer valid or has been superseded:

1. Open a PR adding a `**Deprecated**` notice at the top of the section
2. Note what replaces it (if anything)
3. Add a brief deprecation rationale
4. Merge with 1 approval

Do not delete deprecated content — it is part of the decision record.

---

## Escalation

If a proposal is blocked by disagreement:

1. Add the `escalated` label to the PR
2. Tag a Codex Maintainer in a comment
3. The Codex Maintainer reviews the thread and makes a binding decision within 5 business days
4. The decision is recorded in the PR thread
