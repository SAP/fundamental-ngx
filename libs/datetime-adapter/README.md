# @fundamental-ngx/datetime-adapter

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fdatetime-adapter.svg)](//www.npmjs.com/package/@fundamental-ngx/datetime-adapter)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/datetime-adapter?label=npm%20downloads)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Description

Date/time adapter based on [Day.js](https://day.js.org/) for Fundamental NGX date and time components (Date Picker, Time Picker, DateTime Picker, etc.).

These components rely on the `DatetimeAdapter` abstraction. This package provides `DayjsDatetimeAdapter` as an alternative to the built-in `FdDatetimeAdapter` (based on native `Date`), adding reliable parse format support.

## Installation

```bash
npm install @fundamental-ngx/datetime-adapter dayjs
```

## Usage

```typescript
import { provideDatetimeAdapter } from '@fundamental-ngx/datetime-adapter';

// In your application config or module providers:
provideDatetimeAdapter();
```

See the [documentation](https://sap.github.io/fundamental-ngx) for full configuration and format customization options.
