import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { DisabledBehaviorDirective, FDK_FOCUSABLE_LIST_DIRECTIVE, ValueByPathPipe } from '@fundamental-ngx/cdk/utils';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { TableCellDirective, TableRowDirective, TableTextDirective } from '@fundamental-ngx/core/table';
import {
    SelectionMode,
    SelectionModeValue,
    TableRow,
    TableService,
    isTreeRow,
    isTreeRowFirstCell
} from '@fundamental-ngx/platform/table-helpers';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-popping-row]',
    templateUrl: './table-popping-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TablePoppingRowComponent
        }
    ],
    host: {
        role: 'row',
        '[attr.aria-expanded]': '_isTreeRow(row) ? row.expanded : null'
    },
    imports: [
        TableCellDirective,
        DisabledBehaviorDirective,
        TableTextDirective,
        FormLabelComponent,
        NgTemplateOutlet,
        ValueByPathPipe
    ]
})
export class TablePoppingRowComponent<T> extends TableRowDirective {
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
    readonly _fdpTableService = inject(TableService);
}
