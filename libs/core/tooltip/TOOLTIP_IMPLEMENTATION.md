# Tooltip — Implementation Guide (for the AI agent)

> **Read this first.** This document tells an AI agent _how_ to build the tooltip in
> `@fundamental-ngx/core`. The _what_ (behavior, timing, a11y) lives in
> [`TOOLTIP.md`](./TOOLTIP.md) (spec transferred from Figma) and
> [`TOOLTIP_FOUNDATION_CONCEPT.md`](./TOOLTIP_FOUNDATION_CONCEPT.md) (Extended Keyboard
> Navigation + control-by-control expectations). When this guide and the spec disagree on
> _behavior_, the spec wins — update this guide.

---

## 0. The one architectural decision that constrains everything

The tooltip is **not** a component or a wrapper. It is a **behavior added to existing
elements** across many components (buttons, icon buttons, avatars, titles, column headers,
input icons, …). Therefore:

- Build it as a **standalone attribute directive** (plus a small set of supporting
  services). Consumers add an attribute to an element they already render; they must not
  have to restructure their template or wrap content in a new tag.
- **No breaking changes.** Everything is additive. Do not change existing public APIs,
  selectors, inputs, outputs, or DOM of any component you integrate with. A component that
  does not opt in must render and behave exactly as before.
- One shared foundation, applied in many places. Do not fork per-component tooltip logic.

If a requirement seems to need a new host element or a structural change to a consumer,
stop and reconsider — it almost certainly can be expressed as host bindings + an overlay.

---

## 1. Where the code goes

This is a **secondary entry point** of `libs/core`, mirroring `libs/core/popover`.

```
libs/core/tooltip/
├── index.ts                         # public barrel (export only public symbols)
├── ng-package.json                  # { "lib": { "entryFile": "./index.ts" } }  (copy from popover)
├── tooltip.directive.ts             # [fdTooltip] — the main entry point consumers use
├── tooltip.service.ts               # per-trigger orchestration (show/hide/delay/overlay)
├── tooltip-container.component.ts    # the floating container (role="tooltip" host)
├── tooltip-container.component.html
├── tooltip.config.ts                # InjectionToken for global defaults (delays, etc.)
├── tooltip.interfaces.ts            # TooltipPlacement, TooltipContent types
├── extended-keyboard-nav.service.ts  # global on/off state (Shift+Alt+F6) + toast
├── extended-keyboard-nav.directive.ts (optional — see §6)
└── *.spec.ts                        # unit tests alongside each file
```

Then wire it up:

1. Add `export * from '@fundamental-ngx/core/tooltip';` to `libs/core/index.ts` (keep the
   list alphabetical — it sits between `toolbar`/`token` neighbors; check the exact spot).
2. Confirm the path mapping in the root `tsconfig.base.json` for
   `@fundamental-ngx/core/tooltip` exists (add it following the `@fundamental-ngx/core/popover`
   entry if missing).
3. Do **not** hand-edit anything under `libs/ui5-webcomponents*` — unrelated, generated.

> **Grounding:** read `libs/core/popover/ng-package.json`, `libs/core/popover/index.ts`,
> and how `popover` appears in `libs/core/index.ts` + `tsconfig.base.json`. Copy that shape.

---

## 2. Reuse the Popover overlay — do not build your own

The spec (Anatomy) says the tooltip is built on the Popover's rendering/positioning/a11y
infrastructure. Concretely:

- Positioning & flipping: reuse the Angular CDK `Overlay` +
  `FlexibleConnectedPositionStrategy` setup that `PopoverService`
  (`libs/core/popover/popover-service/popover.service.ts`) already encapsulates, and the
  `Placement` / `PopoverPosition` types from `@fundamental-ngx/core/shared`
  (`libs/core/shared/interfaces/popover-position.ts`).
- The **arrow always points at the target** (spec §Features/Placement) → reuse Popover's
  arrow, and accept the known SAPUI5 arrow-positioning limitation noted in the spec rather
  than inventing a new arrow system.
- **Default placement is `top`**, auto-flip to the opposite side at viewport edges
  (`FlexibleConnectedPositionStrategy` handles this).

