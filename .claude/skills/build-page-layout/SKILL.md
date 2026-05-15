---
name: build-page-layout
description: Build a page layout using fd-dynamic-page or fdp-dynamic-page — collapsing header, subheader, content area, footer, and optional tabs
argument-hint: <page-name> [tabs] [subheader] [footer] [fcl]
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(nx *), Bash(ng build*), Write, Edit
---

# Build Page Layout: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user: (1) what this page displays, (2) whether it needs tabs, a collapsible subheader, or a floating footer.

## Phase 1: Determine Scope

Parse from `$ARGUMENTS` or ask:

- **Project type**: `nx` (existing NX monorepo library/app) | `standalone` (fresh Angular CLI app — needs full setup)
- **Page name** (PascalCase, e.g., `ProductDetail`, `OrderList`)
- **Base component**: `fd-dynamic-page` (core, sufficient for most cases) | `fdp-dynamic-page` (platform — needed only if using `fdp-icon-tab-bar` or the `tabChange` output event)
- **Sections needed** (check all that apply):
    - `header` — title, subtitle, breadcrumb, global/layout actions (default: yes)
    - `subheader` — collapsible section below the header with metadata or filters
    - `tabs` — multiple content sections, each on its own tab
    - `footer` — floating action bar (Save / Cancel buttons)
    - `fcl` — page is a column inside `fd-flexible-column-layout`
- **Header actions**: global actions (left-aligned toolbar) and/or layout actions (right-aligned)

Default to `fd-dynamic-page` with header + one content area unless the user specifies otherwise.

### Standalone app setup (skip for NX projects)

If `project type` is `standalone`, run these steps before generating the component:

```bash
# 1. Create the app (--standalone is accepted but is the default since Angular 19, so it's a no-op)
ng new <app-name> --routing=true --style=scss --skip-git --package-manager=npm

# 2. Resolve the exact @fundamental-ngx version and fundamental-styles peer version first
npm show @fundamental-ngx/core version          # → e.g. 0.62.2
npm show @fundamental-ngx/core peerDependencies  # → check fundamental-styles exact pin

# 3. Install @fundamental-ngx and peer deps (--legacy-peer-deps is required to resolve Angular CDK peer conflicts)
cd <app-name>
npm install --legacy-peer-deps \
  @fundamental-ngx/core@<version> \
  @fundamental-ngx/cdk@<version> \
  @fundamental-ngx/i18n@<version> \
  fundamental-styles@<peer-version> \
  "@angular/cdk@^<angular-major>.0.0" \
  @sap-theming/theming-base-content
```

Check the exact `fundamental-styles` peer version with:

```bash
npm show @fundamental-ngx/core peerDependencies
```

**Bundle budget** — the default Angular CLI budget (1 MB error) is too small for `@fundamental-ngx/core` (~2.4 MB initial). Raise both thresholds in `angular.json`:

```json
{ "type": "initial", "maximumWarning": "2.5MB", "maximumError": "4MB" }
```

**Theming** — the SAP theming CSS file contains JSON metadata embedded in a custom property value; esbuild rejects it with a parse error if imported through the SCSS bundler. Instead:

1. Copy the theme file to `public/`:
    ```bash
    cp node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.css public/sap-horizon.css
    ```
2. Add a `<link>` in `src/index.html`:
    ```html
    <link rel="stylesheet" href="sap-horizon.css" />
    ```

> The Angular build tool emits `"Unable to locate stylesheet: /sap-horizon.css"` during build — this is a false positive. The file is resolved from `public/` at runtime, not the source tree. The build still succeeds and the file is present in `dist/`.

**Do NOT** `@import` the SAP theming CSS in `styles.scss` — it will break the build.

**Global styles** (`src/styles.scss`) — import the fundamental-styles CSS files for the sections you are building. Always start with:

```scss
@import '@angular/cdk/overlay-prebuilt.css';
@import 'fundamental-styles/dist/dynamic-page.css';
@import 'fundamental-styles/dist/breadcrumb.css';
@import 'fundamental-styles/dist/button.css';
@import 'fundamental-styles/dist/toolbar.css';
@import 'fundamental-styles/dist/icon.css';
@import 'fundamental-styles/dist/link.css';
@import 'fundamental-styles/dist/title.css';
@import 'fundamental-styles/dist/scrollbar.css';
```

Add these only when the corresponding section is included:

- footer → `fundamental-styles/dist/bar.css`
- subheader → no extra file (covered by `dynamic-page.css`)

## Phase 2: Gather Component Context

Call the `@fundamental-ngx/mcp` MCP server:

1. `get_usage_guide('fd-flexible-column-layout')` — if `fcl` flag is set, check composition rules for dynamic page inside FCL columns
2. `get_component_api('fd-dynamic-page')` — size, background, expandContent, positionRelative inputs
3. `get_component_api('fd-dynamic-page-header')` — title, subtitle, headingLevel (signal inputs)
4. If `subheader` requested: `get_component_api('fd-dynamic-page-subheader')` — collapsible, pinnable, collapsed
5. If `footer` requested: `get_component_api('fd-bar')` — barDesign="floating-footer" usage

