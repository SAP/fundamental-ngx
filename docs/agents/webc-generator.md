# webc-generator: Technical Summary

The `webc-generator` is an NX executor that automatically converts UI5 Web Components into Angular-native wrapper components. It eliminates manual maintenance of 100+ component wrappers by reading a Custom Elements Manifest (CEM) and generating the full library from it.

**Do not hand-edit files under `libs/ui5-webcomponents*/`** — run the generator instead.

---

## Directory Structure

```
libs/webc-generator/
├── src/
│   ├── executors/generate/
│   │   ├── executor.ts               # Main orchestration logic
│   │   ├── schema.json / schema.d.ts # NX executor options schema
│   │   ├── component-template.ts     # Angular component code generator
│   │   └── utils/
│   │       ├── cva.ts                # GenericControlValueAccessor directive
│   │       ├── ng-package.json       # Template for secondary entry points
│   │       └── theming-service-template.tpl
│   └── index.ts
├── executors.json                    # Registers the "generate" executor
└── package.json
```

---

## Pipeline Overview

```
CEM JSON file (from @ui5/webcomponents package)
        │
        ▼
  loadCemData()        — resolve & parse JSON
        │
        ▼
  extractCemData()     — filter custom element declarations, collect enums
        │
        ├─▶ generateTypesFiles()      — types/ secondary entry point (enum re-exports)
        ├─▶ generateThemingFiles()    — theming/ secondary entry point (ThemingService)
        ├─▶ generateCvaFile()         — utils/cva.ts (Control Value Accessor)
        ├─▶ generateUtilsFiles()      — utils/ secondary entry point
        └─▶ generateComponentFiles() — one directory per component (parallel)
                    │
                    ▼
             componentTemplate()     — produces the Angular wrapper class
        │
        ▼
  Root index.ts        — aggregates all component + secondary entry point exports
```

---

## Inputs

The executor is configured per-library in the library's `project.json`:

```json
{
    "executor": "@fundamental-ngx/webc-generator:generate",
    "options": {
        "cemFile": "@ui5/webcomponents/dist/custom-elements-internal.json",
        "targetDir": ".",
        "packageName": "@ui5/webcomponents",
        "outputPath": "libs/ui5-webcomponents",
        "tsConfig": "libs/ui5-webcomponents/tsconfig.lib.json"
    }
}
```

| Option           | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `cemFile`        | Path or package-relative path to the CEM JSON         |
| `targetDir`      | Working directory for relative paths                  |
| `outputPath`     | Root of the generated library                         |
| `packageName`    | Source `@ui5/...` package for import statements       |
| `tsConfig`       | TypeScript config to use during generation            |
| `skipComponents` | Generate only secondary entry points, skip components |

---

## What Gets Generated

```
libs/ui5-webcomponents/
├── index.ts                   # Root — re-exports everything
├── types/                     # Secondary entry: all UI5 enums
│   ├── index.ts
│   └── ng-package.json
├── utils/                     # Secondary entry: CVA + helpers
│   ├── index.ts
│   ├── cva.ts
│   └── ng-package.json
├── theming/                   # Secondary entry: ThemingService
│   ├── index.ts
│   └── ng-package.json
├── button/                    # One directory per component
│   ├── index.ts
│   └── ng-package.json
└── [100+ other components]/
```

Consumers import per entry point:

```typescript
import { ButtonComponent } from '@fundamental-ngx/ui5-webcomponents/button';
import { ButtonType } from '@fundamental-ngx/ui5-webcomponents/types';
import { GenericControlValueAccessor } from '@fundamental-ngx/ui5-webcomponents/utils';
```

---

## Component Template Logic (`component-template.ts`)

Each generated file is a self-contained Angular standalone component. The template reads CEM metadata and emits code in five main sections:

### 1. Input Properties

Each public, writable CEM field becomes an Angular `input()`:

| CEM field type | Generated input                                     |
| -------------- | --------------------------------------------------- |
| Boolean        | `input(false, { transform: booleanAttribute })`     |
| Array          | `input<FooType[]>([])`                              |
| Enum / custom  | `input<typeof _Cls.prototype.field \| undefined>()` |
| String / other | `input<string \| undefined>()`                      |

### 2. Readonly Properties

Public readonly CEM fields become either:

