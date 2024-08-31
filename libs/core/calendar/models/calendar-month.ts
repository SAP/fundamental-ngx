import { AbstractCalendarActiveCellStrategy, BaseCalendarCell } from './common';
export interface CalendarMonth<D> extends BaseCalendarCell {
    /** 1 - 12 */
    month: number;
    index: number;
    date: D; // date representation
    selectedFirst?: boolean; // to highlight the first selected month in the range
    selectedLast?: boolean; // to highlight the last selected month in the range
    selectedRange?: boolean; // to highlight dates in the range between selectedFirst and selectedLast
    hoverRange?: boolean; // "true" for days included in date range selection before the the selection is confirmed
}

/**
 * Active Calendar Month cell strategy
 */
export class ActiveCalendarMonthCellStrategy<D = unknown> extends AbstractCalendarActiveCellStrategy<CalendarMonth<D>> {
    /**
     * Calculate which table cell should be active
     */
    getActiveCell(cells: CalendarMonth<D>[]): CalendarMonth<D> | null {
        const selected = cells.find((cell) => cell.selected);
        if (selected) {
            return selected;
        }
        const current = cells.find((cell) => cell.current);
        if (current) {
            return current;
        }
        return cells[0] || null;
    }
}
