# Fundamental Dayjs datetime adapter implementation

## Description

Fundamental Date Picker, Time Picker, Date Time Picker and similar components rely on provided datetime implementation `DatetimeAdapter` and datetime formats `DateTimeFormats`.

These components could be used with FdDatetimeAdapter, based on the JavaScript's native Date object, but one of the biggest shortcomings of the native Date object is the inability to set the parse format. As an alternative could be the DayjsDatetimeAdapter based on `Day.js` library or a custom DateAdapter that works with the formatting/parsing library of your choice.
