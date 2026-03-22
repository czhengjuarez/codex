# Design Codex

Design mediates so much of our users' realities. The decisions we make about interfaces, flows, defaults, and feedback have a direct impact on people's ability to accomplish things that matter to them — or their failure to do so.

This Codex is about how we think about design at [Your Org]. It is not a style guide. Style guides tell you which button color to use. This tells you *why* the choices matter and *who* we are designing for.

---

## The Designer's Responsibility

Design is not decoration. It is not making things pretty. Design is the act of making decisions on behalf of users who will not be in the room when those decisions are made.

That responsibility has three layers:

1. **To the user** — The experience must serve the person using it. Their time, attention, and trust are not ours to waste.
2. **To the organization** — Design must contribute to sustainable business outcomes. A product that users love but the business can't sustain helps no one.
3. **To society** — Design at scale shapes behavior, normalizes patterns, and excludes or includes entire populations. This is not abstract. It is a consequence of every decision.

When these responsibilities conflict — and they will — the order above is the tiebreaker. Not always. But when in doubt: the user first.

---

## Principles

### 1. Center User Needs, Not User Requests

Users tell you what they want. Your job is to understand what they need. These are often different.

A user asking for "a faster horse" needs reliable transportation. A user asking for "more filters" needs to find the right item. Listen carefully to what users say, then dig deeper to understand the underlying need. The request is a symptom. The need is the diagnosis.

Design for the need, not the request. Validate by observing behavior, not just collecting opinions.

### 2. Impact Over Intention

The measure of a design is not what the designer intended — it is what the user experiences. Good intentions do not excuse bad outcomes.

When a design is confusing, the user is not wrong. When an error message is cryptic, the user is not unsophisticated. When a flow causes abandonment, the conversion rate is not a UX problem to be blamed on "user behavior."

Design must own its outcomes. Measure what actually happens to users, not what was designed to happen.

### 3. Care for the Marginal User

Optimizing for the median user guarantees a poor experience for everyone else. The marginal user — the one who is less technically fluent, using assistive technology, working in a second language, on a slow connection, or under cognitive load — is not an edge case. They are a test of whether your design actually works.

When you design for the most constrained user, you often improve the experience for everyone.

**In practice:**
- Contrast ratios, keyboard navigation, and screen reader compatibility are not optional
- Error states deserve as much design attention as the happy path
- Onboarding flows must assume no prior knowledge
- Language must be plain. Jargon is a barrier.

### 4. Balancing Business Needs and Customer Needs

Design sits at the intersection of what users need and what the organization needs to sustain itself. This tension is real and should not be pretended away.

The temptation is to resolve it by subordinating one to the other. Neither extreme works:

- **Users first, always** leads to designs that are loved but unsustainable
- **Business first, always** leads to dark patterns, eroded trust, and eventual churn

The resolution is to find designs that serve both — and to be honest when they cannot. When a business need and a user need are genuinely incompatible, escalate it as a product decision, not a design decision. Design should not be the place where ethical tradeoffs are hidden.

**The test:** Would you be comfortable if the users affected by this design decision could see exactly how it was made and why?

### 5. Invite Collaboration, Not Just Feedback

No one person owns the quality of a user experience. In a world where engineers ship features, PMs write copy, and AI tools let anyone prototype in minutes, design is no longer a gatekeeper role — it is a shared responsibility.

Design decisions made in isolation — without testing, without other perspectives — are bets, not conclusions. The goal is to create conditions for learning, across the whole team, fast enough that the learning is cheap.

In an AI-accelerated world, a working prototype can exist in hours. This changes what "research first" means. The old model — research → design → build — assumed building was expensive. It no longer always is. The better model:

**Prototype fast → put it in front of users → iterate.**

Research and building are interleaved, not sequential. A prototype is itself a research tool. Ship it internally, run it past five users, watch what breaks. Then fix it and go again. This is still the designer-as-facilitator model — it just runs at a faster cadence.

What does not change:
- **Don't test only with synthetic users or colleagues.** Colleagues and AI-generated personas can be useful as Customer Zero (the first internal user who experiences something before it reaches the public) — a first pass, a sanity check, a fast loop. But they carry your team's assumptions. Real users don't. The signal you get from a colleague who understands your roadmap is fundamentally different from the signal you get from a user who just wants to get something done.
- **Present options, not one correct answer.** Facilitators create space for decisions to be made with evidence, not by fiat.
- **Collaboration over invitation.** In a world where engineers, PMs, and support reps all ship product — often with AI assistance — design is no longer a role, it's a responsibility shared across the team. Don't invite people to give feedback on *your* design. Collaborate on *our* design. The quality of the experience belongs to everyone who touched it, no matter who opened the file first.
- **Validate before you scale.** Ship fast to learn. Fix faster once you know what's wrong. Don't ship to 100% before you've learned from 10%.

### 6. Design Quality Is a Shared Responsibility

Design quality is not solely the designer's problem. Engineers who implement interactions, PMs who define scope, writers who own the copy, and customer support who hears what breaks — all contribute to the quality of the user experience.

UX debt accrues when any of these roles cut corners under time pressure. Like technical debt, it compounds: a confusing label today becomes a support ticket tomorrow, a broken trust next quarter, and a churned user eventually.

**Every shortcut has a cost.** Not paying it now means paying more later, with interest.

Track UX issues the same way you track technical debt. Prioritize them with the same rigor. Fix them on a cadence, not only when they become crises.

### 7. Consistency Enables Trust, Not Conformity

A consistent design system is not a constraint on creativity. It is what allows users to build mental models of how your product works — and to trust that those models are reliable.

Inconsistency wastes users' cognitive bandwidth. Every deviation from an established pattern requires the user to re-learn something they thought they knew.

Deviate from the design system deliberately and visibly. Document the reason. If you find yourself deviating frequently, the system needs to evolve — not the exception list.

### 8. Accessible by Default

Accessibility is not a compliance checkbox applied after design is complete. It is a design constraint that shapes every decision from the beginning.

Minimum bar:
- WCAG 2.1 AA for all new and updated interfaces
- Keyboard-navigable flows without mouse dependency
- Screen reader compatibility for all interactive elements
- Color is never the only means of conveying information

Accessible design is good design. Every accessibility improvement reduces friction for all users, not just those with disabilities.

### 9. Measure What Users Experience, Not What You Built

A shipped design is a hypothesis. The hypothesis is: "This design will help users accomplish [goal]."

Define the measure of success before you ship — not after. The measure should be user-facing: task completion rate, time to completion, error rate, satisfaction score. Not "it's live" or "stakeholders approved it."

Review designs against their intended outcomes. When outcomes don't match the hypothesis, update the design. This is not failure. Designing and not measuring is failure.

### 10. DesignOps: Protect Design's Capacity to Do Its Job

The operational layer of design — how teams are organized, how work flows, how tools are maintained, how quality is measured — is not administrative overhead. It is what determines whether design can actually function at scale.

Three questions determine whether design is operationally healthy:
1. **How we work together**: Are team structures, collaboration practices, and career paths designed intentionally?
2. **How we get work done**: Do we have shared standards, accessible research, and efficient workflows?
3. **How our work creates impact**: Do we measure design quality, share learning, and educate partners?

When design operations are neglected, designers are too busy to design. The Codex cannot function without the conditions that allow it to be applied.

---

## Living Document

These principles evolve as our understanding of users and our products deepens. To propose a change, submit an RFC. The Codex maintainers review and approve updates.
