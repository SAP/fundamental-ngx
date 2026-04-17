# @fundamental-ngx/moment-adapter

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fmoment-adapter.svg)](//www.npmjs.com/package/@fundamental-ngx/moment-adapter)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

> **Legacy package.** Moment.js is in maintenance mode. Use [`@fundamental-ngx/datetime-adapter`](../datetime-adapter) (Day.js-based) instead for new projects.

## Description

Date/time adapter based on [Moment.js](https://momentjs.com/) for Fundamental NGX date and time components (Date Picker, Time Picker, DateTime Picker, etc.).

These components rely on the `DatetimeAdapter` abstraction. This package provides `MomentDatetimeAdapter` as an alternative to the built-in `FdDatetimeAdapter` (based on native `Date`), adding reliable parse format support via Moment.js.

## Installation

```bash
npm install @fundamental-ngx/moment-adapter moment
```

## Usage

```typescript
import { provideMomentDatetimeAdapter } from '@fundamental-ngx/moment-adapter';

// In your application config or module providers:
provideMomentDatetimeAdapter();
```
