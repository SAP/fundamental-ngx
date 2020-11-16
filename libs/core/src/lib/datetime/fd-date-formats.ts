import { DateTimeFormats } from './datetime-formats';

export const FD_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: null,
        timeInput: null,
        dateTimeInput: null
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        timeInput: { hour: 'numeric', minute: '2-digit' },
        dateTimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        },

        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthA11yLabel: { month: 'long' },
        yearA11yLabel: { year: 'numeric' }
    },
    rangeDelimiter: ' - '
};
