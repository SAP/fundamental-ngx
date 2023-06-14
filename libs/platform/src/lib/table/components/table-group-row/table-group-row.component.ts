import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    OnChanges,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FDK_FOCUSABLE_LIST_DIRECTIVE,
    FocusableItemDirective,
    Nullable
} from '@fundamental-ngx/cdk/utils';
import { TableRowDirective } from '@fundamental-ngx/core/table';
import { CollectionGroup, TableColumn, TableRow, TableService } from '@fundamental-ngx/platform/table-helpers';
import { Observable } from 'rxjs';

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
    ]
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
    private readonly _fdpTableService = inject(TableService);

    /** @hidden */
    get _groupRulesMap(): Observable<Map<string, CollectionGroup>> {
        return this._fdpTableService.groupRules$;
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        if ('row' in changes || 'keyToColumnMap' in changes) {
            this._column = this.keyToColumnMap.get(this.row.value?.['field']);
        }
    }
}
