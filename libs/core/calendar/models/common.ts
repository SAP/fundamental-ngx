import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * Base Calendar Cell
 */
export interface BaseCalendarCell {
    /** Representation in string */
    label: string;
    /** cell unique id */
    id?: string;
    /** currently active (today) */
    current?: boolean;
    /** selected cell */
    selected?: boolean;
    /** disabled cell */
    disabled?: boolean;
    /** cell tabindex */
    tabIndex?: number;
    /** aria-label */
    ariaLabel?: string;
    /** aria-labelledby */
    ariaLabelledBy?: string;
    /** list index */
    index?: number;
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

export type EscapeFocusFunction = Nullable<(event?: KeyboardEvent) => void>;

export type DisableDateFunction<D> = Nullable<(date: D) => boolean>;
