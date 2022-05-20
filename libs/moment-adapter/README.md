# Fundamental Moment date time adapter implementation

## Moment.js status

Moment.js is a legacy project, now in maintenance mode. Same applies to this adapter, which is based on Moment.js. Please consider using `@fundamental-ngx/datetime-adapter` instead.

## Description

Fundamental Date Picker, Time Picker, Date Time Picker and similar components rely on provided datetime implementation (DatetimeAdapter) and datetime formats (DateTimeFormats).

These components could be used with FdDatetimeAdapter, based on the JavaScript's native Date object, but one of the biggest shortcomings of the native Date object is the inability to set the parse format. As an alternative could be the MomentDateAdapter or a custom DateAdapter that works with the formatting/parsing library of your choice.
