import { DateTimeFormats } from './datetime-formats';

export const FD_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: null,
        timeInput: null,
        dateTimeInput: null
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        timeInput: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
        dateTimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        },

        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthA11yLabel: { month: 'long' },
        yearA11yLabel: { year: 'numeric' }
    },
    rangeDelimiter: ' - '
};