- A **simple getter** from the native element (no related events)
- A `computed()` backed by an internal `signal()`, updated when related events fire with matching parameters

### 3. Output Events

Each CEM event declaration becomes an `output<UI5CustomEvent<_Cls, 'event-name'>>()`. Event listeners are attached in `ngAfterViewInit()`.

### 4. Reactive Synchronization (`ngAfterViewInit`)

Two loops wire Angular ↔ web component:

- **Inputs**: for each input signal, an `effect()` propagates signal changes to the underlying web component property.
- **Outputs**: for each output, an event listener emits through the Angular output and optionally updates readonly signals when the event carries relevant parameters.

### 5. Control Value Accessor (CVA)

If the CEM marks the element with `_ui5formProperty`, the wrapper becomes a form control via a `GenericControlValueAccessor` host directive configured by `CVA_CONFIG`:

- Tracks which property carries the value (`value`, `checked`, `selected`)
- Tracks which events trigger value updates (`change`, `input`)
- Applies value transformers (boolean coercion, array defaults)
- Special-cases radio buttons (checked/value pairing)

---

## Other Generated Artifacts

### `types/index.ts`

Re-exports every enum from `@ui5/webcomponents` so consumers have one import path.

### `utils/cva.ts`

Copies `GenericControlValueAccessor` — a generic `ControlValueAccessor` directive parameterized by `CVA_CONFIG`. This keeps form integration logic in one place shared by all form-capable components.

### `theming/index.ts` (from `.tpl`)

Generates a `ThemingService` provider that imports the correct theme package. The package suffix (e.g., `@ui5/webcomponents-ai` → `Ui5WebcomponentsAi`) is injected at generation time via `getPackageSuffix()`.

---

## Angular Patterns Used in Generated Code

| Concern          | Pattern                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Properties       | `input()`, `model()` (Angular signals)                                                                                   |
| Events           | `output()`                                                                                                               |
| Derived state    | `computed()` / `signal()`                                                                                                |
| Property sync    | `effect()` (side-effect only, writes to DOM)                                                                             |
| Forms            | `GenericControlValueAccessor` host directive                                                                             |
| Content density  | `contentDensityObserverProviders` + `ContentDensityObserver`                                                             |
| Change detection | Explicit `markForCheck()` in event callbacks; `requestAnimationFrame` instead of `setTimeout` for zoneless compatibility |

---

## Generated Libraries Overview

Four libraries are produced by the generator. **Do not hand-edit any file inside these directories** — regenerate instead.

### `libs/ui5-webcomponents` — Core UI5 Components

Angular wrappers for `@ui5/webcomponents`. ~113 components covering the full UI5 component set.

| Category                | Components                                                                                                                                                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form & Input**        | Button, CheckBox, RadioButton, Switch, ToggleButton, Input, TextArea, MultiInput, Tokenizer, Token, Label, Form, FormGroup, FormItem, Select, ComboBox, MultiComboBox, StepInput, Slider, RangeSlider, ColorPicker, ColorPalette, ColorPalettePopover, FileUploader |
| **Date / Time**         | DatePicker, DateTimePicker, DateRangePicker, DynamicDateRange, TimePicker, Calendar, CalendarDate, CalendarDateRange, CalendarLegend, SpecialCalendarDate, DayPicker, MonthPicker, YearPicker                                                                       |
| **Display**             | Text, Title, Icon, Link, Card, CardHeader, Badge, ButtonBadge, AvatarBadge, ExpandableText, MessageStrip                                                                                                                                                            |
| **Overlay**             | Popover, ResponsivePopover, Dialog, Toast                                                                                                                                                                                                                           |
| **List & Menu**         | List, ListItemStandard, ListItemCustom, ListItemGroup, Menu, MenuItem, MenuSeparator, Breadcrumbs, BreadcrumbsItem                                                                                                                                                  |
| **Table**               | Table, TableRow, TableCell, TableHeaderRow, TableHeaderCell, TableSelection, TableGrowing, TableVirtualizer, TableRowAction, DropIndicator                                                                                                                          |
| **Layout & Navigation** | Carousel, TabContainer, Tab, TabSeparator, SegmentedButton, SplitButton, Toolbar, Bar, Panel                                                                                                                                                                        |
| **Indicators**          | ProgressIndicator, RatingIndicator, BusyIndicator, Tag                                                                                                                                                                                                              |

