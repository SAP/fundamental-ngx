import { EventEmitter, Injector } from '@angular/core';
import { PresetManagedComponent } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';

import { SaveRowsEvent } from './interfaces/save-rows-event.interface';
import { TableState } from './interfaces/table-state.interface';
import { CollectionSort } from './interfaces/collection-sort.interface';
import { CollectionFilter } from './interfaces/collection-filter.interface';
import { CollectionGroup } from './interfaces/collection-group.interface';
import { SearchInput } from './interfaces/search-field.interface';
import { TableColumn } from './components/table-column/table-column';
import { TableDataSource } from './domain';
import { PlatformTableManagedPreset } from './models';

export abstract class Table<T = any> implements PresetManagedComponent<PlatformTableManagedPreset> {
    abstract readonly name: string;

    abstract initialSortBy?: CollectionSort[];

    abstract initialGroupBy: CollectionGroup[];

    abstract initialFilterBy: CollectionFilter[];

    /** Event emitted when current preset configuration has been changed. */
    abstract presetChanged: EventEmitter<PlatformTableManagedPreset>;

    /** Sum of widths of fixed columns (semantic highlighting, selection) */
    abstract get _fixedColumnsPadding(): number;

    /** Freezable column names and their respective indexes */
    abstract get _freezableColumns(): ReadonlyMap<string, number>;

    /** Width of the table element in px */
    abstract get _tableWidthPx(): number;

    /** Table columns definition list */
    abstract readonly tableColumnsStream: Observable<TableColumn[]>;

    abstract readonly injector: Injector;

    /** Toolbar Sort Settings button click event */
    readonly openTableSortSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Filter Settings button click event */
    readonly openTableFilterSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Group Settings button click event */
    readonly openTableGroupSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Column Settings button click event */
    readonly openTableColumnSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Event fired when empty row added. */
    readonly emptyRowAdded: EventEmitter<void>;

    /** Event fired when save button pressed. */
    readonly save: EventEmitter<SaveRowsEvent<T>>;

    /** Event fired when cancel button pressed. */
    readonly cancel: EventEmitter<void>;

    /** Get table state */
    abstract getTableState(): TableState;

    /** Set table state */
    abstract setTableState(tableState: TableState): void;

    /** Get table columns definition list */
    abstract getTableColumns(): TableColumn[];

    /** Get a list of visible table columns. */
    abstract getVisibleTableColumns(): TableColumn[];

    /** Set Sorting rules */
    abstract sort(sortRules: CollectionSort[]): void;

    /** Add Sorting rules to the existing ones */
    abstract addSort(sortRules: CollectionSort[]): void;

    /** Set Filtering rules */
    abstract filter(filterRules: CollectionFilter[]): void;

    /** Add Filter rules to the existing ones */
    abstract addFilter(filterRules: CollectionFilter[]): void;

    /** Set grouping rules */
    abstract group(groupRules: CollectionGroup[]): void;

    /** Add Group rules to the existing ones */
    abstract addGroup(groupRules: CollectionGroup[]): void;

    /** Set table columns */
    abstract setColumns(columns: string[]): void;

    /** Toggle row checked state. */
    abstract toggleSelectableRow(rowIndex: number): void;

    /** Freeze table columns to including */
    abstract freezeToColumn(columnKey: string): void;

    /** Unfreeze column */
    abstract unfreeze(columnKey: string): void;

    /** Search in all table columns */
    abstract search(searchInput: SearchInput): void;

    /** Toolbar Sort Settings button visibility */
    abstract showSortSettingsInToolbar(showSortSettings: boolean): void;

    /** Toolbar Filter Settings button visibility */
    abstract showFilterSettingsInToolbar(showFilterSettings: boolean): void;

    /** Toolbar Group Settings button visibility */
    abstract showGroupSettingsInToolbar(showGroupSettings: boolean): void;

    /** Toolbar Columns Settings button visibility */
    abstract showColumnSettingsInToolbar(showColumnSettings: boolean): void;

    /** Disable filtering by header column menu */
    abstract setHeaderColumnFilteringDisabled(disabled: boolean): void;

    /** Set current page */
    abstract setCurrentPage(currentPage: number): void;

    /** Gets the max allowed width for all freezable columns */
    abstract getMaxAllowedFreezableColumnsWidth(): number;

    /** Get table data source */
    abstract getDataSource(): TableDataSource<any>;

    /** Manually triggers columns width recalculation */
    abstract recalculateTableColumnWidth(): void;

    /** Fetch data source data. */
    abstract fetch(): void;

    /** Adds empty row for editing at the beginning of the rows array. */
    abstract addRow(): void;

    /** Emits save event and resets editable rows array. */
    abstract saveRows(): void;

    /** Cancels editing and discards newly added rows */
    abstract cancelEditing(): void;

    /** Expand all the rows of the table */
    abstract expandAll(): void;

    /** Collapse all the rows of the table */
    abstract collapseAll(): void;

    /** Sets selected preset. */
    abstract setPreset(data: PlatformTableManagedPreset): void;

    /** Returns current preset. */
    abstract getCurrentPreset(): PlatformTableManagedPreset;
}
