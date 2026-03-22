# User Research

Research is how we close the gap between what we assume about users and what is actually true.

Every product team has assumptions about users. Research is the discipline of testing those assumptions against reality before committing to a design — and continuously afterward.

---

## The Core Principle

**We design for users we have observed, not users we have imagined.**

This is a higher bar than it sounds. It means:
- Personas built without research are fiction
- "I know what users want" is a hypothesis until tested
- Analytics tell you *what* users do, not *why*
- You cannot substitute your own experience for your users' experience

---

## Types of Research

### Generative Research (Understanding)
Used to understand users' context, needs, and mental models before designing.

- User interviews
- Contextual inquiry (observing users in their environment)
- Diary studies
- Surveys (open-ended)

**When**: At the beginning of a new product area, or when you don't understand a problem space.

### Evaluative Research (Testing)
Used to assess whether a design works for users.

- Usability testing (moderated and unmoderated)
- First-click testing
- A/B testing
- Task completion measurement

**When**: Before shipping. Not to validate that you were right — to find out what you got wrong while it's still cheap to fix.

---

## Research Standards

### Recruiting
- Recruit users who match the actual target audience, not the team's network
- Include users across the skill spectrum — beginner to expert
- Include users who rely on assistive technology for evaluative studies
- Compensate participants fairly for their time

### Asking Questions
- Ask about the past, not the future: "Tell me about the last time you tried to do X" yields more signal than "Would you use a feature that does Y?"
- Do not lead the witness: describe behavior, do not suggest the answer
- Silence is data: let users work through confusion without rescuing them

### Reporting Findings
- Report what users said and did, not your interpretation
- Include disconfirming evidence — findings that challenge the hypothesis
- Distinguish between what users said vs. what users did (these often diverge)
- Share research findings with the full product team, not only designers

---

## Minimum Research Requirements

| Design stage | Minimum bar |
|-------------|-------------|
| Defining a new feature area | 5 generative interviews |
| Evaluating a design before dev | 5 usability sessions |
| Shipping a significant flow change | Unmoderated usability test (n≥20) |
| Post-launch | Ongoing measurement of user-facing metrics |

These are floors, not ceilings. More research is almost always better than less.

---

## Research Repository

All research findings must be stored in a shared, searchable repository. Research that lives only in the researcher's head or a local file is wasted.

The repository should allow any team member to answer:
- What do we know about [user segment]?
- What research has been done on [feature area]?
- What open questions do we have about [topic]?

---

## [Scaffold] Define your research request process

**Status**: proposed

**What to fill in**: How do PMs and designers request research? What is the typical turnaround time? Who owns the research backlog?

---

## [Scaffold] Define your participant recruitment process

**Status**: proposed

**What to fill in**: How do you source research participants? Do you use a panel, a recruitment agency, or intercept from the product? What are the incentive guidelines?

---

## Research in the Age of AI

The principles above remain true. What has changed is who can do research, how fast the loop runs, and what counts as a research artifact.

### Research Is Now Every Discipline's Job

When AI can produce a working prototype in hours, the cost of building drops below the cost of a traditional research phase. This means the build→test→learn loop is now accessible to everyone — not just designers and researchers.

An engineer can spin up a prototype and test it with five users in the same afternoon. A PM can run a quick usability test before a roadmap review. Customer support already does research every day — they hear what breaks, what confuses, what users actually say when no one is presenting a polished demo. They just don't always call it research.

Research skills are learnable. They are not a credential or a department. The techniques in this document — asking about the past not the future, letting silence speak, separating what users said from what they did — can be practiced by anyone on the team.

### The New Research Stack

Not all research is equal. AI-era teams tend to work across three layers simultaneously:

| Layer | What it tells you | AI's role | Human requirement |
|-------|------------------|-----------|-------------------|
| **Synthetic** | Patterns, edge cases, competitive behavior | High — AI personas, generated scenarios, pattern analysis | Low — but validate outputs |
| **Behavioral** | What users actually do in production | Medium — AI can surface anomalies in logs, analytics, error rates | Medium — humans interpret "why" |
| **Attitudinal** | Why users do it, what they feel | Low — AI can assist synthesis but cannot replace lived experience | High — real users required |

Synthetic research (AI-generated personas, competitive analysis, pattern libraries) is fast and cheap. Use it early and often. But it carries your team's assumptions, encoded into the model it was trained on. It is Customer Zero, not a substitute for real users.

Behavioral data (analytics, session recordings, error logs, support tickets) tells you what is happening in production. It is underused. Ship fast, instrument everything, and treat production data as continuous research.

Attitudinal research (interviews, usability tests, surveys) still requires real people. This is the layer that AI compresses least. Five real users noticing the same confusion in a 30-minute session will tell you more than a hundred AI-generated personas predicting behavior.

### Ship Fast, Learn Faster

In an AI-accelerated workflow, a deployed prototype at 1% traffic is often a more powerful research instrument than a moderated usability test in a controlled setting — because it captures real intent, real context, and real failure modes.

The practice: define what you are testing *before* you ship. Not just "let's see what happens." Be specific: "We expect users to find the new filter without assistance. We will measure drop-off at that step. If it exceeds 20%, we iterate."

This is still research. It is just research done in production, with intention.

### What Still Does Not Change

Speed does not compress away the need for human validation. Three things remain true regardless of how fast AI makes execution:

1. **Synthetic users and colleagues carry your assumptions.** Real users don't. Use Customer Zero as a fast loop; use real users before you scale.
2. **You cannot observe intent from a log.** Behavioral data tells you what happened. It cannot tell you why, what the user was trying to do, or what they will do next. That requires asking.
3. **Validate before you scale.** Ship fast to learn. Fix faster once you know what's wrong. Don't ship to 100% before you've learned from 10%.
