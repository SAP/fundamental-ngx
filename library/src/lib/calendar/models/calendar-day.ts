import { FdDate } from './fd-date';

export interface CalendarDay {
    date: FdDate;
    weekDay: number;
    disabled: boolean;
    monthStatus?: string,
    blocked?: boolean;
    selected?: boolean;
    selectedFirst?: boolean;
    selectedRange?: boolean;
    selectedLast?: boolean;
    today?: boolean;
    isTabIndexed?: boolean;
    ariaLabel?: string;
    id?: string;
}
