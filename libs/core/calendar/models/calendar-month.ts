import { BaseCalendarCell } from './common';
export interface CalendarMonth<D> extends BaseCalendarCell {
    /** 1 - 12 */
    month: number;
    index: number;
    date: D; // date representation
    selectedFirst?: boolean; // to highlight the first selected month in the range
    selectedLast?: boolean; // to highlight the last selected month in the range
    selectedRange?: boolean; // to highlight dates in the range between selectedFirst and selectedLast
    hoverRange?: boolean; // "true" for months included in date range selection before the the selection is confirmed
}
