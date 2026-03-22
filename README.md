# Codex Template

A living, version-controlled set of standards covering engineering, product, and design.
Fork this repo, adapt the content to your organization, and integrate it into your AI tools.

> **A note on how this was made:** This template was created by humans, but with the aid of an LLM. Where you see structured sections and suggested guidance — apply judgment. Was that content actually useful, or did the model fill in a blank because the template had one? If a section doesn't serve the reader, it shouldn't exist.

---

## What this is

The Codex is a structured collection of **principles and standards** organized across three disciplines:

| Codex | What it covers |
|-------|---------------|
| **Engineering** | Code quality, reliability, security, language-specific standards, tooling decisions |
| **Product** | How we define problems, prioritize, discover, and ship |
| **Design** | Design principles, user research, accessibility, and design operations |

Each codex integrates with your AI coding tools so guidance shows up where people actually work — not in a document nobody reads.

---

## Structure

```
codex/
├── README.md                    # This file
├── CONTRIBUTING.md              # How to propose changes
├── rfc-template.md              # How to write and submit an RFC
├── LICENSE
│
├── governance/                  # Applies to all three codexes
│   ├── rfc-process.md           # How content is proposed, reviewed, and approved
│   └── review-policy.md         # Roles, quorum, conflict resolution, escalation
│
├── domains/                     # Engineering Codex
│   ├── ai.md                    # AI/LLM usage, infrastructure, responsible AI
│   ├── api-design.md            # REST, gRPC, versioning, pagination
│   ├── code-quality.md          # Review standards, naming, testing, tech debt
│   ├── control-plane.md         # Config management, rollouts, failure states
│   ├── data-management.md       # Storage, migrations, transactions, encryption
│   ├── dependencies.md          # Supply chain, lock files, vulnerability management
│   ├── documentation.md         # Code comments, docstrings, ADRs, READMEs
│   ├── python.md                # Python tooling, types, ML/data stack
│   ├── reliability.md           # SLOs, incidents, dependency cataloguing, break glass
│   ├── rust.md                  # Rust error handling, safety, tooling
│   ├── security.md              # Secrets, input validation, auth, access control
│   └── typescript.md            # TypeScript types, error handling, resilience, observability
│
├── product/                     # Product Codex
│   ├── overview.md              # 10 product principles
│   ├── how-we-ship.md           # From idea to shipped: discovery, definition, measurement
│   └── discovery.md             # User research, prototyping, validation
│
├── design/                      # Design Codex
│   ├── overview.md              # 10 design principles including care for the marginal user
│   ├── accessibility.md         # WCAG 2.1 AA standards, role responsibilities, testing
│   └── research.md              # Research types, standards, and AI-era research practices
│
└── skills/
    └── opencode-skill.md        # How to load all three codexes into AI coding tools
```

---

## How to use this template

### 1. Fork and clone

```bash
git clone https://github.com/your-org/codex
```

### 2. Fill in the placeholders

Search for these tokens and replace them throughout the repo:

| Placeholder | Replace with |
|-------------|-------------|
| `[Your Org]` | Your organization name |
| `[Your codebase name]` | Your primary codebase or monorepo |
| `[Your design system]` | Your internal design system |
| `[define yours]` | Your org's specific tool, library, or standard |

```bash
# Find all placeholders
grep -rn "\[Your Org\]\|\[Your codebase name\]\|\[define yours\]" domains/ product/ design/
```

### 3. Adapt to your stack

- Replace `rust.md` with `go.md` if you use Go instead
- Add `mobile.md`, `ios.md`, or `android.md` for mobile teams
- Add or remove product and design pages to match your team structure
- The `[define yours]` entries in `domains/python.md` and `domains/typescript.md` are tooling decision tables — fill them in with your standard libraries

### 4. Run the web app

```bash
cd web
npm install
npm run dev
```

Opens at `http://localhost:3000`. The app reads content from the markdown files at runtime.

**Important for Contributors**: Do **NOT** edit `web/app/page.tsx` or other React code to add content. To contribute, simply create or edit `.md` files in the `domains/`, `product/`, `design/`, or `governance/` folders. The Next.js server will automatically render them. If you add a completely new file, you may need to restart `npm run dev`.

### 5. Deployment

This project is configured to statically export and deploy automatically to Cloudflare Workers manually or via CI.

To deploy manually via Wrangler:
```bash
cd web
npm run build
npx wrangler deploy
```

### 6. Integrate with AI tools

See [`skills/opencode-skill.md`](skills/opencode-skill.md) for setup instructions covering:
- [OpenCode](https://opencode.ai) — Claude-based CLI assistant
- Cursor
- GitHub Copilot

Load Engineering, Product, and Design rules together for cross-discipline teams.

### 7. Set up governance

Use [`governance/rfc-process.md`](governance/rfc-process.md) and [`governance/review-policy.md`](governance/review-policy.md) to establish how your team proposes, reviews, and approves changes.

---

## Engineering rule format

Rules in `domains/` follow this format:

```markdown
### DOMAIN-NNN: Rule title

**Rule**: One imperative sentence — what to do or not do.

**Rationale**: Why this rule exists. What problem it prevents.

**Good example**:
\`\`\`language
// correct approach
\`\`\`

**Bad example**:
\`\`\`language
// what to avoid
\`\`\`

**Notes**: Optional. Exceptions, related rules, or further reading.
```

The `[Scaffold]` entries are placeholders — fill them in or delete them.

---

## Integrating with CI

Load Codex content into an AI review tool on every PR:

```yaml
# .github/workflows/codex-review.yml
name: Codex Review
on: [pull_request]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Codex context
        run: |
          cat domains/*.md product/*.md design/*.md > /tmp/codex-context.md
      # Pass /tmp/codex-context.md to your AI review tool
```

---

## License

[MIT](LICENSE) — fork freely, adapt to your organization.
