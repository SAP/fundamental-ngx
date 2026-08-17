import { DateTimeFormats } from '@fundamental-ngx/core/datetime';

export const DAYJS_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: 'L',
        timeInput: 'h:mm',
        dateTimeInput: 'L h:mm'
    },
    display: {
        dateInput: 'L',
        timeInput: 'h:mm A',
        dateTimeInput: 'L h:mm A',

        dateA11yLabel: 'YYYY MMMM DD',
        monthA11yLabel: 'MMMM',
        yearA11yLabel: 'YYYY'
    },
    rangeDelimiter: ' - '
};

/** Preset for applications that display and accept 24-hour time input. */
export const DAYJS_DATETIME_FORMATS_24H: DateTimeFormats = {
    parse: {
        dateInput: 'L',
        timeInput: 'H:mm',
        dateTimeInput: 'L H:mm'
    },
    display: {
        dateInput: 'L',
        timeInput: 'HH:mm',
        dateTimeInput: 'L HH:mm',

        dateA11yLabel: 'YYYY MMMM DD',
        monthA11yLabel: 'MMMM',
        yearA11yLabel: 'YYYY'
    },
    rangeDelimiter: ' - '
};
