import { DateTimeFormats } from './datetime-formats';

export const FD_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: null,
        timeInput: 'hh:mm:ss',
        dateTimeInput: null
    },
    display: {
        dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
        timeInput: { hour: 'numeric', second: 'numeric', seconds: 'numeric' },
        dateTimeInput: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            second: 'numeric',
            seconds: 'numeric'
        },

        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthA11yLabel: { month: 'long' },
        yearA11yLabel: { year: 'numeric' }
    }
};
