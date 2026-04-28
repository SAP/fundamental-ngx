# @fundamental-ngx/moment-adapter

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fmoment-adapter.svg)](//www.npmjs.com/package/@fundamental-ngx/moment-adapter)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

> **Legacy package.** Moment.js is in [maintenance mode](https://momentjs.com/docs/#/-project-status/). Use [`@fundamental-ngx/datetime-adapter`](https://www.npmjs.com/package/@fundamental-ngx/datetime-adapter) (Day.js-based) for new projects.

## Description

Date/time adapter based on [Moment.js](https://momentjs.com/) for Fundamental NGX date and time components (Date Picker, Time Picker, DateTime Picker, etc.).

Fundamental NGX date components rely on the `DatetimeAdapter` abstraction from `@fundamental-ngx/core/datetime`. This package provides `MomentDatetimeAdapter` as an alternative to the built-in `FdDatetimeAdapter` (native `Date`), adding locale-aware parsing and formatting via Moment.js.

## Prerequisites

`@fundamental-ngx/core` must already be installed and configured in your project. If you are starting from scratch, follow the [@fundamental-ngx/core setup guide](https://www.npmjs.com/package/@fundamental-ngx/core) first before adding this adapter.

## Installation

Install the same version as your existing `@fundamental-ngx/core` package to satisfy the exact peer dependency:

```bash
npm install @fundamental-ngx/moment-adapter@<your-core-version> moment
```

For example, if your project has `@fundamental-ngx/core@0.61.1`:

```bash
npm install @fundamental-ngx/moment-adapter@0.61.1 moment
```

> **Note:** `@fundamental-ngx/moment-adapter` has an exact peer dependency on `@fundamental-ngx/core`. Installing a mismatched version will produce a peer dependency conflict.

## Build configuration

### Bundle size

Moment.js adds ~330 kB (minified) to your initial bundle. The default Angular CLI hard budget is 1 MB; adding this adapter to a fresh app will exceed it and cause `ng build` to fail:

```
✘ [ERROR] bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 214.56 kB
```

Either raise the budget in `angular.json`:

```json
"budgets": [{ "type": "initial", "maximumError": "2mb" }]
```

Or lazy-load components that use the date picker so moment is not part of the initial chunk (preferred for production apps).

### CommonJS warning

Angular's build system warns that `moment` is not ESM, because it cannot be fully tree-shaken:

```
▲ [WARNING] Module 'moment' is not ESM
```

Suppress it in `angular.json` under `build > options`:

```json
"allowedCommonJsDependencies": ["moment"]
```

## Modules

This package exports two NgModules. Choose the one that fits your use case:

| Module                        | Provides                                                  | Use when                                                    |
| ----------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| `MomentDatetimeModule`        | `DatetimeAdapter` + `DATE_TIME_FORMATS` (Moment defaults) | **Most users** — drop-in replacement for `FdDatetimeModule` |
| `MomentDatetimeAdapterModule` | `DatetimeAdapter` only                                    | You supply your own `DATE_TIME_FORMATS` token               |

> **Important:** Date picker components (`fd-date-picker`, `fd-datetime-picker`, etc.) require **both** `DatetimeAdapter` and `DATE_TIME_FORMATS` to be provided. If you use `MomentDatetimeAdapterModule` alone, components will throw at runtime:
>
> ```
> FdDatePicker: No provider found for DATE_TIME_FORMATS.
> ```
>
> Either use `MomentDatetimeModule` (which covers both), or pair `MomentDatetimeAdapterModule` with a manual `{ provide: DATE_TIME_FORMATS, useValue: MOMENT_DATETIME_FORMATS }` provider.

> **Deprecation note:** Both modules are deprecated since v0.20.0 and emit a console warning on startup. You will see one of the following messages in your browser console — these are expected and not errors:
>
> ```
> MomentDatetimeModule is deprecated since version 0.20.0 and will be removed in future release. Use DatetimeAdapterModule from @fundamental-ngx/datetime-adapter package instead.
> ```
>
> ```
> MomentDatetimeAdapterModule is deprecated since version 0.20.0 and will be removed in future release. Use DatetimeAdapterRawModule from @fundamental-ngx/datetime-adapter package instead.
> ```
>
> Migrate to `@fundamental-ngx/datetime-adapter` to eliminate these warnings.

## Usage

### Application-wide (recommended)

Provide the module at the application root via `app.config.ts`:

```typescript
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter';

export const appConfig: ApplicationConfig = {
    providers: [
        // ... your existing providers ...
        importProvidersFrom(MomentDatetimeModule)
    ]
};
```

### Standalone component

Import the module in the `imports` array of the standalone component that hosts your date/time components. Don't forget `FormsModule` (or `ReactiveFormsModule`) when using `ngModel` or reactive forms:

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter';
import type { Moment } from 'moment';

@Component({
    selector: 'app-date-example',
    imports: [DatePickerComponent, MomentDatetimeModule, FormsModule],
    template: `<fd-date-picker [(ngModel)]="date" />`
})
export class DateExampleComponent {
    date: Moment | null = null;
}
```

### Custom formats (advanced)

Use `MomentDatetimeAdapterModule` when you want to supply your own format configuration:

```typescript
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { DATE_TIME_FORMATS } from '@fundamental-ngx/core/datetime';
import { MomentDatetimeAdapterModule, MOMENT_DATETIME_FORMATS } from '@fundamental-ngx/moment-adapter';

const MY_FORMATS = {
    ...MOMENT_DATETIME_FORMATS,
    display: {
        ...MOMENT_DATETIME_FORMATS.display,
        dateInput: 'DD/MM/YYYY'
    }
};

export const appConfig: ApplicationConfig = {
    providers: [importProvidersFrom(MomentDatetimeAdapterModule), { provide: DATE_TIME_FORMATS, useValue: MY_FORMATS }]
};
```

## Migration to Day.js adapter

Replace `MomentDatetimeModule` with `DayjsDatetimeAdapterModule` from `@fundamental-ngx/datetime-adapter`:

```bash
npm uninstall @fundamental-ngx/moment-adapter moment
npm install @fundamental-ngx/datetime-adapter dayjs
```

```typescript
// Before
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter';

// After
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';
```

Component model types change from `Moment` to `Dayjs`. See the [`@fundamental-ngx/datetime-adapter` README](https://www.npmjs.com/package/@fundamental-ngx/datetime-adapter) for the full Day.js setup.
