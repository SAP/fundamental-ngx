# @fundamental-ngx/moment-adapter

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fmoment-adapter.svg)](//www.npmjs.com/package/@fundamental-ngx/moment-adapter)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

> **Legacy package.** Moment.js is in [maintenance mode](https://momentjs.com/docs/#/-project-status/). Use [`@fundamental-ngx/datetime-adapter`](../datetime-adapter) (Day.js-based) for new projects.

## Description

Date/time adapter based on [Moment.js](https://momentjs.com/) for Fundamental NGX date and time components (Date Picker, Time Picker, DateTime Picker, etc.).

Fundamental NGX date components rely on the `DatetimeAdapter` abstraction from `@fundamental-ngx/core/datetime`. This package provides `MomentDatetimeAdapter` as an alternative to the built-in `FdDatetimeAdapter` (native `Date`), adding locale-aware parsing and formatting via Moment.js.

## Installation

```bash
npm install @fundamental-ngx/moment-adapter moment
```

## Usage

> **Deprecation note:** `MomentDatetimeAdapterModule` and `MomentDatetimeModule` are deprecated since v0.20.0 and emit a console warning. Migrate to `@fundamental-ngx/datetime-adapter` to eliminate these warnings.

Import `MomentDatetimeAdapterModule` in the module or standalone component that hosts your date/time components:

```typescript
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { MomentDatetimeAdapterModule } from '@fundamental-ngx/moment-adapter';

export const appConfig: ApplicationConfig = {
    providers: [importProvidersFrom(MomentDatetimeAdapterModule)]
};
```

Or import it directly in a standalone component:

```typescript
import { Component } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { MomentDatetimeAdapterModule } from '@fundamental-ngx/moment-adapter';
import type { Moment } from 'moment';

@Component({
    selector: 'app-date-example',
    imports: [DatePickerComponent, MomentDatetimeAdapterModule],
    template: `<fd-date-picker [(ngModel)]="date" />`
})
export class DateExampleComponent {
    date: Moment | null = null;
}
```

## Migration to Day.js adapter

Replace `MomentDatetimeAdapterModule` with `DayjsDatetimeAdapterModule` from `@fundamental-ngx/datetime-adapter`:

```bash
npm uninstall @fundamental-ngx/moment-adapter moment
npm install @fundamental-ngx/datetime-adapter dayjs
```

```typescript
// Before
import { MomentDatetimeAdapterModule } from '@fundamental-ngx/moment-adapter';

// After
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';
```

Component model types change from `Moment` to `Dayjs`. See the [datetime-adapter README](../datetime-adapter) for the full Day.js setup.
