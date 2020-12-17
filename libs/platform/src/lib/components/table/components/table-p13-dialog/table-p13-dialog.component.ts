import { ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DialogConfig, DialogService } from '@fundamental-ngx/core';

import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from '../../interfaces';
import { Table } from '../../table';
import { TableColumn } from '../table-column/table-column';

import { TableP13SortComponent } from './table-p13-sort.component';
import { TableP13GroupComponent } from './table-p13-group.component';
import { TableP13FilterComponent } from './table-p13-filter.component';
import { TableP13ColumnsComponent } from './table-p13-columns.component';

import { SortDialogData, SortDialogResultData, P13SortingComponent } from './sorting/sorting.component';
import { filter } from 'rxjs/operators';

const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30%',
    minHeight: '50%'
};

/**
 * View settings dialog component.
 *
 * Used to link view settings filters options to the grid table.
 *
 * ```html
 * <fdp-table #myTable></fdp-table>
 * ...
 * <fdp-table-p13-dialog [table]="myTable">
 *   <!-- Sort Panel -->
 *   <fdp-table-p13n-sort></fdp-table-p13n-sort>
 *
 *   <!-- Filter Panel -->
 *   <fdp-table-p13n-filter></fdp-table-p13n-filter>
 *
 *   <!-- Group Panel -->
 *   <fdp-table-p13n-group></fdp-table-p13n-group>
 *
 *   <!-- Columns Panel -->
 *   <fdp-table-p13n-columns></fdp-table-p13n-columns>
 * </fdp-table-p13-dialog>
 * ```
 * */
@Component({
    selector: 'fdp-table-p13-dialog',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableP13DialogComponent implements OnDestroy {
    /** Reference to table component. */
    @Input()
    set table(table: Table) {
        this._setTable(table);
    }
    get table(): Table {
        return this._table;
    }

    /** @hidden */
    @ContentChild(TableP13SortComponent)
    sort: TableP13SortComponent;

    /** @hidden */
    @ContentChild(TableP13FilterComponent)
    filter: TableP13FilterComponent;

    /** @hidden */
    @ContentChild(TableP13GroupComponent)
    group: TableP13GroupComponent;

    /** @hidden */
    @ContentChild(TableP13ColumnsComponent)
    columns: TableP13ColumnsComponent;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _tableSubscriptions = new Subscription();

    /** @hidden */
    _table: Table;

    constructor(private readonly _dialogService: DialogService) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._unsubscribeFromTable();
    }

    /** Open Sort Settings Dialog */
    showSortingSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns().filter(({ sortable }) => sortable);
        const sortBy = state.sortBy;
        const dialogData: SortDialogData = {
            columns: columns,
            collectionSort: sortBy
        };

        const dialogRef = this._dialogService.open(P13SortingComponent, {
            ...dialogConfig,
            data: dialogData
        });

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ collectionSort }: SortDialogResultData) => {
                    this._applySorting(collectionSort);
                })
        );
    }

    /** Open Filtering Settings Dialog */
    showFilteringSettings(): void {
        /* const state = this._getTableState();
        const columns = this._getTableColumns();
        const dialogData: FiltersDialogData = {
            columns: columns,
            viewSettingsFilters: this.filters.toArray(),
            filterBy: state?.filterBy
        };

        const dialogRef = this._dialogService.open(FiltersComponent, {
            responsivePadding: false,
            verticalPadding: false,
            minWidth: '30%',
            minHeight: '50%',
            data: dialogData
        } as DialogConfig);

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ filterBy }: FiltersDialogResultData) => this._applyFiltering(filterBy))
        ); */
    }

    /** Open Grouping Settings Dialog */
    showGroupingSettings(): void {
        /* const state = this._getTableState();
        const columns = this._getTableColumns();
        const dialogData: GroupDialogData = {
            columns: columns.filter(({ groupable }) => groupable),
            direction: state.groupBy?.[0]?.direction,
            field: state.groupBy?.[0]?.field
        };

        const dialogRef = this._dialogService.open(GroupingComponent, {
            ...dialogConfig,
            data: dialogData
        });

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ field, direction }: GroupDialogResultData) => {
                    this._applyGrouping(field, direction);
                })
        ); */
    }

    /** Open Columns Settings Dialog */
    showColumnsSettings(): void {
        this._applyColumns([]);
    }

    /** @hidden */
    private _setTable(table: Table): void {
        this._table = table;

        this._unsubscribeFromTable();

        if (this._table) {
            this._subscribeToTable();
        }
    }

    /** @hidden */
    private _subscribeToTable(): void {
        this._listenToTableTriggersToOpenDialogs();
        this._listenToTableColumns();
    }

    /** @hidden */
    private _listenToTableTriggersToOpenDialogs(): void {
        this._tableSubscriptions.add(this._table.openTableSortSettings.subscribe(() => this.showSortingSettings()));
        this._tableSubscriptions.add(this._table.openTableFilterSettings.subscribe(() => this.showFilteringSettings()));
        this._tableSubscriptions.add(this._table.openTableGroupSettings.subscribe(() => this.showGroupingSettings()));
        this._tableSubscriptions.add(this._table.openTableColumnSettings.subscribe(() => this.showColumnsSettings()));
    }

    /** @hidden */
    private _listenToTableColumns(): void {
        this._tableSubscriptions.add(
            this._table.tableColumnsStream.subscribe((columns: TableColumn[]) => {
                this._table?.showSortSettingsInToolbar(columns.some(({ sortable }) => sortable));
                this._table?.showFilterSettingsInToolbar(columns.some(({ filterable }) => filterable));
                this._table?.showGroupSettingsInToolbar(columns.some(({ groupable }) => groupable));
                this._table?.showColumnSettingsInToolbar(columns.some(() => columns.length > 0));
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
    private _applySorting(collectionSort: CollectionSort[]): void {
        this._table?.sort(collectionSort);
    }

    /** @hidden */
    private _applyFiltering(filters: CollectionFilter[]): void {
        this._table?.filter(filters);
    }

    /** @hidden */
    private _applyGrouping(collectionGroup: CollectionGroup[]): void {
        this._table?.group(collectionGroup);
    }

    /** @hidden */
    private _applyColumns(columns: string[]): void {
        this._table?.setColumns(columns);
    }

    /** @hidden */
    private _unsubscribeFromTable(): void {
        this._tableSubscriptions.unsubscribe();
        this._tableSubscriptions = new Subscription();
    }
}
