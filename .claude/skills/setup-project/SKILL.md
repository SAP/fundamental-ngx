---
name: setup-project
description: Set up a new Angular project with @fundamental-ngx installed, themed, and a working first component
argument-hint: <project-name> [theme: horizon|horizon-dark|quartz|quartz-dark|hcb|hcw]
context: fork
agent: general-purpose
allowed-tools: Read, Bash(node --version), Bash(npm *), Bash(npx *), Bash(yarn *), Bash(ng *), Write, Edit
---

# Setup Project: $ARGUMENTS

If `$ARGUMENTS` is empty, ask: (1) project name, (2) preferred SAP Fiori theme (default: `horizon`).

## Phase 1: Check Prerequisites

```bash
node --version   # must be ≥ 18.19
ng version       # Angular CLI must be installed
```

If Angular CLI is missing:

```bash
npm install -g @angular/cli
```

Report both versions. If Node < 18.19, stop and tell the user to upgrade Node before continuing.

## Phase 2: Create Angular Project

If the user does **not** already have a project:

```bash
ng new [project-name] \
  --routing \
  --style=scss \
  --ssr=false \
  --package-manager=npm
cd [project-name]
```

If the user has an existing project, ask for its root path and `cd` there, then skip to Phase 3.

## Phase 3: Install fundamental-ngx

Attempt `ng add` first:

```bash
ng add @fundamental-ngx/core
```

`ng add` installs peer dependencies and patches `angular.json`. **However**, it is known to fail with `"Can not add index to parent of type array"` on the budget update step, and may silently skip the styles patch even when it reports success. After it runs:

1. Check that `angular.json` `"styles"` array was updated (see Phase 4). If not, apply the patch manually.
2. Check that `package.json` now lists `fundamental-styles` and `@sap-theming/theming-base-content`. If not, install manually.

If `ng add` fails entirely (exit code 1) or the environment is offline, install manually:

```bash
npm install \
  @fundamental-ngx/core \
  @fundamental-ngx/platform \
  @fundamental-ngx/cdk \
  @fundamental-ngx/i18n \
  @angular/cdk \
  fundamental-styles \
  @sap-theming/theming-base-content
```

> **Note:** `@fundamental-ngx/platform` is not installed by `ng add @fundamental-ngx/core`. If you plan to use platform form components (`fdp-*`), install it too.

## Phase 4: Configure Theme

Ask the user which theme they want, or use the argument. Map to file paths:

| Theme name          | CSS variable file                    |
| ------------------- | ------------------------------------ |
| `horizon` (default) | `sap_horizon/css_variables.css`      |
| `horizon-dark`      | `sap_horizon_dark/css_variables.css` |
| `quartz`            | `sap_fiori_3/css_variables.css`      |
| `quartz-dark`       | `sap_fiori_3_dark/css_variables.css` |
| `hcb`               | `sap_hcb/css_variables.css`          |
| `hcw`               | `sap_hcw/css_variables.css`          |

In `angular.json`, set the `"styles"` array to:

```json
"styles": [
  "node_modules/@sap-theming/theming-base-content/content/Base/baseLib/[theme-folder]/css_variables.css",
  "node_modules/fundamental-styles/dist/theming/[theme-folder].css",
  "node_modules/fundamental-styles/dist/fundamental-styles.css",
  "src/styles.scss"
]
```

**Order matters** — theming variables must come before component CSS, which must come before `styles.scss`.

> **CSS warnings:** esbuild will emit `css-syntax-error` warnings about the SAP theming metadata embedded in the `css_variables.css` file (it stores JSON in a CSS custom property value). These are non-blocking — the styles work correctly. You can ignore them.

Also update the initial bundle budget in `angular.json`. `@fundamental-ngx` ships large bundles; the default Angular budget is too small:

```json
{
    "type": "initial",
    "maximumWarning": "5MB",
    "maximumError": "8MB"
}
```

## Phase 5: Configure Animations

