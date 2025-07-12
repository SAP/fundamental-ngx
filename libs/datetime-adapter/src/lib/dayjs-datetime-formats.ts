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
