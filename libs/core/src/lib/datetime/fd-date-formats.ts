import { DateTimeFormats } from './datetime-formats';

const dateInput = { year: 'numeric', month: 'numeric', day: 'numeric' };
const timeInput = { hour: 'numeric', minute: '2-digit' };
const dateTimeInput = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
};

export const FD_DATETIME_FORMATS: DateTimeFormats = {
    parse: {
        dateInput: dateInput,
        timeInput: timeInput,
        dateTimeInput: dateTimeInput
    },
    display: {
        dateInput: dateInput,
        timeInput: timeInput,
        dateTimeInput: dateTimeInput,

        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthA11yLabel: { month: 'long', year: 'numeric' },
        yearA11yLabel: { year: 'numeric' }
    },
    rangeDelimiter: ' - '
};
