import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    forwardRef,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import {
    CollectionFilter,
    SortDirection,
    Table,
    TableColumn,
    TableDialogCommonData,
    TableState
} from '@fundamental-ngx/platform/table-helpers';
import { FiltersComponent, FiltersDialogData, FiltersDialogResultData } from './filtering/filters.component';
import {
    GroupingComponent,
    SettingsGroupDialogData,
    SettingsGroupDialogResultData
} from './grouping/grouping.component';
import { SettingsSortDialogData, SettingsSortDialogResultData, SortingComponent } from './sorting/sorting.component';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';

export const dialogConfig: DialogConfig = {
    responsivePadding: false,
    verticalPadding: false,
    minWidth: '30%',
    /** 88px it's the header + footer height */
    bodyMinHeight: 'calc(50vh - 88px)'
};

/**
 * View settings dialog component.
 *
 * Used to link view settings filters options to the grid table.
 *
 * ```html
 * <fdp-table #myTable></fdp-table>
 * ...
 * <fdp-table-view-settings-dialog [table]="myTable">
 *     <fdp-table-view-settings-filter
 *         column="status"
 *         label="Status"
 *         type="single-select"
 *         values="[{value: 'filterValue', label: 'Filter label'}]">
 *     </fdp-table-view-settings-filter>
 * </fdp-table-view-settings-dialog>
 * ```
 * */
@Component({
    selector: 'fdp-table-view-settings-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class TableViewSettingsDialogComponent implements AfterViewInit, OnDestroy {
    /** Reference to table component. */
    @Input()
    set table(table: Table) {
        this._setTable(table);
    }

    get table(): Table {
        return this._table;
    }

    /** Whether to allow selecting '(Not sorted)' option in sorting dialog. */
    @Input()
    allowDisablingSorting = true;

    /** @hidden */
    @ContentChildren(forwardRef(() => TableViewSettingsFilterComponent))
    filters: QueryList<TableViewSettingsFilterComponent>;

    /** @hidden */
    _table: Table;

    /** @hidden */
    _dialogRef: DialogRef<TableDialogCommonData, any>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _tableSubscriptions = new Subscription();

    /** @hidden */
    constructor(private readonly _dialogService: DialogService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToFilters();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._unsubscribeFromTable();
    }

    /** Open Sort Settings Dialog */
    showSortingSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const sortBy = state.sortBy?.[0];
        const dialogData: SettingsSortDialogData = {
            columns: columns.filter(({ sortable }) => sortable),
            direction: sortBy?.direction,
            field: sortBy?.field,
            allowDisablingSorting: this.allowDisablingSorting
        };

        // dismiss any open dialog, before opening a new one
        if (this._dialogRef) {
            this._dialogRef.dismiss();
        }

        this._dialogRef = this._dialogService.open(
            SortingComponent,
            {
                ...dialogConfig,
                data: dialogData
            },
            this.table.injector
        );

        this._subscriptions.add(
            this._dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ field, direction }: SettingsSortDialogResultData) => {
                    this._applySorting(field, direction);
                })
        );
    }

    /** Open Filtering Settings Dialog */
    showFilteringSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const dialogData: FiltersDialogData = {
            columns,
            viewSettingsFilters: this.filters.toArray(),
            filterBy: state?.filterBy
        };

        // dismiss any open dialog, before opening a new one
        if (this._dialogRef) {
            this._dialogRef.dismiss();
        }

        this._dialogRef = this._dialogService.open(
            FiltersComponent,
            {
                ...dialogConfig,
                data: dialogData
            },
            this.table.injector
        );

        this._subscriptions.add(
            this._dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ filterBy }: FiltersDialogResultData) => this._applyFiltering(filterBy))
        );
    }

    /** Open Grouping Settings Dialog */
    showGroupingSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const dialogData: SettingsGroupDialogData = {
            columns: columns.filter(({ groupable }) => groupable),
            direction: state.groupBy?.[0]?.direction,
            field: state.groupBy?.[0]?.field
        };

        // dismiss any open dialog, before opening a new one
        if (this._dialogRef) {
            this._dialogRef.dismiss();
        }

        this._dialogRef = this._dialogService.open(
            GroupingComponent,
            {
                ...dialogConfig,
                data: dialogData
            },
            this.table.injector
        );

        this._subscriptions.add(
            this._dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ field, direction }: SettingsGroupDialogResultData) => {
                    this._applyGrouping(field, direction);
                })
        );
    }

    /** @hidden */
    private _listenToFilters(): void {
        this.filters.changes.pipe(startWith(null)).subscribe(() => {
            this._table?.showFilterSettingsInToolbar(this.filters.toArray().length > 0);
        });
    }

    /** @hidden */
    private _setTable(table: Table): void {
        this._table = table;
        this._unsubscribeFromTable();
        this._subscribeToTable();
    }

    /** @hidden */
    private _subscribeToTable(): void {
        if (!this._table) {
            return;
        }

        this._listenToTableTriggersToOpenDialogs();

        this._listenToTableColumns();
    }

    /** @hidden */
    private _listenToTableTriggersToOpenDialogs(): void {
        this._tableSubscriptions.add(this._table.openTableSortSettings.subscribe(() => this.showSortingSettings()));
        this._tableSubscriptions.add(this._table.openTableFilterSettings.subscribe(() => this.showFilteringSettings()));
        this._tableSubscriptions.add(this._table.openTableGroupSettings.subscribe(() => this.showGroupingSettings()));
    }

    /** @hidden */
    private _listenToTableColumns(): void {
        this._tableSubscriptions.add(
            this._table.tableColumnsStream.subscribe((columns: TableColumn[]) => {
                this._table?.showSortSettingsInToolbar(columns.some(({ sortable }) => sortable));
                this._table?.showGroupSettingsInToolbar(columns.some(({ groupable }) => groupable));
            })
        );
    }

    /** @hidden */
    private _getTableState(): TableState {
        return this._table?.getTableState();
    }

    /** @hidden */
    private _getTableColumns(): TableColumn[] {
        return this._table?.getTableColumns() || [];
    }

    /** @hidden */
    private _applySorting(field: string | null, direction: SortDirection): void {
        this._table?.sort(field ? [{ field, direction }] : []);
    }

    /** @hidden */
    private _applyFiltering(filters: CollectionFilter[]): void {
        this._table?.filter(filters);
    }

    /** @hidden */
    private _applyGrouping(field: string | null, direction: SortDirection): void {
        this._table?.group(field ? [{ field, direction, showAsColumn: true }] : []);
    }

    /** @hidden */
    private _unsubscribeFromTable(): void {
        this._tableSubscriptions.unsubscribe();
        this._tableSubscriptions = new Subscription();
    }
}
