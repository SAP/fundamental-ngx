/**
 * Base Calendar Cell
 */
export interface BaseCalendarCell {
    label: string; // Representation in string
    id?: string; // cell unique id
    current?: boolean; // currently active (today)
    selected?: boolean; // selected cell
    disabled?: boolean; // disabled cell
    tabIndex?: number; // cell tabindex
    ariaLabel?: string; // aria-label
    ariaLabelledBy?: string; // aria-labelledby
    index?: number; // list index
}

export interface FocusableCalendarView {
    setFocusOnCell(): void;
}

/**
 * Calendar active cell strategy
 */
export abstract class AbstractCalendarActiveCellStrategy<T extends BaseCalendarCell = BaseCalendarCell> {
    /**
     * Calculate which table cell should be active
     */
    abstract getActiveCell(cells: T[]): T | null;
}

export class DefaultCalendarActiveCellStrategy<
    T extends BaseCalendarCell = BaseCalendarCell
> extends AbstractCalendarActiveCellStrategy<T> {
    /**
     * Calculate which table cell should be active
     */
    getActiveCell(cells: T[]): T | null {
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
