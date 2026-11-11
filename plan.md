# Side Panel — Implementation Plan

> **Source spec:** Figma – Side Panel (UX spec) > **Status:** Scoping / rough plan + estimate
> **Equivalent SAP control:** `sap.f.SidePanel` (SAPUI5 / OpenUI5)

---

## 1. What the component is

A **Side Panel** is a container anchored to the (usually right) edge of an app page. It is reached via a vertical **action-button bar**; each action button represents a group of content. Clicking a button opens the related content in a panel beside the main page content. It is a close conceptual match to SAPUI5's `sap.f.SidePanel`.

Confirmed anatomy (from the prototype "Application page" screen): vertical action bar on the right (`Filter`, `Layout`, `Attachments`, `Tasks`, `Activity`, `Comments`, `Contacts`, `Database`, …), a `More` overflow at the bottom, an expand/collapse chevron at the top, and a content panel that opens to the left of the bar.

The Figma file has three pages, all read:

- **UX Specifications** — the full behavioural spec (anatomy, states, responsiveness, overflow, splitter, accessibility, mobile).
- **Prototype Web** — interactive prototype screens assembling the component into an app page.
- **Archive** — superseded material (ignore).

## 2. Spec summary (behaviour to build)

### Action-button bar — two display modes

- **Icons only** (default) — each icon = a content group. Tooltip on hover/focus reveals the group name.
- **Icons + label** — adds text labels; the label panel has a **fixed 320px width** regardless of panel width. Collapse icon toggles labels off (back to icons-only). When a content panel is open, the icons+text mode expands as an **overlay on top of the content**.

### Content panel

- Click an action button → opens the related content group in the panel. Close via the close icon or by clicking the highlighted (active) action button again.
- **Single action button** special case: the default state is an **expand/collapse arrow** (optionally with a Group Name). Arrow opens/closes the one content group directly.

### Overflow (two supported strategies — both in the spec)

- **Toggle overflow** (`More` / `Less`): the panel auto-calculates how many action buttons fit the available height; if item count > available height, a `More`/`Less` toggle button appears and opens an **action list** (popover/menu). Supports up to **18** action buttons. List closes on toggle, action click, outside click, or `Esc`. Navigable by mouse and arrow keys. Same behaviour when the panel is expanded. **Follow `sap.m.IconTabBar` UX** (overflow + count/badge). _(Verbatim, node `1139:319345` — "Icons Overflow" frame.)_
- **Scrollable**: standard scroll instead of overflow; supports up to **20** action buttons. _(Verbatim, node `1139:320443` — "Scrollable panel" frame.)_

### Count & badge

- Count and badge can be displayed on action buttons. **Limit count to two digits.** UX/a11y should follow `sap.m.IconTabBar`.

### Responsive splitter (resize)

- A **16px** responsive splitter (SAPUI5 `sap.ui.layout.ResponsiveSplitter`) lets users resize the panel.
- Move by click-drag, or by keyboard **step sizes** (10px regular / 100px large; step size app-configurable).
- **Double-click** cycles width: **Default → Max-Width → Min-Width → Default**.
- **Right-click** (splitter or anywhere in the panel) opens a **context menu** to set width to Max / Min / Default.
- Widths: **Min** = 15% of screen (overridable, higher preferred), **Max** = 90% of screen (overridable); if both a left and right side panel exist, expanded max ≤ 50%. `Collapsed`, `Default`, `Expanded` widths are all app-definable.

### Responsive behaviour (layout)

- **≥ 1440px screen**: panel **pushes** main content (they coexist side-by-side). _(Verbatim, node `402:264791`.)_
- Below that: panel opens as an **overlay**.
- **Panel width** (not screen width): the spec shows "220px example" / "560px example" with the notes _"Opens fully from 220px to 560px"_ and _"561px and up opens in default width"_ (nodes `2542:168791`, `2543:168794`). These sit next to Collapsed/Default/Expanded Width, so they appear to describe the **panel's own width** behaviour, not screen breakpoints. **Exact semantics to confirm with the designer** (see open questions).
- **Height responsiveness**: when the page's main header collapses on scroll, the panel height expands simultaneously.
- **Scroll**: default icons+text; scrolling down collapses to icons-only; scrolling up re-expands.
- **Tablet**: content pushes main content (same as desktop).
- **RTL**: supported — the panel and action bar mirror (a left-anchored panel in LTR becomes right-anchored in RTL, splitter drag direction inverts).

