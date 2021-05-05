import { DateTimeFormats } from '@fundamental-ngx/core';

export const MOMENT_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: 'l',
        timeInput: 'h:mm A',
        dateTimeInput: 'l h:mm A'
    },
    display: {
        dateInput: 'l',
        timeInput: 'h:mm A',
        dateTimeInput: 'l h:mm A',

        dateA11yLabel: 'YYYY MMMM DD',
        monthA11yLabel: 'MMMM',
        yearA11yLabel: 'YYYY'
    },
    rangeDelimiter: ' - '
};