If MCP is unavailable, read `libs/mcp-server/src/data/usage-guides.ts`.

## Phase 3: Present Plan

Output this summary before writing any code:

```
## Page Layout Plan: [PageName]

**Component:** fd-dynamic-page
**Size:** extra-large (auto-responsive)

**Sections:**
- [x] Header — title, subtitle, breadcrumbs, global actions
- [x] Subheader — collapsible, pinnable
- [ ] Tabs — single content area
- [x] Footer — floating (Save / Cancel)
- [ ] FCL — standalone page

**Header actions:**
- Global: Edit, Delete buttons (left)
- Layout: Settings button (right)
```

**Stop here and wait for approval before generating code.**

## Phase 4: Generate Component

Create three files in the target path (ask the user if not already known).

### TypeScript (`.component.ts`)

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';  // include when header has breadcrumbs
import { LinkModule } from '@fundamental-ngx/core/link';               // include when breadcrumb anchors use fd-link
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';                 // include only when footer is present
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'app-[kebab-name]-page',
    templateUrl: './[kebab-name]-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    // RouterLink required when breadcrumb anchors use routerLink
    // LinkModule required when breadcrumb anchors use fd-link directive
    // BarModule required only when footer is present
    imports: [DynamicPageModule, BreadcrumbModule, LinkModule, RouterLink, ToolbarModule, BarModule, ButtonModule]
})
export class [Name]PageComponent {
    readonly isSubheaderCollapsed = signal(false);

    onCollapseChange(collapsed: boolean): void {
        this.isSubheaderCollapsed.set(collapsed);
    }

    onSave(): void {
        // TODO: implement save
    }

    onCancel(): void {
        // TODO: navigate back or reset state
    }
}
```

### HTML Template (`.component.html`)

Sections are composed strictly in this order inside `<fd-dynamic-page>`:

1. `fd-dynamic-page-header`
2. `fd-dynamic-page-subheader` (if needed)
3. Tab list or `fd-dynamic-page-content` (one or more)
4. `fd-dynamic-page-footer` (if needed)

#### Single content area (no tabs)

```html
<fd-dynamic-page size="extra-large" background="solid" [expandContent]="true" ariaLabel="[Page Name]">
    <fd-dynamic-page-header title="[Page Title]" subtitle="[Subtitle]" [headingLevel]="1">
        <fd-dynamic-page-breadcrumb>
            <fd-breadcrumb>
                <fd-breadcrumb-item>
                    <a fd-link routerLink="/">Home</a>
                </fd-breadcrumb-item>
                <fd-breadcrumb-item>[Page Name]</fd-breadcrumb-item>
            </fd-breadcrumb>
        </fd-dynamic-page-breadcrumb>

        <fd-dynamic-page-global-actions>
            <fd-toolbar>
                <button fd-button fdType="emphasized" (click)="onSave()">Edit</button>
                <button fd-button fdType="negative">Delete</button>
            </fd-toolbar>
        </fd-dynamic-page-global-actions>

        <fd-dynamic-page-layout-actions>
            <fd-toolbar>
                <button fd-button fdType="transparent">Settings</button>
            </fd-toolbar>
        </fd-dynamic-page-layout-actions>
    </fd-dynamic-page-header>

    <fd-dynamic-page-subheader
        [collapsible]="true"
        [pinnable]="true"
        [collapsed]="isSubheaderCollapsed()"
        (collapsedChange)="onCollapseChange($event)"
    >
        <!--
            IMPORTANT: put actual content here (key facts, filters, metadata).
            The collapse button hides/shows this section via CSS [aria-hidden=true]{display:none}.
            An empty subheader makes the button appear broken — nothing visually changes.
        -->
    </fd-dynamic-page-subheader>

    <fd-dynamic-page-content>
        <!-- main scrollable content -->
    </fd-dynamic-page-content>

    <fd-dynamic-page-footer>
        <div fd-bar barDesign="floating-footer">
            <div fd-bar-right>
                <button fd-bar-element fd-button fdType="emphasized" (click)="onSave()">Save</button>
                <button fd-bar-element fd-button fdType="transparent" (click)="onCancel()">Cancel</button>
            </div>
        </div>
    </fd-dynamic-page-footer>
</fd-dynamic-page>
```

#### Tabbed content area

When multiple content sections are needed, provide `tabLabel` and `id` on each `fd-dynamic-page-content`. Use `fdp-dynamic-page` if `tabChange` events are required.

```html
<fd-dynamic-page size="extra-large" [expandContent]="true" ariaLabel="[Page Name]">
    <fd-dynamic-page-header title="[Page Title]" [headingLevel]="1"> </fd-dynamic-page-header>

    <fd-dynamic-page-content tabLabel="Overview" id="tab-overview">
        <!-- tab 1 content -->
    </fd-dynamic-page-content>

    <fd-dynamic-page-content tabLabel="Details" id="tab-details">
        <!-- tab 2 content -->
    </fd-dynamic-page-content>

    <fd-dynamic-page-content tabLabel="History" id="tab-history">
        <!-- tab 3 content -->
    </fd-dynamic-page-content>
