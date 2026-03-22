# Product Codex

Everything here should be timeless, not timely. These principles should serve [Your Org] for years to come — not forever, necessarily, but a long time.

The goal of these principles is to make it easier for every member of the company to align with how we think product should be built at [Your Org].

---

## Why We Have a Product Codex

Product decisions happen constantly — in roadmap reviews, in sprint planning, in conversations with customers, in the 11pm Slack message about whether to ship or wait. The Codex exists so that the right answer to those questions is obvious, not debated.

A good product principle is one that actually rules something out. If a principle is compatible with every possible decision, it isn't a principle — it's a platitude.

---

## The Principles

### 1. Build for Everyone, Not the Median

We are building a platform that makes capabilities previously accessible only to giants available to anyone. Features are for everyone, not just enterprise customers. When you find yourself saying "this is an advanced feature for power users only," ask whether the real problem is the feature or the default experience.

### 2. Customer Problem First

We fall in love with problems, not solutions. Before writing a spec, before wireframing, before estimating — articulate the specific customer problem being solved. If you can't state the problem in one sentence that a customer would recognize as their own, you're not ready to build.

The measure of a feature is not the number of requests. It is the magnitude of the problem it solves and the size of the audience with that problem.

### 3. Be the Default

Whatever the customer is trying to do, [Your Org] should be the answer. The goal is not to win a feature comparison — it is to be so deeply embedded in the workflow that switching never comes up.

Add features to existing products before creating new ones. Make adoption a single click. Compute and storage should shift onto the platform, not sit behind it.

### 4. Simple by Default, Powerful When Needed

The happy path should be frictionless and automatic. Intelligent defaults should make decisions for users when we have better context than they do. But experts must be able to override every default, with good reporting and insight that makes the platform's reasoning visible.

"It just works" is the highest praise. Complexity is not a feature.

### 5. Velocity Is a Feature — Reliability Is Non-Negotiable

Speed is a feature. But shipping fast does not mean shipping broken. The two are not in tension: the best teams ship faster *and* break things less.

When errors happen — and they will — the response matters more than the failure. Monitor what customers actually experience, not just internal metrics. When something breaks for a customer, don't wait for them to tell you. The changelog posts itself.

### 6. Reduce, Then Add

Half a product done well beats a full feature list done halfway. Before adding a new capability, ask whether the existing product can solve the problem with a smaller change. Say no by default. Each addition is a commitment: to maintain, to document, to support, to explain.

When you do add, make it matter. One feature that solves 80% of use cases is worth more than five that each solve 20%.

### 7. Win Developers First

Key to getting into organizations — and staying — is how developers view the product. Developer trust compounds. Earn it early and it propagates through the organization.

Easy setup. Reasonable defaults. Great documentation. APIs that make sense. SDKs that feel native. Developers will forgive rough edges in the UI if the underlying system is trustworthy and powerful.

### 8. Design for Scale from Day One

Build as if you will need it at the largest scales imaginable — because you will. Features that work at 10 users must work at 10 million without architectural surgery. Any limit built into the platform is a future incident waiting to happen.

Scale implies features are for everyone, not just the accounts that can afford a premium tier.

### 9. Stay Ahead

Customers come to us because they expect us to know what's next before they do. Innovation is what differentiates us from the commodity providers. Do not wait for the market to validate a technology before investing in it.

Living on the bleeding edge is not recklessness — it is the core of the business model.

### 10. Your Data Is a Product

The data the platform generates is itself a product. Leverage it. Use it to improve defaults, surface insights, and solve problems customers didn't know they had.

The platform that sees the most traffic learns the most. Most organizations leave this advantage unexploited. Don't.

---

## How We Ship

See the [How We Ship](./how-we-ship.md) page for detailed guidance on building and launching products at [Your Org].

---

## Living Document

These principles evolve. When we discover a better way to think about product, we update them. When a principle no longer reflects how we work, we change it.

To propose a change, submit an RFC. The Codex maintainers review and approve updates.
