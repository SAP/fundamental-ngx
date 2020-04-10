import { FdDate } from './fd-date';

export interface CalendarDay {
    date: FdDate;
    weekDay: number;
    weekend: boolean;
    disabled?: boolean;
    monthStatus?: string;
    blocked?: boolean;
    selected?: boolean;
    selectedFirst?: boolean;
    selectedRange?: boolean;
    hoverRange?: boolean;
    selectedLast?: boolean;
    today?: boolean;
    isTabIndexed?: boolean;
    ariaLabel?: string;
    id?: string;
    index?: number;
    specialNumber?: number
}
