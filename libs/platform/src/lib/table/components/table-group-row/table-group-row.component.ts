import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    inject,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CollectionGroup, TableColumn, TableRow, TableService } from '@fundamental-ngx/platform/table-helpers';
import { Observable } from 'rxjs';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdp-table-group-row]',
    templateUrl: './table-group-row.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableGroupRowComponent<T> {
    /** Table ID. */
    @Input()
    id: string;
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
    private readonly _tableService = inject(TableService);

    /** @hidden */
    get _groupRulesMap(): Observable<Map<string, CollectionGroup>> {
        return this._tableService.groupRules$;
    }
}
