import { AbstractActiveCalendarCellStrategy, BaseCalendarCell } from './common';
export interface CalendarDay<D> extends BaseCalendarCell {
    date: D;
    weekDay: number;
    weekend: boolean;
    monthStatus?: 'previous' | 'current' | 'next';
    specialNumber?: number;
    blocked?: boolean;
    selectedFirst?: boolean;
    selectedLast?: boolean;
    selectedRange?: boolean;
    hoverRange?: boolean;
    isTabIndexed?: boolean;
}

/**
 * Active Calendar Day cell strategy
 */
export class ActiveCalendarDayCellStrategy<D = unknown> extends AbstractActiveCalendarCellStrategy<CalendarDay<D>> {
    /**
     * Calculate which table cell should be active
     */
    getActiveCell(cells: CalendarDay<D>[]): CalendarDay<D> | null {
        const selected = cells.find((cell) => cell.selected);
        if (selected) {
            return selected;
        }
        const current = cells.find((cell) => cell.current);
        if (current) {
            return current;
        }
        const fistDayInMonth = cells.find((cell) => cell.monthStatus === 'current');
        if (fistDayInMonth) {
            return fistDayInMonth;
        }
        return cells[0] || null;
    }
}
