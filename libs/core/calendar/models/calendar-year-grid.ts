import { BaseCalendarCell } from './common';
export interface CalendarYearGrid {
    /** Number of rows in year grid */
    rows: number;

    /** Number of columns in year grid */
    cols: number;

    /**
     * Year map method, thanks to it the year can be displayed as user desire.
     */
    yearMapping?: (year: number) => string;
}

export interface CalendarYear<D> extends BaseCalendarCell {
    year: number;
    index: number;
    date: D; // date representation
    selectedFirst?: boolean; // to highlight the first selected year in the range
    selectedLast?: boolean; // to highlight the last selected year in the range
    selectedRange?: boolean; // to highlight years in the range between selectedFirst and selectedLast
    hoverRange?: boolean; // "true" for years included in date range selection before the the selection is confirmed
}