Prefer composing/injecting the existing `PopoverService` or its underlying overlay helpers
over copying them. If `PopoverService` is too heavy (it carries trigger/focus-trap concerns
a tooltip must _not_ have — see §4), extract only the position-strategy builder into a
shared helper and use that from both. Do not duplicate the layout-shift observer logic;
reuse it (note the recent fix in commit `ee6b9c6b5e` about observer feedback loops).

---

## 3. The directive API (`[fdTooltip]`)

Use **new-style signal inputs** (this is new code — CLAUDE.md requires `input()` / `output()`
/ `computed()` / `host: {}`; no decorators, no `@HostBinding`/`@HostListener`).

```ts
@Directive({
    selector: '[fdTooltip]',
    exportAs: 'fdTooltip',
    host: {
        // bind aria + tabindex here via computed signals, see §5
    }
})
export class TooltipDirective {
    /** Tooltip text (or a TemplateRef for the rare rich case — but see spec: rich = use popover). */
    readonly fdTooltip = input<string | TemplateRef<any> | null>(null);

    /** top | bottom | left | right. Default 'top'. */
    readonly placement = input<TooltipPlacement>('top');

    /** start | middle | end. Alignment along the chosen side. Default 'middle'. */
    readonly alignment = input<TooltipAlignment>('middle');

    /** Disable the tooltip (e.g. caller computed truncation === false). Default false. */
    readonly tooltipDisabled = input(false, { alias: 'fdTooltipDisabled' });

    /** Optional per-instance delay overrides; falls back to the global config token. */
    readonly showDelay = input<number | null>(null);
    readonly hideDelay = input<number | null>(null);
}
```

Design rules:

- The **primary input is `fdTooltip`** carrying the text, so the common case is a single
  attribute: `<button fd-button fdTooltip="Save (Ctrl+S)">`.
- Keep inputs minimal. Every input is public API you cannot remove later without a breaking
  change. Content _composition_ (label + supplementary + shortcut ordering/separators,
  spec §Content Combination) is the **caller's** responsibility — the directive receives
  the already-assembled string. Do not bake content-type ordering into the directive.
- `exportAs: 'fdTooltip'` lets a template grab the instance if it ever needs to trigger
  show/hide imperatively.

---

## 4. Interaction & timing — the behavioral core

Implement exactly what `TOOLTIP.md` §Interactions and §Accessibility describe. The
subtle, test-worthy points:

**Delays (store in a config token, see §7):**

- Show delay: **500 ms** default (hover or keyboard focus).
- Hide delay: **500 ms** default.
- **Sequence delay: 200 ms** — if a tooltip is already open and the user moves to the next
  tooltip-bearing element, the _next_ one opens after 200 ms (not 500), and the previous
  one closes **immediately**.
- Touch long-press and keyboard shortcut (`Ctrl+Alt+I`): **no delay** — show/hide
  immediately.

**Single-tooltip invariant:** two tooltips must never be visible at once. This needs a
**singleton coordinator** (a root-level service, or state on the overlay layer) that the
per-trigger service talks to — when one opens, it closes any other immediately and owns the
200 ms "sequence" timing. Do not try to coordinate this purely from directive instances.

**Coordinator pattern example:**

```ts
@Injectable({ providedIn: 'root' })
export class TooltipCoordinator {
    private currentTooltip = signal<TooltipRef | null>(null);

    register(ref: TooltipRef): void {
        const current = this.currentTooltip();
        if (current && current !== ref) {
            current.close({ immediate: true });
        }
        this.currentTooltip.set(ref);
    }

    unregister(ref: TooltipRef): void {
        if (this.currentTooltip() === ref) {
            this.currentTooltip.set(null);
        }
    }
}
```

**Triggers to wire (via `host` listeners / CDK, not `@HostListener`):**

- Mouse: `mouseenter` (start show timer) / `mouseleave` (start hide timer).
- **Hover-able tooltip:** moving the cursor from the target _onto the container_ keeps it
  open, and text is selectable. Practically: the container must not close on the target's
  `mouseleave` if the pointer is entering the container; the container listens for its own
  enter/leave. This is why the container is a real element in an overlay, not `title`.