</fd-dynamic-page>
```

#### Inside Flexible Column Layout (FCL)

When the page is a column inside `fd-flexible-column-layout`, add `[positionRelative]="true"` so the floating footer is constrained to the column width, not the full viewport:

```html
<fd-dynamic-page size="large" [expandContent]="true" [positionRelative]="true" ariaLabel="[Page Name]">
    <!-- same inner structure -->
</fd-dynamic-page>
```

#### Inside a dynamically-sized container

If `fd-dynamic-page` is inside a container whose height changes at runtime (e.g., a resizable panel or `fd-split-layout`), apply `fdDynamicPageWrapper` to the container element so the page recalculates its height on resize:

```html
<div fdDynamicPageWrapper class="my-panel">
    <fd-dynamic-page ...> </fd-dynamic-page>
</div>
```

`fdDynamicPageWrapper` is exported from `DynamicPageModule`. Without it, the page height will be wrong after the container resizes.

### SCSS (`.component.scss`)

Leave empty — dynamic-page layout and spacing are handled by `fundamental-styles`. Add rules only if the host element needs explicit sizing (e.g., `height: 100%` when the page is inside a flex container).

## Critical Rules

- **Composition order is fixed** inside `<fd-dynamic-page>`: header → subheader → tab list or content(s) → footer. Angular throws if content is projected out of order.
- **Multiple `fd-dynamic-page-content` require `tabLabel` on every one** — mixing labeled and unlabeled content sections throws a runtime error. Either all have `tabLabel` (tabs mode) or none do (single content mode).
- **`fd-dynamic-page-header` uses signal inputs** (`title`, `subtitle`, `headingLevel`) — bind with property syntax `[title]="'My Page'"` or string literal `title="My Page"` (both work); do NOT use `[(title)]` two-way binding.
- **`fd-dynamic-page-subheader` uses `@Input()` decorators** (not signals) — `[collapsible]`, `[pinnable]`, `[collapsed]` are standard `@Input()` bindings; `(collapsedChange)` is `@Output()`.
- **`[positionRelative]="true"` is required inside FCL** — without it, the floating footer spans the full viewport width instead of the column.
- **`fdDynamicPageWrapper` directive on the outer container** when the container height is dynamic — without it, the content area height is calculated once at init and never updated on resize.
- **Header collapse requires a subheader with content** — the collapse button collapses the `fd-dynamic-page-subheader` section only. The mechanism is CSS-based: `fundamental-styles` sets `.fd-dynamic-page__collapsible-header[aria-hidden=true] { display: none }` when the collapsed state changes. If the subheader has no visible content (e.g., only a comment), clicking the button has no visible effect — the button's arrow icon changes but the page looks identical. Always put real content (key facts, filter chips, metadata) inside `fd-dynamic-page-subheader` so the collapse is noticeable. To disable snap-on-scroll, set `[disableSnapOnScroll]="true"` on `fd-dynamic-page`.
- **`fd-bar` with `barDesign="floating-footer"`** is the correct footer content — `fd-dynamic-page-footer` is a slot wrapper; the actual floating bar styling comes from `fd-bar`.
- **Use `fdp-dynamic-page` only if you need `tabChange` events or `fdp-icon-tab-bar`** — otherwise `fd-dynamic-page` is sufficient and has fewer dependencies.
- Do NOT add `standalone: true` — default since Angular 19.
- Do NOT use `*ngIf` / `*ngFor` — use `@if` / `@for`.

## Phase 5: Validate

```bash
# NX monorepo
nx run <project>:build

# Standalone Angular CLI app
ng build   # or: npm run build
```

Verify the page renders with correct header height, the footer floats at the bottom, and (if tabs are used) tab navigation works before reporting done.

## Output

```
## Build Page Layout: [PageName]

**Files generated:**
- src/app/.../[kebab-name]-page.component.ts
- src/app/.../[kebab-name]-page.component.html
- src/app/.../[kebab-name]-page.component.scss

**Imports required in parent or router:**
- `import { [Name]PageComponent } from './[kebab-name]-page/[kebab-name]-page.component'`

**Sections implemented:** header ✓ | subheader(collapsible) ✓ | content ✓ | footer(floating) ✓

**Next steps:**
- [ ] Replace breadcrumb items with real route links
- [ ] Replace header action buttons with your actual actions
- [ ] Fill fd-dynamic-page-content with your feature content
- [ ] If page is a column in fd-flexible-column-layout, add [positionRelative]="true"
- [ ] If the page container resizes dynamically, add fdDynamicPageWrapper to the outer container
```
