import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    EventEmitter,
    Output,
    inject
} from '@angular/core';
import {
    isTreeRow,
    isTreeRowFirstCell,
    SelectionMode,
    SelectionModeValue,
    TableRow,
    TableService
} from '@fundamental-ngx/platform/table-helpers';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-popping-row]',
    templateUrl: './table-popping-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TablePoppingRowComponent<T> {
    /** Table Row. */
    @Input()
    row: TableRow<T>;

    /** Whether the row is selected. */
    @HostBinding('attr.aria-selected')
    @Input()
    checked: boolean | null;

    /** Current selection mode. */
    @Input()
    selectionMode: SelectionModeValue;

    /** Event emitted when group row expansion state needs to be toggled. */
    @Output()
    toggleGroupRow = new EventEmitter<TableRow<T>>();

    /** Event emitted when cell being clicked on. */
    @Output()
    cellClicked = new EventEmitter<{ index: number; row: TableRow<T> }>();

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly _isTreeRow = isTreeRow;

    /** @hidden */
    readonly _isTreeRowFirstCell = isTreeRowFirstCell;

    /** @hidden */
    readonly _tableService = inject(TableService);
}
