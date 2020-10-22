import { InjectionToken } from '@angular/core';

/**
 * DateTimeFormats is intended to keep options
 * related to date-time formatting / parsing
 *
 */
export interface DateTimeFormats {
    parse: {
        dateInput: any;
        timeInput: any;
        dateTimeInput: any;
    };
    display: {
        dateInput: any;
        timeInput: any;
        dateTimeInput: any;

        dateA11yLabel: any;
        monthA11yLabel: any;
        yearA11yLabel: any;
    };
}

export const DATE_FORMATS = new InjectionToken<DateTimeFormats>('date-formats');
