# Writing RFCs

RFCs (Requests for Comments) are how we document significant decisions. They capture not just *what* we decided, but *why* — so future teams can learn from our thinking, not repeat our mistakes.

---

## Why write an RFC?

Teams generate documents — specs, design docs, planning briefs — but without a shared repository for decision reasoning, institutional knowledge evaporates. How did that team solve the config problem? What paths did they not take, and why? What tradeoffs were real versus imagined?

A good RFC answers the question a future engineer will ask six months from now: *"Why is it built this way?"*

The why matters more than the what.

---

## What makes a good RFC

Three things make an RFC worth reading:

**Alternatives Considered** — Future teams need to know what didn't work. When someone asks "why didn't you just use X?", the answer should be in the RFC. This prevents teams from retreading the same ground and signals that the decision was deliberate.

**Developer Experience** — Whether internal or external, systems should be intuitive. Writing about how others will actually use what you're building forces you to think about it from their perspective before it's too late to change.

**Prior Art** — What existing systems, research, or other teams' work informed your proposal? This connects your decision to the broader context and helps others discover related work.

---

## When to write an RFC

Write an RFC for decisions worth remembering:

- Building a new system or service
- Shipping a significant new capability
- Migrating from one provider, platform, or approach to another
- Architectural changes that affect multiple teams
- Standards or patterns that should apply across engineering or product

**Skip the RFC for:**

- Routine changes and well-understood patterns already in the Codex
- Decisions that are easily reversed
- Small, self-contained changes with one clear path

When in doubt, a short chat thread or a brief doc is fine. Not every decision needs an RFC. An RFC for something trivial is noise.

---

## Two types of RFCs

### Team RFCs
Lightweight decision documents for your immediate team. They can live in a team wiki, shared doc, or team repository. No formal approval required. Use them to pressure-test ideas, document decisions before you make them, or clarify what you want to build.

### Codex RFCs
Org-wide standards that live in this Codex repository. These go through the formal governance process — domain owner review, comment period, approval. If your RFC will produce guidance that applies to everyone (e.g., "if you need X → use Y"), it's a Codex RFC.

See [RFC Process](../governance/rfc-process.md) and [Review Policy](../governance/review-policy.md) for the full lifecycle.

---

## Tips

**Share early.** Share your RFC when you have a clear problem statement and at least one proposed approach. You don't need all the answers — that's what discussion is for. An RFC that sparks the right conversation is more valuable than a polished document nobody reads.

**Focus on the why.** If you're solving a problem in a new way, spend your words on the rationale. The implementation details will be in the code. The reasoning won't be anywhere else.

**Don't let an LLM fill in the blanks.** If you're using AI to complete template sections, pause and ask: is this section actually useful? A well-structured section that says nothing is worse than no section at all. The template is a starting point, not a mandate.

**Skip what doesn't serve you.** A process RFC doesn't need implementation phases. A standards RFC doesn't need a full migration plan. Write what your reader needs; omit what they don't.

---

## Template

Size your RFC to the scale of the problem. Small change? Keep it short. Replacing something foundational? Take the space to explain the benefits, risks, and alternatives.

---

### RFC: [Title]

**Author(s)**: [Name(s)]  
**Date**: [YYYY-MM-DD]  
**Type**: Team RFC | Codex RFC  
**Status**: Draft | In Review | Approved | Deprecated  

---

#### Problem Statement

*What problem are you solving? Who has this problem? How do you know it's real?*

One paragraph maximum. If you need more, the problem isn't well-enough understood yet.

---

#### Proposal

*What are you proposing to do or build?*

Describe the solution at the level of detail needed to evaluate it — not the implementation. What will exist that doesn't exist today? What will change?

---

#### Alternatives Considered

*What else did you evaluate, and why did you reject it?*

| Option | Why rejected |
|--------|-------------|
| [Option A] | [Reason] |
| [Option B] | [Reason] |

This section is required. "We only considered one approach" is a red flag.

---

#### Developer / User Experience

*How will engineers, users, or other teams actually interact with this?*

Show the interface, the API, the config, or the workflow as it would look in practice. This is where you discover whether the proposal is actually usable.

---

#### Prior Art

*What existing systems, research, or work informed this?*

Link to related RFCs, external references, or prior implementations. This is not a literature review — include only what actually shaped the proposal.

---

#### Risks and Mitigations

*What could go wrong? What's the rollback plan?*

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| [Risk] | High / Med / Low | [Mitigation] |

---

#### Open Questions

*What remains unresolved at the time of writing?*

List questions that require input from reviewers or that will be resolved during implementation. Remove this section when questions are answered.

---

#### Decision

*[Leave blank until the RFC is approved. Record the final decision and any significant changes from the original proposal.]*

---

## References

- [Hashicorp RFC template](https://works.hashicorp.com/articles/writing-practitioner-rfcs)
- [Writing RFCs (Increment)](https://increment.com/planning/the-rfc-process/)
- [Oxide RFD process](https://rfd.shared.oxide.computer/rfd/0001)
