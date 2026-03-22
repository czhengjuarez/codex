# How We Ship

This page covers the practical mechanics of building and launching products at [Your Org]. Where the [Product Codex](./overview.md) covers *what* we build and *why*, this page covers *how*.

---

## From Idea to Shipped

### 1. Problem Statement

Before anything else: write a one-sentence problem statement a customer would recognize as their own.

> "As a [role], I struggle to [problem] because [root cause], which means [consequence]."

If the problem statement requires more than one sentence, the problem is not well-enough understood to build.

### 2. Discovery

Validate the problem before building the solution. Discovery is not a phase — it is continuous.

- Talk to at least 3 customers before writing a spec
- Separate problem discovery (what do customers need?) from solution discovery (what should we build?)
- Build the smallest thing that tests the core assumption

### 3. Definition

A well-defined feature includes:
- **Problem statement** (one sentence, customer's words)
- **Success metric** (how will we know this worked?)
- **Non-goals** (what are we explicitly not doing?)
- **Edge cases** (what breaks if we're wrong?)

Specs exist to align, not to specify every detail. Stop writing when alignment is achieved.

### 4. Build

- Ship to a small cohort first
- Instrument before launching — define the metric you'll watch and at what threshold you'll act
- Feature flags are not optional for anything that touches a critical path

### 5. Measure

- Set a measurement window before you ship (e.g., "we'll evaluate after 2 weeks of production traffic")
- Track customer-facing outcomes, not implementation metrics
- If you can't measure it, you shouldn't have shipped it

### 6. Iterate or Kill

After the measurement window:
- **Continue**: the feature is working and worth investing in further
- **Iterate**: the direction is right but execution needs adjustment
- **Kill**: the assumption was wrong; remove it and move on

Killing a feature is not failure. Keeping a broken feature alive is.

---

## Launch Checklist

Before any customer-facing launch:

- [ ] Success metric defined and instrumented
- [ ] Feature flag in place (or explicit justification for why not)
- [ ] Documentation written (at minimum: what it does, how to use it, known limitations)
- [ ] Customer support briefed
- [ ] Rollback plan documented
- [ ] Changelog entry drafted

---

## Rollout Strategy

| Risk level | Rollout approach |
|-----------|-----------------|
| Low (UI copy, minor UX) | Direct to 100% |
| Medium (new feature, existing surface) | 10% → 50% → 100% with measurement gates |
| High (new product, payment flow, auth) | Internal → beta → controlled rollout → GA |
| Critical path (billing, data, security) | Requires explicit sign-off before any rollout |

---

## Definition of Done

A feature is done when:
1. It solves the stated customer problem
2. It is instrumented and the success metric is being tracked
3. It has documentation
4. It has a changelog entry
5. It has been through the appropriate rollout stage

"It's deployed" is not done.