Secondary entry points: `/types` (72 enum re-exports), `/utils` (GenericControlValueAccessor), `/theming` (ThemingService).

---

### `libs/ui5-webcomponents-ai` — AI-Enhanced Components

Angular wrappers for `@ui5/webcomponents-ai`. 8 components providing AI-powered UI elements.

| Component        | Purpose                                                |
| ---------------- | ------------------------------------------------------ |
| Button           | AI-enhanced button with extra accessibility attributes |
| ButtonState      | Manages button states in AI interaction flows          |
| Input            | AI-enhanced input field                                |
| TextArea         | AI-enhanced text area                                  |
| PromptInput      | Specialised input for AI prompts                       |
| ToolbarLabel     | Label for AI toolbars                                  |
| Versioning       | Displays AI model versioning info                      |
| WritingAssistant | AI writing assistance UI                               |

Secondary entry points: `/utils` (GenericControlValueAccessor), `/theming` (ThemingService).

---

### `libs/ui5-webcomponents-base` — Shared Infrastructure

No components. Provides the shared foundation consumed by the other three libraries.

| Export   | Purpose                                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `/types` | 7 base enums: AnimationMode, CalendarType, ItemNavigationBehavior, MovePlacement, NavigationMode, SortOrder, ValueState |
| `/i18n`  | `Ui5LanguageService` + `provideUi5LanguageBridge()` — connects `FD_LOCALE_SIGNAL` to UI5's language system              |
| `/utils` | GenericControlValueAccessor, CVA_CONFIG                                                                                 |

```typescript
// Typical app bootstrap usage
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';

bootstrapApplication(AppComponent, {
    providers: [provideUi5LanguageBridge()]
});
```

---

### `libs/ui5-webcomponents-fiori` — SAP Fiori Patterns

Angular wrappers for `@ui5/webcomponents-fiori`. ~63 components implementing higher-level SAP Fiori application patterns.

| Category               | Components                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shell & Navigation** | ShellBar, ShellBarItem, ShellBarSearch, ShellBarSpacer, SideNavigation, SideNavigationGroup, SideNavigationItem, NavigationLayout, NavigationMenu, Page |
| **Page Layouts**       | DynamicPage, DynamicPageHeader, DynamicPageHeaderActions, DynamicPageTitle, FlexibleColumnLayout, DynamicSideContent                                    |
| **Data Display**       | Timeline, TimelineItem, TimelineGroupItem, MediaGallery, MediaGalleryItem, UploadCollection, UploadCollectionItem                                       |
| **Notifications**      | NotificationList, NotificationListItem, NotificationListGroupItem                                                                                       |
| **Search & Filter**    | Search, SearchField, SearchItem, SearchScope, SearchMessageArea, FilterItem, SortItem                                                                   |
| **User / Product**     | UserMenu, UserMenuAccount, UserMenuItem, ProductSwitch, ProductSwitchItem                                                                               |
| **User Settings**      | UserSettingsDialog, UserSettingsView, UserSettingsItem, UserSettingsAccountView, UserSettingsAppearanceView                                             |
| **Other**              | BarcodeScannerDialog, IllustratedMessage, Wizard, WizardStep, ViewSettingsDialog                                                                        |

Secondary entry points: `/types` (22 Fiori-specific enums: FCLLayout, IllustrationMessageDesign, MediaGalleryLayout, PageBackgroundDesign, TimelineLayout, UploadState, …), `/utils`, `/theming`.

---

## Running the Generator

```bash
# Regenerate ui5-webcomponents
nx run ui5-webcomponents-base:generate --skip-nx-cache
nx run ui5-webcomponents:generate --skip-nx-cache
nx run ui5-webcomponents-ai:generate --skip-nx-cache
nx run ui5-webcomponents-fiori:generate --skip-nx-cache

# Build ui5-webcomponents
nx run ui5-webcomponents-base:build --skip-nx-cache
nx run ui5-webcomponents:build --skip-nx-cache
nx run ui5-webcomponents-ai:build --skip-nx-cache
nx run ui5-webcomponents-fiori:build --skip-nx-cache
```

After generation, run `yarn format` before building or committing.