`@fundamental-ngx` does **not** use Angular's animation system — its overlays, dialogs, and menus animate via CSS transitions from `fundamental-styles`. Do **not** add `provideAnimationsAsync()` or `BrowserAnimationsModule` unless your own application code needs Angular animations.

> If you do need Angular animations for your own components, install `@angular/animations` separately (`npm install @angular/animations`) and add `provideAnimationsAsync()` to `app.config.ts`. It is not a peer dependency of fundamental-ngx and is not installed by `ng add`.

## Phase 6: Create Verification Component

Generate a minimal smoke-test to confirm theming and components work.

Create `src/app/hello/hello.component.ts`:

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'app-hello',
    template: `
        <h1 style="font-family: var(--sapFontFamily); font-size: 1.5rem; margin: 1rem">Hello fundamental-ngx</h1>
        <div style="padding: 1rem; display: flex; gap: 0.5rem; align-items: center">
            <button fd-button fdType="emphasized" (click)="onClick()">Click me</button>
            <button fd-button fdType="transparent" (click)="showMessage.set(false)">Reset</button>
        </div>
        @if (showMessage()) {
            <fd-message-strip type="success" style="margin: 1rem"> Setup is working correctly! </fd-message-strip>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonModule, MessageStripModule]
})
export class HelloComponent {
    showMessage = signal(false);
    onClick(): void {
        this.showMessage.set(true);
    }
}
```

> **Note:** Do NOT use `<h1 fd-title [level]="1">` — `[level]` is not a valid input on the `fd-title` directive in the currently published package. Use a plain `<h1>` with SAP CSS variables for font styling, or omit the title entirely.

Add `HelloComponent` to `AppComponent`'s `imports` array and place `<app-hello>` in its template:

```typescript
// src/app/app.component.ts  (or app.ts in Angular 21)
import { HelloComponent } from './hello/hello.component';

@Component({
    selector: 'app-root',
    template: `<app-hello></app-hello>`,
    imports: [HelloComponent]
})
export class AppComponent {}
```

## Phase 7: Verify

```bash
ng serve
```

Open http://localhost:4200 and confirm:

- [ ] SAP Fiori typography is applied (correct font, not default browser sans-serif)
- [ ] "Click me" renders as a styled SAP button (not a plain grey browser button)
- [ ] Clicking it shows the success message strip with SAP green styling
- [ ] No console errors about missing CSS variables or broken imports

If the buttons look unstyled:

1. Check that `angular.json` styles array paths exist under `node_modules/`
2. Confirm `ng add` ran without errors (check for `postinstall` failures)
3. Verify the theme folder name matches exactly (case-sensitive on Linux)

## Critical Rules

- **Import individual modules, not barrel imports** — use `ButtonModule` from `@fundamental-ngx/core/button`, NOT `FundamentalNgxCoreModule`; barrels are deprecated and cause tree-shaking to fail
- **`fd-button` is an ATTRIBUTE directive** — `<button fd-button>`, never `<fd-button>`
- **`provideAnimationsAsync()` is NOT needed** — `@fundamental-ngx` animates via CSS, not Angular's animation system. Do not add it; doing so requires `@angular/animations` (which `ng new` does not install) and will cause a build error.
- **CSS import order is load-order sensitive** — swapping theming and component CSS positions causes incorrect variable resolution
- **`ng add` styles patch may silently fail** — always verify the `angular.json` styles array after running `ng add`

## Output

```
## Setup Complete: [ProjectName]

**Angular version:** 21.x
**Theme:** SAP Horizon (horizon)
**Packages installed:** @fundamental-ngx/core, @fundamental-ngx/platform, fundamental-styles

**Verification:** ✓ App served at http://localhost:4200 with SAP Fiori styling

**Next steps:**
- [ ] Run /scaffold form  — generate your first form
- [ ] Run /scaffold table — generate your first data table
- [ ] Run /scaffold shell — add shellbar and side navigation
- [ ] See full component examples at https://sap.github.io/fundamental-ngx/
```
