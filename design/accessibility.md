# Accessibility

Accessibility is not a feature. It is the baseline expectation that every user — regardless of ability, device, connection, or context — can use what we build.

Inaccessible design is exclusion. At scale, exclusion is not an edge case: it is a policy.

---

## The Standard

All new and updated interfaces must meet **WCAG 2.1 Level AA**. This is the minimum, not the aspiration.

| Criterion | Requirement |
|-----------|-------------|
| Color contrast (normal text) | ≥ 4.5:1 |
| Color contrast (large text, 18pt+) | ≥ 3:1 |
| Color contrast (UI components, icons) | ≥ 3:1 |
| Keyboard navigation | All interactive elements reachable and operable |
| Focus indicators | Visible on all focusable elements |
| Screen reader | All content and interactions programmatically accessible |
| Color as information | Color must never be the sole means of conveying meaning |
| Text alternatives | All non-text content has a text alternative |
| Error identification | Errors are identified in text, not only by color or icon |

---

## Responsibilities

### Designers
- Specify contrast ratios in designs, not just colors
- Design focus states explicitly — don't leave them to browser defaults
- Design error states that communicate what went wrong and how to fix it in plain text
- Include states for empty, loading, error, and success — not only the happy path
- Label interactive elements with meaningful text (no "click here")

### Engineers
- Implement semantic HTML — use the right element for the right purpose
- Do not remove outline/focus styling without replacing it
- Test keyboard navigation on every new feature before shipping
- Use ARIA attributes only when semantic HTML is insufficient, and use them correctly
- Test with a screen reader (VoiceOver on macOS, NVDA on Windows) before shipping

### Product
- Accessibility is in the definition of done — not a post-launch fix
- User testing must include users with disabilities on a regular cadence, not only when an accessibility issue is escalated
- Accessibility issues are bugs, not backlog items

---

## Common Failures to Avoid

| Failure | Why it matters |
|---------|---------------|
| Low color contrast | Affects users with low vision or in bright sunlight |
| Missing alt text on images | Screen readers skip or misread images |
| Icon-only buttons with no label | Screen reader users hear "button" with no context |
| Form fields without visible labels | Placeholder text disappears on input |
| Modals that trap keyboard focus | Keyboard users cannot escape |
| Disabled buttons with no explanation | Users don't know why an action is unavailable |
| Error messages in red with no text | Color-blind users cannot identify the error |
| Autoplay video/audio | Disorienting for users with vestibular disorders; intrusive for all |

---

## Testing Accessibility

Manual testing is required. Automated tools catch ~30% of accessibility issues.

### Automated (run in CI)
- [axe-core](https://github.com/dequelabs/axe-core) integrated into component tests
- Lighthouse accessibility audit in the pipeline

### Manual (before every significant launch)
- Keyboard-only navigation: can you complete the primary flow without a mouse?
- Screen reader walkthrough: does the experience make sense without visuals?
- 200% zoom: does the layout survive without horizontal scrolling?
- High-contrast mode: does the UI remain usable?

---

## [Scaffold] Define your accessibility review process

**Status**: proposed

**What to fill in**: At what point in the design/development process does an accessibility review happen? Who is responsible for it? Is there a dedicated accessibility specialist, or is it distributed across the team?

---

## [Scaffold] Define your assistive technology testing matrix

**Status**: proposed

**What to fill in**: Which screen readers, browsers, and operating systems are in scope for testing? (e.g., VoiceOver + Safari on macOS, NVDA + Chrome on Windows, TalkBack on Android)
