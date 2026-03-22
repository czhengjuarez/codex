# Contributing to the Codex

Thank you for helping improve the Codex. This document explains how to contribute across all three codexes — Engineering, Product, and Design.

## Codex structure

| Codex | Location | What lives here |
|-------|----------|-----------------|
| Engineering | `domains/` | Code quality, reliability, security, language-specific standards |
| Product | `product/` | Product principles, discovery, how we ship |
| Design | `design/` | Design principles, accessibility, user research |
| Governance | `governance/` | RFC process, review policy — applies to all codexes |

---

## Ways to contribute

| Contribution type | Process |
|------------------|---------|
| Propose a new rule or principle | Open an RFC (see below) |
| Amend existing content | Open a PR (minor: 1 approval; substantive: full RFC) |
| Deprecate a rule | Open a PR marking the rule deprecated |
| Fix a typo or clarify an example | Open a PR (1 approval needed) |
| Report a conflict between rules | Open a GitHub Issue |
| Suggest a new domain or codex section | Open a GitHub Issue or Discussion |
| Propose a new codex (beyond Eng/Product/Design) | Open a GitHub Discussion first |

---

## Proposing a new rule or principle (RFC process)

1. **Read the Writing RFCs guide** at [`rfc-template.md`](rfc-template.md) — it explains when an RFC is needed and how to write one well.

2. **Add your content** to the appropriate file:
   - Engineering rule → `domains/[domain].md`
   - Product principle → `product/[file].md`
   - Design principle → `design/[file].md`
   - New file in any codex → follow the format of existing files in that directory

3. **Open a pull request** with the title format:
   ```
   RFC: [CODEX] Short description
   ```
   Examples:
   ```
   RFC: [Engineering] Add TypeScript strict mode requirement
   RFC: [Product] Add principle on measuring customer outcomes
   RFC: [Design] Define color contrast standard for data visualization
   ```

4. **Add the `rfc` label** to your PR.

5. **Respond to feedback** during the review period.

6. **Await approval** per the quorum requirements in [`governance/review-policy.md`](governance/review-policy.md).

Full process: [`governance/rfc-process.md`](governance/rfc-process.md)

---

## Writing good Engineering rules

Engineering rules in `domains/` follow a specific format:

**The rule statement** must be:
- A single imperative sentence
- Specific enough that two engineers would reach the same conclusion when applying it
- Written as "must" or "must not" — not "should" or "consider"

**The rationale** must:
- Reference a real problem, not just a preference
- Explain the consequences of violating the rule

**Examples** must be:
- Realistic — not toy `foo`/`bar` examples
- In the language most relevant to the domain
- Paired: always include both a good and bad example

## Writing good Product and Design principles

Product (`product/`) and Design (`design/`) content is less rule-like and more principle-based. Good principles:

- Are timeless — they should hold for years, not just the current quarter
- Are opinionated — a principle compatible with every decision isn't a principle
- Explain the tradeoff — what does this principle ask you to sacrifice?
- Are written for the person making the decision, not for the person auditing compliance

---

## What makes a contribution ready for approval

- [ ] The content is unambiguous
- [ ] The rationale references a real problem, not just a preference
- [ ] No unresolved conflicts with existing content
- [ ] The content is filed in the right codex and section
- [ ] Quorum is met (see [`governance/review-policy.md`](governance/review-policy.md))
- [ ] If using AI assistance: you've reviewed every section and confirmed it's actually useful — not just well-formatted filler

---

## What we don't accept

- Rules or principles based purely on preference without a rationale
- Content that duplicates existing approved content
- Rules so narrow they apply to only one service or team (those belong in that team's local standards)
- Principles so broad they're compatible with every possible decision

---

## Questions?

- Open a GitHub Discussion for broad questions about the Codex direction
- Open a GitHub Issue to report conflicts or problems
- Tag a Codex Maintainer in a PR comment for process questions
