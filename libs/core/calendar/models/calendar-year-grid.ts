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

export interface CalendarYear extends BaseCalendarCell {
    year: number;
    index: number;
}
