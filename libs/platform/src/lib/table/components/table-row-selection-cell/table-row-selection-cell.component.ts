import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, ViewEncapsulation } from '@angular/core';
import { SelectionMode, SelectionModeValue, TableRow, TableRowService } from '@fundamental-ngx/platform/table-helpers';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-row-selection-cell]',
    templateUrl: './table-row-selection-cell.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowSelectionCellComponent<T> {
    /** Table Row. */
    @Input()
    row: TableRow<T>;
    /** Current Selection Mode. */
    @Input()
    selectionMode: SelectionModeValue;

    /** Whether fixed. */
    @HostBinding('class.fd-table__cell--fixed')
    @Input()
    fixed: boolean;

    /**
     *  When True, the checked state of each tree item depends on the checked
     *  state of its parent or direct child.
     */
    @Input()
    enableTristateMode: boolean;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    private readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    @HostBinding('attr.role')
    private get _role(): string {
        return this.selectionMode === SelectionMode.SINGLE ? 'rowheader' : 'cell';
    }

    /** @hidden */
    @HostBinding('class')
    private get _initialClass(): string {
        return 'fd-table__cell--checkbox';
    }

    /** @hidden */
    _toggleMultiSelectRow(row: TableRow, event: KeyboardEvent | MouseEvent): void {
        this._tableRowService.toggleRow({
            type: 'toggleMultiSelectRow',
            row,
            event
        });
    }
}
