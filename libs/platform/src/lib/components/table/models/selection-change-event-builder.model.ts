import { SelectionMode } from '../enums/selection-mode.enum';
import { SelectionChangeEvent } from './selection-change-event.model';
import { TableRow } from './table-row.model';

/**
 * Selection Event builder class
 *
 * Used to encapsulate selection logic
 * and intermediate values
 */
export class TableRowSelectionEventBuilder<T> {
    private added: TableRow[] = [];
    private removed: TableRow[] = [];

    constructor(private mode: SelectionMode, private rows: TableRow[]) {}

    /**
     * Toggle one row
     * @param row to toggle checked state
     */
    toggle(row: TableRow): void {
        const checked = !row.checked;

        row.checked = checked;

        if (this.mode === SelectionMode.SINGLE) {
            // uncheck previously checked
            this.getSelectableRows().forEach((_row) => {
                if (_row === row) {
                    return;
                }
                if (_row.checked) {
                    _row.checked = false;
                    this.removed.push(row);
                }
            });
        }

        checked ? this.added.push(row) : this.removed.push(row);
    }

    /**
     * Select / Unselect all selectable rows
     * @param selectAll select/unselect all flag
     */
    toggleAll(selectAll: boolean): void {
        this.getSelectableRows().forEach((row) => {
            if (row.checked === selectAll) {
                return;
            }
            row.checked = selectAll;
            selectAll ? this.added.push(row) : this.removed.push(row);
        });
    }

    /**
     * Create table row selection event
     */
    createEvent(): SelectionChangeEvent<T> {
        const selected = this.getSelectableRows()
            .filter(({ checked }) => checked)
            .map(({ value }) => value);
        return {
            selection: selected,
            added: this.added.map(({ value }) => value),
            removed: this.removed.map(({ value }) => value),
            index: this.added.concat(this.removed).map(({ index }) => index)
        };
    }

    /**
     * Check if all selectable rows are selected
     */
    isAllSelected(): boolean {
        return this.getSelectableRows().every(({ checked }) => checked);
    }

    private getSelectableRows(): TableRow[] {
        return this.rows.filter(({ type }) => type === 'item');
    }
}