- Keyboard: show on `focus` (keyboard focus), hide on `blur`. Do **not** show on
  click-focus (pointer) — spec: click transfers focus but does not show the tooltip.
- Keyboard shortcut `Ctrl+Alt+I`: toggle (show if hidden, hide if shown). Marked **"Future
  Update"** in the spec — gate it behind a flag or implement but document as provisional.
- `Esc`: dismiss. **Escape must be handled so it dismisses the tooltip first and stops
  propagation only if a tooltip was open** — otherwise a dialog's own `Esc` must still fire
  on the second press (spec §Dismissing). Test this ordering explicitly.
- Action trigger (e.g. `Enter` activating the button): if the tooltip is open, dismiss it
  immediately.
- Page visibility: on `visibilitychange`/blur of the window, dismiss; do **not** auto-restore
  on return (spec §Tooltip Visibility Across Focus Changes).

**Modeless:** focus never moves into the tooltip container. It is a passive overlay; do not
add a focus trap, do not make it tabbable.

> Use `KeyUtil` from `@fundamental-ngx/cdk/utils` for key checks (`KeyUtil.isKeyCode(...)`),
> matching the rest of the codebase. Use `DestroyRef` + `takeUntilDestroyed()` for teardown;
> use `signal()`/`computed()` for state. Never `BehaviorSubject` for local state.

---

## 5. Accessibility wiring

From `TOOLTIP.md` §Screen Reader — this is the part most likely to be done wrong.

- The visible container host carries `role="tooltip"` and a generated `id`.
- The **target** element gets `aria-describedby="<tooltip-id>"` **only when appropriate**:
    - If the tooltip text is **identical** to the element's accessible name/label → **do not**
      add `aria-describedby` (prevents double announcement). This is the default guard.
    - If it **differs** → add `aria-describedby` so SR reads name/title first, then tooltip.
- The invisible SR text contains the tooltip text **without** the keyboard-shortcut portion
  (the shortcut is conveyed via `aria-keyshortcuts` on the target, e.g. `"Control+S"`).
- Drive these with `computed()` host bindings on the directive, e.g.
  `host: { '[attr.aria-describedby]': 'describedById()' }`, where `describedById()` returns
  `null` when the guard says "duplicate".
- Never rely on the native `title` attribute (spec best-practices explicitly forbids it).
  If the consumer element already has a `title`, leave it alone but do not use it as the
  tooltip source.

Worked annotation examples (button / icon-button / column-header / title) are in the spec —
turn each into a unit test asserting the resulting attributes.

---

## 6. Extended Keyboard Navigation (phase 2 — keep it separable)

`TOOLTIP_FOUNDATION_CONCEPT.md` describes a global mode (`Shift+Alt+F6`) that makes
normally-unfocusable, truncated/supplementary elements focusable so keyboard users can
trigger their tooltips.

- Put the global on/off state in a **root-provided service** (`ExtendedKeyboardNavService`)
  exposing a `signal<boolean>`; toggle via the shortcut; emit the activation/deactivation
  **toast** (reuse `@fundamental-ngx/core/message-toast`). Persist across navigation
  (sessionStorage) per the concept doc.
- Elements opt in with a companion directive (or an input on `[fdTooltip]`) that, **only
  while the mode is on and the text is truncated**, sets `tabindex="0"` + a visible focus
  ring and registers itself in the extended tab order. When the mode is off, or text is no
  longer truncated (watch with `ResizeObserver`), restore the original tabindex and remove
  the focus ring — leaving the element exactly as it was (no breaking change).
- **Build this in a second PR, after the core directive works.** It depends on the base
  tooltip but the base tooltip does not depend on it. Do not block the foundation on it.

---

## 7. Config token (global defaults)

```ts
export interface TooltipConfig {
    showDelay: number; // 500
    hideDelay: number; // 500
    sequenceDelay: number; // 200
    defaultPlacement: TooltipPlacement; // 'top'
}
export const TOOLTIP_CONFIG = new InjectionToken<TooltipConfig>('TOOLTIP_CONFIG', {
    factory: () => ({ showDelay: 500, hideDelay: 500, sequenceDelay: 200, defaultPlacement: 'top' })
});
```

