import { InjectionToken } from '@angular/core';

/**
 * DateTimeFormats is intended to keep options
 * related to date-time formatting / parsing
 *
 */
export interface DateTimeFormats {
    parse: {
        dateInput: unknown;
        timeInput: unknown;
        dateTimeInput: unknown;
    };
    display: {
        dateInput: unknown;
        timeInput: unknown;
        dateTimeInput: unknown;

        dateA11yLabel: unknown;
        monthA11yLabel: unknown;
        yearA11yLabel: unknown;
    };
    rangeDelimiter: string;
};

/**
 * DateTimeFormats injection token
 */
export const DATE_TIME_FORMATS = new InjectionToken<DateTimeFormats>('date-formats');
