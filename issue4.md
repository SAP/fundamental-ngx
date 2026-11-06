# Issue 4 — Side Panel: display modes (icons+label, expand/collapse, single-action arrow) + count/badge

> **Series:** Side Panel implementation · issue 4 of 12
> **Depends on:** issue 3
> **Blocks:** issues 5–8
> **Plan:** [`plan.md`](./plan.md) §5 MVP tasks 2 & 5 > **Suggested title:** `feat(core): side panel display modes, count and badge` > **Estimate:** 2.5–3 days

## Goal

Add the second display mode and the special single-action layout to the action bar, plus count/badge on action buttons.

## Scope

- **Icons + label mode** (`mode="icons-label"`): labels beside icons; the **label panel has a fixed 320px width** regardless of panel width. A **collapse icon** toggles labels off (back to icons-only). When a content panel is open, the icons+text mode **expands as an overlay on top of the content** (not pushing it).
- **Expand/collapse** control to switch modes.
- **Single-action-button** special case: when there is exactly one action, the default state is an **expand/collapse arrow** (with optional **Group Name**); the arrow opens/closes that single group directly.
- **Count & badge** on action buttons: numeric count (**limit to two digits**) and badge dot. **Follow `sap.m.IconTabBar` UX** — reuse/align with `libs/platform/icon-tab-bar` count/badge rendering.

## Out of scope

Opening content & responsive layout (issue 5), overflow (issue 6), a11y hardening (issue 7).

## Reusable building blocks

`libs/platform/icon-tab-bar` (count/badge rendering reference), `libs/core/icon`, `button`.

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs only; `host: {}` (no `@HostBinding`/`@HostListener`); `@if`/`@for` only; no `standalone: true`; member ordering (decorated → signals → public → protected → private); use `fundamental-styles` **MCP** for class names; `yarn format` before validation.

## Acceptance criteria

- [ ] `mode` input toggles icons-only ↔ icons+label; label panel is a fixed 320px.
- [ ] Collapse icon returns to icons-only; icons+label overlays content when a panel is open.
- [ ] With a single action, the arrow (+ optional group name) renders and toggles the group.
- [ ] Count renders capped at two digits; badge renders; both match IconTabBar behaviour.
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` pass.

## References

Plan §2 (display modes, count & badge), §3 (reuse). `compare_components` (MCP) against `icon-tab-bar` for count/badge API.
