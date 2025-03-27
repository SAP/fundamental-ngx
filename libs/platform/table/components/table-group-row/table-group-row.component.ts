import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation,
    inject
} from '@angular/core';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    Nullable
} from '@fundamental-ngx/cdk/utils';
import { TableCellDirective, TableRowDirective } from '@fundamental-ngx/core/table';
import { TableColumn, TableRow, TableService } from '@fundamental-ngx/platform/table-helpers';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-group-row]',
    templateUrl: './table-group-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FDK_FOCUSABLE_LIST_DIRECTIVE,
            useExisting: TableGroupRowComponent
        }
    ],
    host: {
        role: 'row',
        '[attr.aria-expanded]': 'row.expanded'
    },
    imports: [TableCellDirective, NgTemplateOutlet]
})
export class TableGroupRowComponent<T> extends TableRowDirective implements OnChanges {
    /** Table ID. */
    @Input()
    rowId: string;
    /** Row index. */
    @HostBinding('attr.aria-rowindex')
    @Input()
    index: number;

    /** Row height. */
    @HostBinding('style.height.px')
    @Input()
    height: number;

    /** Whether the row is draggable. */
    @HostBinding('class.fd-table__row--draggable')
    @Input()
    draggable = false;

    /** Table Row. */
    @Input()
    row: TableRow<T>;

    /** Key to column mapping. */
    @Input()
    keyToColumnMap: Map<string, TableColumn>;

    /** Table columns length. */
    @Input()
    tableColumnsLength: number;

    /** Event emitted when group row expansion state needs to be toggled. */
    @Output()
    toggleGroupRow = new EventEmitter<TableRow<T>>();

    /** @hidden */
    _column: Nullable<TableColumn>;

    /** @hidden */
    @ViewChildren(FDK_FOCUSABLE_ITEM_DIRECTIVE)
    private set _focusableViewCellItems(items: QueryList<FocusableItemDirective>) {
        this.setItems(items);
    }

    /** @hidden */
    readonly _fdpTableService = inject(TableService);

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if ('row' in changes || 'keyToColumnMap' in changes) {
            this._column = this.keyToColumnMap.get(this.row.value?.['field']);
        }
    }
}
