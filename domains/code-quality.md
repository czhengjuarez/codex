# Code Quality Domain

Rules for writing readable, reviewable, and maintainable code.


---

### CQ-001: Keep functions and methods small and single-purpose


**Rule**: Functions should do one thing. If a function requires a comment explaining what each "section" does, it should be split into smaller, named functions.

**Rationale**: Small, single-purpose functions are easier to read, test, name, and reuse. Long functions with multiple responsibilities are the primary source of complexity debt.

**Good example**:
```python
def validate_order(order: Order) -> None:
    validate_items(order.items)
    validate_shipping_address(order.address)
    validate_payment_method(order.payment)

def validate_items(items: list[OrderItem]) -> None:
    if not items:
        raise ValidationError("Order must contain at least one item")
    for item in items:
        validate_item_quantity(item)
```

**Bad example**:
```python
def process_order(order):
    # Validate items
    if not order['items']:
        raise Exception("no items")
    for item in order['items']:
        if item['qty'] <= 0:
            raise Exception("bad qty")
    # Validate address
    if not order['address'].get('zip'):
        raise Exception("no zip")
    # Charge payment
    stripe.charge(order['payment_token'], order['total'])
    # Send confirmation
    email.send(order['email'], "Order confirmed")
    # Update inventory
    ...
```


### CQ-002: Write tests before merging new behavior


**Rule**: Every PR that introduces new behavior must include tests covering the new code paths. PRs that reduce overall test coverage require explicit justification.

**Rationale**: Tests are not optional documentation — they are executable contracts. Untested code is a maintenance liability that grows silently.


### CQ-003: Prefer explicit over implicit


**Rule**: Write code that is explicit about its intent. Avoid "magic" behavior, overly clever abstractions, and implicit control flow that requires deep knowledge of the framework to understand.

**Rationale**: Code is read far more than it is written. Explicit code is easier to debug, review, and hand off. Implicit behavior is a common source of onboarding friction and subtle bugs.

**Good example**:
```python
# Explicit: reader knows exactly what happens
user = get_user_by_id(user_id)
if user is None:
    raise UserNotFoundError(user_id)
send_welcome_email(user.email)
```

**Bad example**:
```python
# Implicit: reader must understand the decorator chain and magic __getattr__
@auto_send_welcome
@require_user
def onboard(user_id):
    pass
```


### CQ-004: Name things by what they are, not how they are implemented


**Rule**: Variable, function, and class names should describe what they represent or do, not how they are implemented. Avoid names like `data`, `info`, `manager`, `helper`, or `utils` without qualification.

**Good example**:
```python
def fetch_active_users(since: datetime) -> list[User]: ...
active_users = fetch_active_users(last_week)
```

**Bad example**:
```python
def get_data(ts): ...       # what data? what ts?
result = get_data(t)        # completely opaque
```


### CQ-005: Do not leave dead code in the codebase


**Rule**: Commented-out code, unused functions, unreachable branches, and TODO comments older than 90 days must be removed. If code might be needed in the future, track it in an issue, not in the source.

**Rationale**: Dead code confuses readers, inflates search results, and creates false impressions of what the system does. It accretes over time into significant maintenance burden.


### CQ-006: Keep PR diffs reviewable


**Rule**: Pull requests should be scoped to a single logical change. PRs with more than 400 lines of non-generated changes should be split unless there is a clear technical reason they cannot be.

**Rationale**: Large PRs are reviewed superficially or not at all. Smaller, focused PRs get better feedback, merge faster, and produce a more useful git history.


### CQ-007: Write commit messages that explain why, not what


**Rule**: Commit message subjects must be imperative and describe the change's intent. The body should explain why the change was made when the reason is not obvious from the diff.

**Good example**:
```
Fix race condition in session expiry handler

Session tokens could be double-invalidated when a user logged out
while a background job was expiring idle sessions. This caused
spurious 401s on the next request. Now the expiry job checks the
token's invalidation state before acting.
```

**Bad example**:
```
fix bug
```


### CQ-008: Use [Your design system] components for all UI work


**Rule**: <!-- Replace [Your design system] with your org's design system name. All UI components must use [Your design system] primitives. Custom one-off components require design review before merging. -->

**Rationale**: <!-- Consistency across [Your codebase name] depends on a shared component library. Diverging from [Your design system] creates visual inconsistency, doubles accessibility effort, and increases maintenance burden. -->

**Good example**:
```tsx
// Use [Your design system] button
import { Button } from '@your-org/design-system';
<Button variant="primary" onClick={handleSubmit}>Submit</Button>
```

**Bad example**:
```tsx
// Custom one-off button — bypasses [Your design system]
<button className="my-custom-btn" onClick={handleSubmit}>Submit</button>
```

**Notes**: Replace `[Your design system]` and `[Your codebase name]` with your actual names before marking this rule approved.


### CQ-009: [Scaffold] Define code review turnaround expectations


**Rule**: <!-- Define your org's expected response time for PR reviews (e.g., 1 business day) -->


### CQ-010: [Scaffold] Define required automated checks before merge


**Rule**: <!-- Define which CI checks must pass before a PR can be merged (lint, tests, type checks, coverage thresholds) -->


### CQ-011: [Scaffold] Define static analysis tool requirements


**Rule**: <!-- Define which static analysis tools are required (e.g., SonarQube, CodeClimate, semgrep) -->


### CQ-012: [Scaffold] Define complexity and coupling limits


**Rule**: <!-- Define thresholds for cyclomatic complexity and coupling (e.g., max cyclomatic complexity of 10 per function) -->


### CQ-013: [Scaffold] Define standards for generated code


**Rule**: <!-- Define how generated code is marked, excluded from linting, and kept in sync with its source -->


### CQ-014: [Scaffold] Define refactoring vs. feature separation policy


**Rule**: <!-- Define whether refactoring and feature changes should be separated into distinct PRs -->


### CQ-015: [Scaffold] Define pair programming or ensemble coding norms


**Rule**: <!-- Define when pair or mob programming is expected or encouraged -->


### CQ-016: [Scaffold] Define standards for handling technical debt


**Rule**: <!-- Define how technical debt is tracked, prioritized, and scheduled for repayment -->
