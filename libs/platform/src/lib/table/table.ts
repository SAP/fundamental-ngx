import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { TableState } from './interfaces/table-state.interface';
import { CollectionSort } from './interfaces/collection-sort.interface';
import { CollectionFilter } from './interfaces/collection-filter.interface';
import { CollectionGroup } from './interfaces/collection-group.interface';
import { SearchInput } from './interfaces/search-field.interface';
import { TableColumn } from './components/table-column/table-column';

export abstract class Table {
    /** Sum of widths of fixed columns (semantic highlighting, selection) */
    abstract get _fixedColumnsPadding(): number;

    /** Freezable column names and their respective indexes */
    abstract get _freezableColumns(): ReadonlyMap<string, number>;

    /** Width of the table element in px */
    abstract get _tableWidthPx(): number;

    /** Table columns definition list */
    abstract readonly tableColumnsStream: Observable<TableColumn[]>;

    /** Toolbar Sort Settings button click event */
    readonly openTableSortSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Filter Settings button click event */
    readonly openTableFilterSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Group Settings button click event */
    readonly openTableGroupSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Toolbar Column Settings button click event */
    readonly openTableColumnSettings: EventEmitter<void> = new EventEmitter<void>();

    /** Get table state */
    abstract getTableState(): TableState;

    /** Set table state */
    abstract setTableState(tableState: TableState): void;

    /** Get table columns definition list */
    abstract getTableColumns(): TableColumn[];

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
}
