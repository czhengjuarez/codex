# Codex as an AI Coding Tool Skill

This guide explains how to load Codex rules — Engineering, Product, and Design — into your AI coding assistant so guidance appears inline while you work.

---

## What is a "skill"?

AI coding tools like OpenCode, Cursor, and GitHub Copilot support loading custom context — rules, standards, and conventions — into the assistant's system prompt. This turns the Codex from a document you read once into guidance that shows up automatically during code review, design critique, spec writing, and generation.

The Codex covers three domains. Load what's relevant to what you're doing:

| Codex | What to load | When |
|-------|-------------|------|
| Engineering | `domains/*.md` | Code review, refactoring, architecture |
| Product | `product/*.md` | Spec writing, roadmap decisions, discovery |
| Design | `design/*.md` | UI review, research planning, accessibility audits |

Load all three if you work across disciplines — the rules don't conflict.

---

## OpenCode

[OpenCode](https://opencode.ai) is a Claude-based CLI coding assistant that supports skills via markdown files.

### Installation

1. Create a skill directory:

```bash
mkdir -p ~/.config/opencode/skills/codex
```

2. Create `~/.config/opencode/skills/codex/SKILL.md`:

```markdown
# [Your Org] Codex

You are an expert at software engineering, product management, and design at [Your Org].
When reviewing or generating work in [Your codebase name], apply the following standards.

Our primary design system is [Your design system].

## How to apply these rules

- Surface relevant rules when reviewing code, specs, or designs
- Flag violations with the rule ID (e.g., "RELIABILITY-002: this call is missing a timeout")
- Suggest compliant alternatives when you flag a violation
- Apply Engineering rules to code, Product rules to specs and decisions, Design rules to UI and research

## Engineering Standards
# --- paste domains content here ---

## Product Standards
# --- paste product content here ---

## Design Standards
# --- paste design content here ---
```

3. Concatenate all Codex content into the skill:

```bash
echo "# Engineering Codex" >> ~/.config/opencode/skills/codex/rules.md
cat /path/to/codex/domains/*.md >> ~/.config/opencode/skills/codex/rules.md

echo "# Product Codex" >> ~/.config/opencode/skills/codex/rules.md
cat /path/to/codex/product/*.md >> ~/.config/opencode/skills/codex/rules.md

echo "# Design Codex" >> ~/.config/opencode/skills/codex/rules.md
cat /path/to/codex/design/*.md >> ~/.config/opencode/skills/codex/rules.md
```

### Usage examples

```
review this diff for Codex violations
does this spec follow our product principles?
check this component against our design and accessibility standards
write a retry function following our reliability standards
```

---

## Cursor

1. Create or open `.cursorrules` at your repo root.
2. Add context for the relevant codexes:

```
You are an expert at [Your Org]'s engineering, product, and design standards.

## Engineering rules
# --- paste domains content here ---

## Product rules
# --- paste product content here ---

## Design rules
# --- paste design content here ---
```

Or reference files directly using Cursor's `@file` syntax:

```
@file:codex/domains/reliability.md
@file:codex/product/overview.md
@file:codex/design/accessibility.md
```

### Keeping rules current

```bash
#!/bin/bash
# scripts/update-cursorrules.sh
{
  echo "# [Your Org] Codex — Auto-generated. Do not edit manually."
  echo "## Engineering"
  cat codex/domains/*.md
  echo "## Product"
  cat codex/product/*.md
  echo "## Design"
  cat codex/design/*.md
} > .cursorrules
```

---

## GitHub Copilot

Copilot supports custom instructions via `.github/copilot-instructions.md`.

```markdown
# [Your Org] Standards

When generating or reviewing work in this repository, apply the following standards.

## Engineering
- All external calls must have explicit timeouts (RELIABILITY-002)
- Never hardcode secrets (SECURITY-001)
- Validate all external input (SECURITY-002)
- [Your codebase name] uses [Your design system] — prefer its components

## Product
- Center customer problems, not feature requests
- Define the success metric before shipping, not after
- Validate before you scale: learn from 10% before shipping to 100%

## Design
- Impact over intention — measure what users experience, not what was designed
- Accessible by default — WCAG 2.1 AA minimum on all new interfaces
- Don't test only with synthetic users — real users don't carry your assumptions

[Add more rules relevant to this repo]
```

**Note**: Copilot instructions work best when concise. Pick the 10–20 most relevant rules per repo. Cross-discipline teams should include rules from all three codexes.

---

## Automating rule updates

Add a GitHub Action to regenerate skill files when Codex content changes:

```yaml
# .github/workflows/update-codex-skills.yml
name: Update Codex Skills
on:
  push:
    paths:
      - 'domains/**'
      - 'product/**'
      - 'design/**'

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Regenerate .cursorrules
        run: bash scripts/update-cursorrules.sh
      - name: Commit if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .cursorrules
          git diff --cached --quiet || git commit -m "chore: update codex skill files"
          git push
```

---

## Rule severity in AI context

| Status | AI behavior |
|--------|-------------|
| `approved` | Flag violations; suggest fixes |
| `proposed` (scaffold) | Mention as a suggestion; do not block |
| `deprecated` | Do not enforce; mention the replacement |
