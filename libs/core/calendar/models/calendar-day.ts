import { AbstractCalendarActiveCellStrategy, BaseCalendarCell } from './common';
export interface CalendarDay<D> extends BaseCalendarCell {
    date: D; // date representation
    weekDay: number; // weeks number in the year
    weekend: boolean; // to highlight Saturday and Sunday
    monthStatus?: 'previous' | 'current' | 'next'; // to mark days from sibling months
    specialDayNumber?: number; // special day marker flag
    shouldHideSpecialDayMarker?: boolean; // if the special day should be marked
    blocked?: boolean; // blocked date
    past?: boolean; // date in past
    selectedFirst?: boolean; // to highlight the first selected date in the range
    selectedLast?: boolean; // to highlight the last selected date in the range
    selectedRange?: boolean; // to highlight dates in the range between selectedFirst and selectedLast
    hoverRange?: boolean; // "true" for days included in date range selection before the the selection is confirmed
    isTabIndexed?: boolean; // if "true" sets day cell tabindex to "0"
}

/**
 * Active Calendar Day cell strategy
 */
export class ActiveCalendarDayCellStrategy<D = unknown> extends AbstractCalendarActiveCellStrategy<CalendarDay<D>> {
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
