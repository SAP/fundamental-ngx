import { BaseCalendarCell } from './common';
export interface CalendarMonth extends BaseCalendarCell {
    /** 1 - 12 */
    month: number;
    index: number;
}
