import { Directive, inject, Input } from '@angular/core';
import { DEFAULT_TABLE_STATE, FDP_TABLE_STATE_DIRECTIVE } from '../constants';
import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from '../interfaces';
import { TableInitialState } from '../models';
import { TableService } from '../services/table.service';
import { Table } from '../table';

@Directive({
    selector: `[fdpTableInitialState],
    fdp-table`,
    standalone: true,
    providers: [
        {
            provide: FDP_TABLE_STATE_DIRECTIVE,
            useExisting: TableInitialStateDirective
        }
    ]
})
export class TableInitialStateDirective extends TableInitialState {
    /** Initial visible columns. Consist of a list of unique column names */
    @Input()
    initialVisibleColumns: string[];

    /** Initial sort options. */
    @Input()
    initialSortBy: CollectionSort[] = [];

    /** Initial filter options. */
    @Input()
    initialFilterBy: CollectionFilter[] = [];

    /** Initial group options. */
    @Input()
    initialGroupBy: CollectionGroup[] = [];

    /** Initial page. */
    @Input()
    initialPage = 1;

    /**
     * Initial state of table.
     */
    @Input()
    set state(value: TableState) {
        this.setTableState(value || DEFAULT_TABLE_STATE);
    }

    get state(): TableState {
        return this.getTableState();
    }

    /** @hidden */
    private _table: Table;

    /** @hidden */
    private readonly _tableService = inject(TableService);

    /** @hidden */
    setTable(table: Table): void {
        this._table = table;
    }

    /** @hidden */
    setInitialState(): void {
        const prevState = this.getTableState();
        const columns = this._table.getTableColumns();
        const page = prevState.page;
        const visibleColumns =
            this.initialVisibleColumns ||
            (prevState.columns.length ? prevState.columns : columns.map(({ name }) => name));

        const directiveInitialPage = this.initialPage ?? 1;

        this._table._loadPreviousPages =
            this._table.pageScrolling && this._table.loadPagesBefore && directiveInitialPage > 1;

        const initialPage = this._table._loadPreviousPages
            ? 1
            : directiveInitialPage < page.currentPage
            ? page.currentPage
            : directiveInitialPage;

        const initialPageSize =
            (this._table._loadPreviousPages ? directiveInitialPage : initialPage) *
            (this._table.pageSize || page.pageSize);

        this.setTableState({
            ...prevState,
            columns: visibleColumns,
            columnKeys: columns.filter((c) => visibleColumns.includes(c.name)).map((c) => c.key),
            sortBy: this.initialSortBy || prevState.sortBy,
            filterBy: this.initialFilterBy || prevState.filterBy,
            groupBy: this.initialGroupBy || prevState.groupBy,
            freezeToColumn: this._table.freezeColumnsTo || prevState.freezeToColumn,
            freezeToEndColumn: this._table.freezeEndColumnsTo || prevState.freezeToEndColumn,
            page: {
                currentPage: initialPage,
                pageSize: initialPageSize
            }
        });
    }

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableService.getTableState();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableService.setTableState(state);
    }
}