### Mobile — full-screen mode

- Action buttons sit at the **bottom** of the app page. Clicking opens the panel **full screen**. Same scroll-collapse behaviour. Close via close button or a **swipe indicator**.

### Accessibility

- Full keyboard support (shortcuts spec'd in the file; splitter interaction references "Splitter Accessibility" page 210).
- Screen-reader control types table provided (Mac + Windows).
- Count/badge and overflow a11y follow `sap.m.IconTabBar`.
- Tooltips always appear on focus and hover.

## 3. What we can reuse (codebase audit)

No existing `side-panel` component in `libs/core` or `libs/platform`. However, strong building blocks exist:

| Need                                         | Reuse                                                       | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Responsive side/main layout, push vs overlay | `libs/core/dynamic-side-content`                            | Reference for responsive main/side coexistence + breakpoints.                                                                                                                                                                                                                                                                                                                                                                                          |
| Vertical icon nav pattern                    | `libs/core/side-navigation`, `vertical-navigation`          | Pattern reference for the action bar.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Overflow calc + count/badge**              | `libs/platform/icon-tab-bar` (`icon-tab-bar-base.class.ts`) | Spec explicitly says follow `sap.m.IconTabBar`. Reuse/extract the overflow item-count calculation and count/badge logic.                                                                                                                                                                                                                                                                                                                               |
| Overflow action list                         | `libs/core/popover` + `libs/core/menu`/`list`               | For the `More` action list with arrow-key nav + `Esc`.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Icons, buttons, tooltip                      | `libs/core/icon`, `button`, `toolbar`                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Scrolling                                    | `libs/core/scrollbar`                                       | Scrollable overflow strategy.                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Context menu                                 | `libs/core/menu` (contextual)                               | Right-click width menu.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Splitter (resize)**                        | `libs/btp/splitter` (`fdb-splitter`) + `.fd-splitter` CSS   | An existing Angular splitter with drag resize, keyboard + `role="separator"` a11y, RTL, responsive pane hide/show, and pagination. **Cannot be imported by a core/platform component** (`btp` is below them in the dependency graph), so it will be **promoted to `libs/core` as `fd-splitter`**, modernized to signals, and extended (see §4). Missing today: configurable 10/100px keyboard steps, double-click width cycle, explicit min/max clamp. |

**Key gap:** `fundamental-styles` 0.41.9 has **no dedicated `side-panel` style block** (the `.fd-splitter` CSS does exist). We should confirm whether upstream intends to add one (`adopt-styles` territory) or whether we compose from existing styles. Promoting + extending the splitter (step sizes, double-click cycle, min/max, signal migration, btp back-compat) is the single largest net-new piece.

## 4. Architecture recommendation

- **Home: `libs/core` → `fd-side-panel`** (decided: **core only**, no platform wrapper for v1), matching `dynamic-side-content` / `side-navigation` (both core composites). Content-projection API with structural directives.
- **Splitter: promote the existing `libs/btp/splitter` (`fdb-splitter`) into `libs/core` as `fd-splitter`** (decided), modernize it to signal conventions, and add the missing features (configurable 10/100px keyboard steps, double-click Default→Max→Min cycle, explicit min/max clamp). `btp` re-exports it for back-compat. A core home is **required** because `fd-side-panel` is in `libs/core` and `core` cannot depend on `btp` (enforced boundaries: `scope:fd` → only `cdk`/`i18n`). This also gives the library a general splitter primitive other components can adopt.
- **RTL**: first-class requirement (decided) — mirror the action bar/panel side and invert splitter drag direction; test in RTL.

Proposed public shape (to be finalised in design phase):

- `fd-side-panel` host — inputs: `side` (`left`|`right`), `mode` (`icons`|`icons-label`), `overflowMode` (`toggle`|`scroll`), `open`, `activeItem`, `defaultWidth`/`minWidth`/`maxWidth`, `resizable`, `pushBreakpoint`.
- `*fdSidePanelAction` / `fd-side-panel-action` items — `icon`, `label`, `count`, `badge`, `disabled`.
- `*fdSidePanelContent` for the projected content per group.
- Outputs: `openChange`, `activeItemChange`, `widthChange`.

## 5. Implementation phases & estimates

Estimates are **engineer-days** for one experienced Angular/fundamental-ngx developer. They assume familiarity with the signal-based patterns in `CLAUDE.md`.

### Phase 0 — API design & spec finalisation — **1–2 d**

Confirm public API, naming, and the remaining open questions below. Align with a designer/maintainer on the fundamental-styles track.

### Prerequisite track — `fundamental-styles` side-panel block (SEPARATE REPO, runs in PARALLEL) — **~5–8 d**

`fundamental-styles` 0.41.9 has **no `side-panel` style block** (the `.fd-splitter` CSS does exist). A BEM style block must be authored upstream in the **separate `SAP/fundamental-styles` repo**: action bar, icons-only / icons+label modes, content panel, overflow, counts/badges, states, mobile. Estimate ~5–8 d for someone familiar with that repo.

**Can the NGX MVP start before the styles land? Yes — and the two tracks should run in parallel:**

- **Person A (fundamental-styles repo):** authors the `side-panel` style block.
- **Person B (fundamental-ngx, this repo):** builds the component **behaviour, structure, and API** against composed existing classes / temporary local SCSS placeholders. Behaviour (open/close, overflow calc, resize, responsive, a11y) does not depend on the final visual styles.
- **Integrate** when the styles ship: swap placeholder classes for the real `.fd-side-panel*` classes via `/adopt-styles`. Budget a small reconciliation cost (~1–2 d, folded into Phase 3/polish).

So the styles work is a **parallel dependency**, not a hard serial blocker. Making it serial would push the NGX start back by ~1–1.5 weeks; parallelising avoids that. The only true blocker is **Phase 0 API/visual agreement**, which both people need first.

### MVP (Web, no responsive splitter)

| #                | Task                                                                                                                                                         | Est.         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| 1                | Scaffold: component, module, `index.ts`, scss, action-bar + action buttons (icons-only)                                                                      | 2–3 d        |
| 2                | Icons+label mode (320px label panel), expand/collapse, single-button arrow mode                                                                              | 2 d          |
| 3                | Content panel open/close, active-item highlight, overlay-vs-push layout (≥1440 push / below overlay), default/min/max widths, **RTL mirroring**              | 3–4 d        |
| 4                | Overflow: `More`/`Less` toggle + popover action list (arrow keys, `Esc`, outside-click); auto item-count calc; scrollable variant (reuse icon-tab-bar logic) | 3–4 d        |
| 5                | Count & badge (follow IconTabBar), tooltips on hover/focus                                                                                                   | 1 d          |
| 6                | Height responsiveness on header collapse + scroll-collapse (icons↔icons+text)                                                                               | 2 d          |
| 7                | Accessibility: roles/ARIA, focus management, keyboard shortcuts, screen-reader table, RTL checks                                                             | 2–3 d        |
| 8                | i18n keys (via `/i18n-manage`)                                                                                                                               | 0.5 d        |
| 9                | Unit tests (`/create-test`)                                                                                                                                  | 2–3 d        |
| 10               | Docs examples + API docs (`libs/docs/core/side-panel`)                                                                                                       | 2 d          |
| **MVP subtotal** |                                                                                                                                                              | **~20–25 d** |

### Reusable splitter + responsive resize (follow-up)

| #                     | Task                                                                                                                                                                                                            | Est.        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 11                    | **Promote `fdb-splitter` → core `fd-splitter`**: port + modernize to signals, add configurable 10/100px keyboard steps + double-click Default→Max→Min cycle + explicit min/max clamp; btp back-compat re-export | 4–6 d       |
| 12                    | Wire splitter into side-panel; right-click context menu (Max/Min/Default); left+right 50% cap; splitter a11y                                                                                                    | 2–3 d       |
| 13                    | Splitter unit + e2e tests + its own docs page                                                                                                                                                                   | 2 d         |
| **Splitter subtotal** |                                                                                                                                                                                                                 | **~8–11 d** |

### Mobile full-screen (follow-up)

| #                   | Task                                                                                  | Est.       |
| ------------------- | ------------------------------------------------------------------------------------- | ---------- |
| 14                  | Bottom action bar, full-screen open, swipe-to-close indicator, mobile scroll-collapse | 3–4 d      |
| 15                  | Mobile tests                                                                          | 1–1.5 d    |
| **Mobile subtotal** |                                                                                       | **~4–5 d** |

### Cross-cutting

| #   | Task                                                           | Est.    |
| --- | -------------------------------------------------------------- | ------- |
| 16  | E2E / visual tests (Playwright) across web variants            | 1.5–2 d |
| 17  | `/preflight`, PR review cycles, polish, breaking-change review | 2–3 d   |

## 6. Total estimate

Two tracks run in parallel. "Wall-clock" assumes two people (Person A on styles, Person B on NGX); "total effort" sums both.

| Scope                                                     | Effort                                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `fundamental-styles` side-panel (parallel, separate repo) | ~**5–8 d**                                                                      |
| **MVP (Web, no splitter)**                                | ~**4–5 weeks** (20–25 d)                                                        |
| **+ Promote & extend splitter + resize**                  | +~**2 weeks** (8–11 d)                                                          |
| **+ Mobile full-screen**                                  | +~**1 week** (4–5 d)                                                            |
| **+ Cross-cutting (e2e, review, polish)**                 | +~**1 week** (3.5–5 d)                                                          |
| **Full component — NGX track only**                       | **~8–10 weeks** (≈ **36–46 engineer-days**)                                     |
| **Full component — total effort incl. styles**            | **≈ 41–54 engineer-days**, **~8–10 weeks wall-clock** with 2 people in parallel |

Recommend shipping in the order above: **MVP first**, then splitter, then mobile — this matches the Figma's own cut (`MVP - WITHOUT RESPONSIVE SPLITTER` / `WITH RESPONSIVE SPLITTER`, and separate `MVP Web` vs `MVP Mobile` specs). The styles block should land during MVP development so it can be adopted before the MVP PR merges.

## 7. Risks & unknowns

- **Splitter promotion is the biggest risk** — `fdb-splitter` (btp) already handles drag/keyboard/RTL/`separator` a11y, but a core `fd-side-panel` can't import it (btp is below core in the dependency graph), so it must be promoted to `libs/core`, migrated to signals, and extended (configurable step sizes, double-click cycle, min/max clamp). The port + modernization + btp back-compat is fiddly (especially a11y) and could slip.
- **fundamental-styles track**: the `side-panel` style block must be authored in the separate repo. Managed as a parallel track (see §5); risk is schedule-coupling if Phase 0 agreement slips or the two tracks drift on class names.
- **Overflow reuse**: icon-tab-bar's overflow calc is tied to that component; extracting cleanly vs re-implementing is a judgement call.
- **Push-vs-overlay + height-on-header-collapse** depends on host page layout (dynamic-page). Integration edge cases likely.
- **Panel-width semantics (220/560/561)**: terse in the spec; needs designer confirmation before building the width-behaviour logic.
- **Left + right dual panel** (50% cap) may be out of MVP scope.

## 8. Open questions

**Resolved:**

1. ~~Core only, or core + platform wrapper?~~ → **Core only** for v1.
2. ~~Reusable `fd-splitter` or internal resizer?~~ → **Promote `fdb-splitter` (btp) to `libs/core` as `fd-splitter`**, modernize + extend, btp re-exports for back-compat (see §3/§4).
3. ~~RTL support?~~ → **Yes, first-class.**
4. ~~fundamental-styles: gap or adopt?~~ → **Author a new `side-panel` style block upstream**, in parallel with the NGX work (see §5).

**Still open (to resolve in/after Phase 0):**

5. **Panel-width semantics**: do "Opens fully from 220px to 560px" / "561px and up opens in default width" refer to the panel's own width, the available space, or screen width? Confirm with the designer.
6. **Dual side panels**: should v1 support a left **and** a right side panel on the same page simultaneously (the case that triggers the "expanded max ≤ 50%" cap), or only one panel per page? (This is what old Q5 meant.)
7. **Mobile switch point**: at what screen width does the component switch to the mobile full-screen mode? The spec describes mobile full-screen behaviour but I did not find an explicit numeric breakpoint for the switch — needs confirmation. (This replaces the earlier mis-framed "below 220px" question, which was based on reading 220px as a screen width rather than a panel width.)

## 9. Suggested workflow

Phase 0 design → `/scaffold`-style core component → build MVP phases with `/create-test` per step → `/i18n-manage` for keys → `/update-docs` + docs examples → `/a11y-audit` → `/preflight` → PR. Splitter and mobile as separate follow-up PRs.
