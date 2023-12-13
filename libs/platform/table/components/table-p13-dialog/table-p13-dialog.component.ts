import { ChangeDetectionStrategy, Component, ContentChild, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DialogConfig, DialogService } from '@fundamental-ngx/core/dialog';

import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    Table,
    TableColumn,
    TableState
} from '@fundamental-ngx/platform/table-helpers';

import { TableP13ColumnsComponent } from './table-p13-columns.component';
import { TableP13FilterComponent } from './table-p13-filter.component';
import { TableP13GroupComponent } from './table-p13-group.component';
import { TableP13SortComponent } from './table-p13-sort.component';

import { ColumnsDialogData, ColumnsDialogResultData, P13ColumnsDialogComponent } from './columns/columns.component';
import { FilterDialogData, FilterDialogResultData, P13FilteringDialogComponent } from './filtering/filtering.component';
import { GroupDialogData, GroupDialogResultData, P13GroupingDialogComponent } from './grouping/grouping.component';
import { P13SortingDialogComponent, SortDialogData, SortDialogResultData } from './sorting/sorting.component';

const dialogConfig: DialogConfig = {
    responsivePadding: true,
    verticalPadding: true,
    minWidth: '30rem',
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
 * <fdp-table-p13-dialog [table]="myTable">
 *   <!-- Sort Panel -->
 *   <fdp-table-p13-sort></fdp-table-p13-sort>
 *
 *   <!-- Filter Panel -->
 *   <fdp-table-p13-filter></fdp-table-p13-filter>
 *
 *   <!-- Group Panel -->
 *   <fdp-table-p13-group></fdp-table-p13-group>
 *
 *   <!-- Columns Panel -->
 *   <fdp-table-p13-columns></fdp-table-p13-columns>
 * </fdp-table-p13-dialog>
 * ```
 * */
@Component({
    selector: 'fdp-table-p13-dialog',
    template: '',
    styles: [
        `
            :host {
                z-index: 999;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
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

    /** @ignore */
    @ContentChild(TableP13SortComponent)
    sort: TableP13SortComponent;

    /** @ignore */
    @ContentChild(TableP13FilterComponent)
    filter: TableP13FilterComponent;

    /** @ignore */
    @ContentChild(TableP13GroupComponent)
    group: TableP13GroupComponent;

    /** @ignore */
    @ContentChild(TableP13ColumnsComponent)
    columns: TableP13ColumnsComponent;

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    private _tableSubscriptions = new Subscription();

    /** @ignore */
    _table: Table;

    /** @ignore */
    constructor(private readonly _dialogService: DialogService) {}

    /** @ignore */
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
            columns: columns.map(({ label, key }) => ({ label, key })),
            collectionSort: sortBy
        };

        const dialogRef = this._dialogService.open(
            P13SortingDialogComponent,
            {
                ...dialogConfig,
                data: dialogData
            },
            this.table.injector
        );

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
            columns: columns.map(({ label, key, dataType, filterable }) => ({ label, key, dataType, filterable })),
            collectionFilter: filterBy
        };

        const dialogRef = this._dialogService.open(
            P13FilteringDialogComponent,
            {
                ...dialogConfig,
                disablePaddings: true,
                width: '50rem',
                data: dialogData
            },
            this.table.injector
        );

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
                .map(({ label, key }) => ({ label, key })),
            collectionGroup: groupBy
        };

        const dialogRef = this._dialogService.open(
            P13GroupingDialogComponent,
            {
                ...dialogConfig,
                data: dialogData
            },
            this.table.injector
        );

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
            availableColumns: columns.map(({ label, name }) => ({ label, key: name })),
            visibleColumns
        };

        const dialogRef = this._dialogService.open(
            P13ColumnsDialogComponent,
            {
                ...dialogConfig,
                disablePaddings: true,
                minWidth: '35rem',
                data: dialogData
            },
            this.table.injector
        );

        this._subscriptions.add(
            dialogRef.afterClosed
                .pipe(filter((result) => !!result))
                .subscribe(({ visibleColumns: result }: ColumnsDialogResultData) => {
                    this._applyColumns(result);
                })
        );
    }

    /** @ignore */
    private _setTable(table: Table): void {
        this._table = table;

        this._unsubscribeFromTable();

        if (this._table) {
            this._subscribeToTable();
        }
    }

    /** @ignore */
    private _subscribeToTable(): void {
        this._listenToTableTriggersToOpenDialogs();
        this._listenToTableColumns();
    }

    /** @ignore */
    private _listenToTableTriggersToOpenDialogs(): void {
        this._tableSubscriptions.add(this._table.openTableSortSettings.subscribe(() => this.showSortingSettings()));
        this._tableSubscriptions.add(this._table.openTableFilterSettings.subscribe(() => this.showFilteringSettings()));
        this._tableSubscriptions.add(this._table.openTableGroupSettings.subscribe(() => this.showGroupingSettings()));
        this._tableSubscriptions.add(this._table.openTableColumnSettings.subscribe(() => this.showColumnsSettings()));
    }

    /** @ignore */
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

    /** @ignore */
    private _getTableState(): TableState {
        return this._table?.getTableState();
    }

    /** @ignore */
    private _getTableColumns(): TableColumn[] {
        return this._table?.getTableColumns() || [];
    }

    /** @ignore */
    private _applySorting(collectionSort: CollectionSort[]): void {
        this._table?.sort(collectionSort);
    }

    /** @ignore */
    private _applyFiltering(filters: CollectionFilter[]): void {
        this._table?.filter(filters);
    }

    /** @ignore */
    private _applyGrouping(collectionGroup: CollectionGroup[]): void {
        this._table?.group(collectionGroup);
    }

    /** @ignore */
    private _applyColumns(columns: string[]): void {
        this._table?.setColumns(columns);
    }

    /** @ignore */
    private _unsubscribeFromTable(): void {
        this._tableSubscriptions.unsubscribe();
        this._tableSubscriptions = new Subscription();
    }
}