Apps override via `providers: [{ provide: TOOLTIP_CONFIG, useValue: {...} }]`. Per-instance
`showDelay`/`hideDelay` inputs fall back to this token. (Pattern: see existing
`InjectionToken` configs in core, e.g. tokens in `libs/core/*/tokens.ts`.)

---

## 8. i18n

Any agent-facing strings the directive itself owns (e.g. the Extended-Keyboard-Nav toast
text) go through the i18n system — **do not hardcode English**:

- Add keys to the `FdLanguage` interface and every `.properties` file via the
  `/i18n-manage` skill (it keeps the generated types in sync). Do not edit one language by
  hand.
- Tooltip _content_ itself is supplied by the consumer and is not translated here.

---

## 9. Styling

- Use `fundamental-styles` tooltip/popover BEM classes — discover them with the
  `fundamental-styles` MCP tools (`get_css_classes`, `get_component_html`), **not** by
  grepping `node_modules` (CLAUDE.md landmine).
- Sizes in **`rem`** so zoom-to-200% scales correctly (spec §Zooming).
- Container class via `host: { '[class]': 'computedClass()' }` + `computed()` — never
  `ngClass`/`CssClassBuilder`.

---

## 10. Testing (ship with the code)

Use the `/create-test` skill conventions. Cover at least:

1. Shows after `showDelay` on hover; hides after `hideDelay` on leave (fake timers).
2. Stays open when pointer moves target → container; closes when it leaves both.
3. Keyboard focus shows; pointer-click focus does **not** show.
4. Sequence: second trigger opens after **200 ms**, first closes immediately; never two open.
5. `Esc` dismisses tooltip first and only swallows the event when one was open (dialog `Esc`
   still works on second press).
6. `aria-describedby` present when text ≠ label; absent when text == label.
7. `role="tooltip"` on container; shortcut text excluded from the SR text; `aria-keyshortcuts`
   on target.
8. `tooltipDisabled` suppresses everything; directive adds/removes cleanly (no leftover
   attributes → proves no breaking change to the host).
9. Config token overrides and per-instance delay overrides both apply.
10. **ResizeObserver tests:** truncation detected when `scrollWidth > clientWidth`; element added to extended tab order; on resize making text fit, element removed from tab order.
11. **Coordinator tests:** opening second tooltip closes first immediately; sequence delay applied correctly; only one tooltip in DOM at any time.
12. **Touch tests:** long-press shows immediately; tap outside dismisses; hardware keyboard attached behaves like desktop.
13. **Escape key propagation:** first `Esc` closes tooltip and stops propagation; second `Esc` reaches parent (e.g., dialog close).
14. **Window blur:** tooltip closes on `visibilitychange` to hidden; does not auto-restore on return.

**Testing tools:**

- `fakeAsync`, `tick()`, `flush()` for timing
- `TestBed.inject(TooltipCoordinator)` to verify single-tooltip invariant
- `ResizeObserver` mock or spy to verify truncation detection
- `dispatchEvent(new KeyboardEvent(...))` for keyboard shortcuts
- `aria-*` attribute matchers: `expect(element.getAttribute('aria-describedby')).toBe(...)`

---

## 11. Definition of done

- [ ] `[fdTooltip]` usable by adding one attribute; host element otherwise unchanged.
- [ ] Reuses Popover overlay/positioning (no duplicated overlay stack).
- [ ] All timing values from §4 implemented and covered by tests with fake timers.
- [ ] Single-tooltip invariant enforced by a coordinator.
- [ ] A11y attributes per §5, with the duplicate-announcement guard.
- [ ] Exported from `@fundamental-ngx/core/tooltip` and re-exported in `core/index.ts`.
- [ ] `nx run core:lint` and `nx run core:test --testfile=tooltip.directive.spec.ts` pass.
- [ ] `yarn format` run. No files touched under `libs/ui5-webcomponents*`.
- [ ] Zero changes to existing components' public API (grep the diff — additive only).
- [ ] Extended Keyboard Navigation deferred to a follow-up PR (§6), not blocking.

> Before the first search/read when exploring the codebase, prefer
> `graphify query "<question>"` (graph exists at `graphify-out/`), then read only the files
> it points to. Validate with `nx affected` targets, and run `/preflight` before opening a PR.
