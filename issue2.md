# Issue 2 — `side-panel` style block in `SAP/fundamental-styles` (upstream)

> **Series:** Side Panel implementation · issue 2 of 12
> **Depends on:** issue 1 (agreed BEM class names)
> **Blocks:** final styling/integration of issues 3–11 (behaviour can be built against placeholders first)
> **Plan:** see [`plan.md`](./plan.md) §3, §5 > **Suggested title (in the other repo):** `feat(styles): add side-panel component` > **Estimate:** 5–8 days

## ⚠️ Different repository

This work is done in **`SAP/fundamental-styles`**, not `fundamental-ngx`. `fundamental-ngx` consumes the published package. Current version here is `0.41.9`, which has **no `side-panel` style block** (the `.fd-splitter` CSS _does_ already exist and is reused later by the splitter issues).

## Goal

Author a BEM CSS/SCSS style block for the Side Panel so the Angular component (issues 3–11) can bind to real classes instead of placeholders.

## Scope

Produce the `side-panel` style block covering the full anatomy from the Figma + [`plan.md`](./plan.md) §2:

- **Action-button bar** — vertical bar, icons-only and icons+label modes, active/hover/pressed/focus states.
- **Label panel** — fixed 320px width; overlay-on-content treatment when a content panel is open.
- **Content panel** — container, header (title + close), body.
- **Overflow** — `More`/`Less` toggle button + action-list styling; scrollable variant.
- **Count & badge** — on action buttons (two-digit count), consistent with `IconTabBar`/`icon-tab-bar` styling.
- **Single-action arrow** state.
- **Mobile full-screen** treatment (bottom bar, swipe indicator).
- **Theming:** light/dark/HC themes via design tokens; **RTL** mirroring.

Follow existing fundamental-styles conventions; reference `side-nav`, `dynamic-side-content`, and `splitter` blocks for patterns.

## Deliverables / acceptance criteria

- [ ] `.fd-side-panel*` BEM block matching the class names agreed in issue 1.
- [ ] All modes/states/anatomy above styled and visually matching the Figma.
- [ ] Light + dark + high-contrast themes, RTL verified.
- [ ] Published to npm with a version bump; version recorded here for the ngx `/adopt-styles` step.

## References

- Plan: [`plan.md`](./plan.md) §2, §3 (reuse table), §5 (prerequisite track)
- Reuse references in styles repo: `side-nav`, `dynamic-side-content`, `splitter`
- `docs/agents/fundamental-styles.md` (BEM naming, tokens) in this repo for the consumer-side conventions
