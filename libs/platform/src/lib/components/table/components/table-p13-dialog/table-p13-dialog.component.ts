import { ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core';

import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from '../../interfaces';
import { Table } from '../../table';
import { TableColumn } from '../table-column/table-column';

import { TableP13SortComponent } from './table-p13-sort.component';
import { TableP13GroupComponent } from './table-p13-group.component';
import { TableP13FilterComponent } from './table-p13-filter.component';
import { TableP13ColumnsComponent } from './table-p13-columns.component';

import { SortDialogData, SortDialogResultData, P13SortingDialogComponent } from './sorting/sorting.component';
import { GroupDialogData, GroupDialogResultData, P13GroupingDialogComponent } from './grouping/grouping.component';
import { FilterDialogData, FilterDialogResultData, P13FilteringDialogComponent } from './filtering/filtering.component';
import { ColumnsDialogData, ColumnsDialogResultData, P13ColumnsDialogComponent } from './columns/columns.component';

const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30rem',
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
    styles: [`:host { z-index: 999; }`],
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
            columns: columns.map(({ label, key }) => ({ label: label, key: key })),
            collectionSort: sortBy
        };

        const dialogRef = this._dialogService.open(P13SortingDialogComponent, {
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
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const filterBy = state?.filterBy;
        const dialogData: FilterDialogData = {
            columns: columns.map(({ label, key, dataType }) => ({ label: label, key: key, dataType: dataType })),
            collectionFilter: filterBy
        };

        const dialogRef = this._dialogService.open(P13FilteringDialogComponent, {
            responsivePadding: false,
            verticalPadding: false,
            width: '50rem',
            minHeight: '50%',
            data: dialogData
        } as DialogConfig);

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ collectionFilter }: FilterDialogResultData) => this._applyFiltering(collectionFilter))
        );
    }

    /** Open Grouping Settings Dialog */
    showGroupingSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const visibleColumns = state.columns;
        const groupBy = state.groupBy;
        const dialogData: GroupDialogData = {
            columns: columns
                // We can group by visible columns only
                .filter(({ name }) => visibleColumns.includes(name))
                .filter(({ groupable }) => groupable)
                .map(({ label, key }) => ({ label: label, key: key })),
            collectionGroup: groupBy
        };

        const dialogRef = this._dialogService.open(P13GroupingDialogComponent, {
            ...dialogConfig,
            data: dialogData
        });

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ collectionGroup }: GroupDialogResultData) => {
                    this._applyGrouping(collectionGroup);
                })
        );
    }

    /** Open Columns Settings Dialog */
    showColumnsSettings(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();
        const visibleColumns = state.columns;
        const dialogData: ColumnsDialogData = {
            availableColumns: columns.map(({ label, name }) => ({ label: label, key: name })),
            visibleColumns: visibleColumns
        };

        const dialogRef = this._dialogService.open(P13ColumnsDialogComponent, {
            ...dialogConfig,
            minWidth: '35rem',
            responsivePadding: false,
            verticalPadding: false,
            data: dialogData
        });

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ visibleColumns: result }: ColumnsDialogResultData) => {
                    this._applyColumns(result);
                })
        );
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

                this._table?.showGroupSettingsInToolbar(columns.some(({ groupable }) => groupable));

                this._table?.showColumnSettingsInToolbar(columns.length > 0);

                this._table?.showFilterSettingsInToolbar(columns.some(({ filterable }) => filterable));

                this._table?.setHeaderColumnFilteringDisabled(columns.some(({ filterable }) => filterable));
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
