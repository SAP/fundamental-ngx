# @fundamental-ngx/datetime-adapter

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fdatetime-adapter.svg)](//www.npmjs.com/package/@fundamental-ngx/datetime-adapter)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/datetime-adapter?label=npm%20downloads)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Description

Date/time adapter based on [Day.js](https://day.js.org/) for Fundamental NGX date and time components (Date Picker, Time Picker, DateTime Picker, etc.).

Fundamental NGX date components rely on the `DatetimeAdapter` abstraction from `@fundamental-ngx/core/datetime`. By default they use the built-in `FdDatetimeAdapter` (native `Date`). This package provides `DayjsDatetimeAdapter` as an alternative, which adds reliable locale-aware parsing and formatting via Day.js.

## Installation

```bash
npm install @fundamental-ngx/datetime-adapter dayjs
```

## Usage

Import `DayjsDatetimeAdapterModule` in the module or standalone component that hosts your date/time components:

```typescript
// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';

export const appConfig: ApplicationConfig = {
    providers: [importProvidersFrom(DayjsDatetimeAdapterModule)]
};
```

Or import it directly in a standalone component:

```typescript
import { Component } from '@angular/core';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';
import type { Dayjs } from 'dayjs';

@Component({
    selector: 'app-date-example',
    imports: [DatePickerComponent, DayjsDatetimeAdapterModule],
    template: `<fd-date-picker [(ngModel)]="date" />`
})
export class DateExampleComponent {
    date: Dayjs | null = null;
}
```

### Locale support

Day.js locale plugins are loaded separately. Import the locale before bootstrapping:

```typescript
import 'dayjs/locale/de';
import dayjs from 'dayjs';

dayjs.locale('de');
```

### Strict parsing and UTC mode

Configure the adapter via `DAYJS_DATE_TIME_ADAPTER_OPTIONS`:

```typescript
import { DAYJS_DATE_TIME_ADAPTER_OPTIONS } from '@fundamental-ngx/datetime-adapter';

providers: [{ provide: DAYJS_DATE_TIME_ADAPTER_OPTIONS, useValue: { strict: true, useUtc: false } }];
```

See the [documentation](https://sap.github.io/fundamental-ngx) for full configuration and format customization options.
