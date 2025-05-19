import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    forwardRef,
    inject,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { filter, startWith } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogConfig, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import {
    CollectionFilter,
    SortDirection,
    Table,
    TableColumn,
    TableDialogCommonData,
    TableState
} from '@fundamental-ngx/platform/table-helpers';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';
import { TableViewSettingsFilterComponent } from './table-view-settings-filter.component';
import { FiltersDialogData, SettingsGroupDialogData, SettingsSortDialogData } from './table-view-settings.model';

export const dialogConfig: DialogConfig = {
    responsivePadding: false,
    verticalPadding: false,
    width: '340px'
};

export interface CombinedTableDialogData {
    sortingData: SettingsSortDialogData | null;
    filteringData: FiltersDialogData | null;
    groupingData: SettingsGroupDialogData | null;
}

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
export class TableViewSettingsDialogComponent implements AfterViewInit {
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

    /** Heading level of the dialog. */
    @Input()
    headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

    /** @hidden */
    @ContentChildren(forwardRef(() => TableViewSettingsFilterComponent))
    filters: QueryList<TableViewSettingsFilterComponent>;

    /** @hidden */
    _table: Table;

    /** @hidden */
    _dialogRef: DialogRef<TableDialogCommonData | CombinedTableDialogData, any>;

    private readonly destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(private readonly _dialogService: DialogService) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToFilters();
    }

    /** Open Sort Settings Dialog */
    showViewSettingsDialog(): void {
        const state = this._getTableState();
        const columns = this._getTableColumns();

        const sortData: SettingsSortDialogData = {
            columns: columns.filter(({ sortable }) => sortable),
            direction: state.sortBy?.[0]?.direction,
            field: state.sortBy?.[0]?.field,
            allowDisablingSorting: this.allowDisablingSorting
        };

        const filterData: FiltersDialogData = {
            columns,
            viewSettingsFilters: this.filters.toArray(),
            filterBy: state?.filterBy
        };

        const groupData: SettingsGroupDialogData = {
            columns: columns.filter(({ groupable }) => groupable),
            direction: state.groupBy?.[0]?.direction,
            field: state.groupBy?.[0]?.field
        };

        if (this._dialogRef) {
            this._dialogRef.dismiss();
        }

        this._dialogRef = this._dialogService.open(
            SettingsDialogComponent,
            {
                ...dialogConfig,
                data: {
                    sortingData: sortData.columns.length > 0 ? sortData : null,
                    filteringData: filterData.viewSettingsFilters.length > 0 ? filterData : null,
                    groupingData: groupData.columns.length > 0 ? groupData : null,
                    headingLevel: this.headingLevel
                }
            },
            this.table.injector
        );

        this._dialogRef.afterClosed
            .pipe(
                filter((result) => !!result),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(({ sortingData, filteringData, groupingData }) => {
                if (sortingData) {
                    this._applySorting(sortingData.field, sortingData.direction);
                }
                if (filteringData) {
                    this._applyFiltering(filteringData.filterBy);
                }
                if (groupingData) {
                    this._applyGrouping(groupingData.field, groupingData.direction);
                }
            });
    }

    /** @hidden */
    private _listenToFilters(): void {
        this.filters.changes.pipe(startWith(null), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (this.filters.toArray().length > 0) {
                this._table?.showSettingsInToolbar(true);
            }
        });
    }

    /** @hidden */
    private _setTable(table: Table): void {
        this._table = table;
        this._subscribeToTable();
    }

    /** @hidden */
    private _subscribeToTable(): void {
        if (!this._table) {
            return;
        }

        this._table.openTableSortSettings
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.showViewSettingsDialog());

        this._table.openTableFilterSettings
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.showViewSettingsDialog());

        this._table.openTableGroupSettings
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.showViewSettingsDialog());

        this._table.tableColumnsStream.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((columns: TableColumn[]) => {
            const show = columns.some(({ sortable }) => sortable) || columns.some(({ groupable }) => groupable);
            this._table?.showSettingsInToolbar(show);
        });
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
}
