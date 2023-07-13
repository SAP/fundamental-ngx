import { Injectable } from '@angular/core';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import equal from 'fast-deep-equal';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { DEFAULT_TABLE_STATE } from '../constants';

import { CollectionFilter, CollectionGroup, CollectionPage, CollectionSort, TableState } from '../interfaces';
import {
    ColumnsChange,
    FilterChange,
    FreezeChange,
    GroupChange,
    PageChange,
    SearchChange,
    SortChange
} from '../models';
import { TableColumn } from '../table-column';

export type TableStateChange =
    | TableStateProperty<'sort', SortChange>
    | TableStateProperty<'page', PageChange>
    | TableStateProperty<'filter', FilterChange>
    | TableStateProperty<'group', GroupChange>
    | TableStateProperty<'freeze', FreezeChange>
    | TableStateProperty<'columns', ColumnsChange>
    | TableStateProperty<'search', SearchChange>;

export type TableStateProperty<
    T = 'sort' | 'page' | 'filter' | 'group' | 'freeze' | 'columns' | 'search',
    P = SortChange | PageChange | FilterChange | GroupChange | FreezeChange | ColumnsChange
> = {
    type: T;
    state: P;
};

@Injectable()
export class TableService {
    /** Table state stream. */
    readonly tableState$ = new BehaviorSubject(DEFAULT_TABLE_STATE);
    /** @hidden */
    readonly _semanticHighlighting$ = new BehaviorSubject<string>('');
    /** @hidden */
    readonly _isFilteringFromHeaderDisabled$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    readonly _isShownNavigationColumn$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    readonly _semanticHighlightingColumnWidth$ = new BehaviorSubject(0);
    /** Visible columns stream. */
    readonly visibleColumns$ = new BehaviorSubject<TableColumn[]>([]);
    /** Visible columns length. */
    visibleColumnsLength = 0;
    /** Popping columns stream. */
    readonly poppingColumns$ = new BehaviorSubject<TableColumn[]>([]);
    /** Popping columns length. */
    _poppingColumnsLength = 0;
    /** Table columns stream. */
    readonly tableColumns$ = new BehaviorSubject<TableColumn[]>([]);
    /** @hidden */
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));
    /** Stream that emits when search state changes. */
    readonly searchChange$ = new Subject<SearchChange>();
    /** Stream that emits when sort state changes. */
    readonly sortChange$ = new Subject<SortChange>();
    /** Stream that emits when filter state changes. */
    readonly filterChange$ = new Subject<FilterChange>();
    /** Stream that emits when group state changes. */
    readonly groupChange$ = new Subject<GroupChange>();
    /** Stream that emits when freeze state changes. */
    readonly freezeChange$ = new Subject<FreezeChange>();
    /** Stream that emits when columns state changes. */
    readonly columnsChange$ = new Subject<ColumnsChange>();
    /** Stream that emits when page state changes. */
    readonly pageChange$ = new Subject<PageChange>();
    /** Stream that emits when new fetch of data is needed. */
    readonly needFetch$ = new Subject<void>();
    /** @hidden */
    readonly stateChange$ = new Subject<TableStateChange>();
    /** Stream that emits when loading state changes. */
    readonly tableLoading$ = new BehaviorSubject<boolean>(false);
    /** Listen for soft changes in table subcomponents (mostly table column) */
    readonly markForCheck$ = new Subject<void>();
    /** Listen for immediate changes in table subcomponents (mostly table column) */
    readonly detectChanges$ = new Subject<void>();
    /** Sort rules stream. */
    readonly sortRules$ = new BehaviorSubject<Map<string, CollectionSort>>(new Map());
    /**
     * Filter Rules Map stream. Where key is column key, and value is the associated filter rules.
     * Many filters can be applied to one column.
     */
    readonly filterRules$ = new BehaviorSubject<Map<string, CollectionFilter[]>>(new Map());

    /**
     * Group Rules Map stream. Where key is column key and value is associated group rule
     */
    readonly groupRules$ = new BehaviorSubject<Map<string, CollectionGroup>>(new Map());

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this.tableState$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this.tableState$.next(state);
    }

    /** Set current loading state of the Table. */
    setTableLoading(isLoading: boolean): void {
        this.tableLoading$.next(isLoading);
    }

    /** Notify about changes in table subcomponents (mostly table column) and detect them on next detector check. */
    markForCheck(): void {
        this.markForCheck$.next();
    }

    /** Notify about changes in table subcomponents (mostly table column) and detect them immediately. */
    detectChanges(): void {
        this.detectChanges$.next();
    }

    /** Search */
    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        const state: TableState = { ...prevState, searchInput };

        this.setTableState(setCurrentPageToState(state, 1));

        const evt = { current: searchInput, previous: prevState.searchInput };

        this.needFetch$.next();
        this.stateChange$.next({ type: 'search', state: evt });
        this.searchChange$.next(evt);
    }

    /** Set new sort rules */
    setSort(sortRules: CollectionSort[] | undefined): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = sortRules ? [...sortRules] : [];

        const state: TableState = { ...prevState, sortBy: newSortRules };

        if (!equal(prevSortRules, state.sortBy)) {
            this.setTableState(setCurrentPageToState(state, 1));
            this.buildSortRulesMap();
            const evt = { current: state.sortBy, previous: prevSortRules };

            this.needFetch$.next();
            this.stateChange$.next({ type: 'sort', state: evt });
            this.sortChange$.next(evt);
        }
    }

    /** Add sort rules to the existing ones */
    addSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [
            ...prevSortRules.filter((existing) => !sortRules.find(({ field }) => field === existing.field)),
            ...sortRules
        ];

        const state: TableState = { ...prevState, sortBy: newSortRules };

        if (!equal(prevSortRules, state.sortBy)) {
            this.setTableState(setCurrentPageToState(state, 1));
            const evt = { current: state.sortBy, previous: prevSortRules };
            this.buildSortRulesMap();

            this.needFetch$.next();
            this.stateChange$.next({ type: 'sort', state: evt });
            this.sortChange$.next(evt);
        }
    }

    /** Set new sort rules */
    setFilters(filterRules: CollectionFilter[] | undefined): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = filterRules ? [...filterRules] : [];
        const state: TableState = { ...prevState, filterBy: newFilterRules };

        if (!equal(prevFilterRules, state.filterBy)) {
            this.setTableState(setCurrentPageToState(state, 1));
            const evt = { current: state.filterBy, previous: prevFilterRules };

            this.buildFilterRulesMap();
            this.needFetch$.next();
            this.stateChange$.next({ type: 'filter', state: evt });
            this.filterChange$.next(evt);
        }
    }

    /** Add filter rules to the existing ones */
    addFilters(rulesToAdd: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [
            ...prevFilterRules.filter((existing) => !rulesToAdd.find(({ field }) => field === existing.field)),
            ...rulesToAdd
        ];

        const state: TableState = { ...prevState, filterBy: newFilterRules };

        if (!equal(prevFilterRules, state.filterBy)) {
            this.setTableState(setCurrentPageToState(state, 1));
            const evt = { current: state.filterBy, previous: prevFilterRules };
            this.buildFilterRulesMap();

            this.needFetch$.next();
            this.stateChange$.next({ type: 'filter', state: evt });
            this.filterChange$.next(evt);
        }
    }

    /** Removes filters for the provided fields */
    removeFilters(fields: string[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = prevFilterRules.filter(
            (existing) => !fields.includes(existing.field)
        );

        const state: TableState = { ...prevState, filterBy: newFilterRules };

        this.setTableState(setCurrentPageToState(state, 1));
        const evt = { current: state.filterBy, previous: prevFilterRules };
        this.buildFilterRulesMap();

        this.needFetch$.next();
        this.stateChange$.next({ type: 'filter', state: evt });
        this.filterChange$.next(evt);
    }

    /** Set group rules */
    setGroups(groups: CollectionGroup[] | undefined): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = groups ? [...groups] : [];
        const state: TableState = { ...prevState, groupBy: newGroups };

        if (!equal(prevGroups, state.groupBy)) {
            this.setTableState(state);
            const evt = { current: state.groupBy, previous: prevGroups };
            this.buildGroupRulesMap();

            this.stateChange$.next({ type: 'group', state: evt });
            this.groupChange$.next(evt);
        }
    }

    /** Add group rules to the existing ones */
    addGroups(groupsToAdd: CollectionGroup[]): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = [
            ...prevGroups.filter((existing) => !groupsToAdd.find(({ field }) => field === existing.field)),
            ...groupsToAdd
        ];

        const state: TableState = { ...prevState, groupBy: newGroups };

        if (!equal(prevGroups, state.groupBy)) {
            this.setTableState(state);
            this.buildGroupRulesMap();

            const evt = { current: state.groupBy, previous: prevGroups };
            this.stateChange$.next({ type: 'group', state: evt });
            this.groupChange$.next(evt);
        }
    }

    /** Freeze table to column */
    freezeTo(columnName: string | null, end?: boolean): void {
        const prevState = this.getTableState();

        if (!end) {
            this.setTableState({ ...prevState, freezeToColumn: columnName });
        } else {
            this.setTableState({ ...prevState, freezeToEndColumn: columnName });
        }

        const evt = {
            current: columnName,
            previous: end ? prevState.freezeToEndColumn : prevState.freezeToColumn
        };

        this.stateChange$.next({ type: 'freeze', state: evt });
        this.freezeChange$.next(evt);
    }

    /** Set table columns */
    setColumns(columns: string[], keys: string[]): void {
        const prevState = this.getTableState();
        const prevColumns = (prevState && prevState.columns) || [];

        const newColumns = [...columns];
        const newColumnKeys = [...keys];
        const state: TableState = { ...prevState, columns: newColumns, columnKeys: newColumnKeys };

        if (!equal(prevColumns, state.columns)) {
            this.setTableState(state);

            const evt = { current: state.columns, previous: prevColumns };
            this.stateChange$.next({ type: 'columns', state: evt });
            this.columnsChange$.next(evt);
        }
    }

    /** Set page */
    setCurrentPage(currentPage: number): void {
        const prevState = this.getTableState();
        const prevPageState = prevState.page;

        if (prevPageState.currentPage === currentPage) {
            return;
        }

        const state: TableState = setCurrentPageToState(prevState, currentPage);

        this.setTableState(state);
        const evt = { current: state.page, previous: prevPageState };

        this.needFetch$.next();
        this.stateChange$.next({ type: 'page', state: evt });
        this.pageChange$.next(evt);
    }

    /** Returns default table state. */
    getDefaultState(): TableState {
        const tableState = this.getTableState();
        return {
            columnKeys: tableState.columnKeys,
            sortBy: [],
            filterBy: [],
            groupBy: [],
            columns: tableState.columns,
            searchInput: {
                category: null,
                text: ''
            },
            freezeToColumn: null,
            freezeToEndColumn: null,
            page: {
                pageSize: 0,
                currentPage: 1
            }
        };
    }

    /**
     * Shares visible columns array across listeners.
     * @param columns Visible columns to share.
     */
    setVisibleColumns(columns: TableColumn[]): void {
        this.visibleColumns$.next(columns);
        this.visibleColumnsLength = columns.length;
    }

    /**
     * Shares popping columns array across listeners.
     * @param columns Popping columns to share.
     */
    setPoppingColumns(columns: TableColumn[]): void {
        this.poppingColumns$.next(columns);
        this._poppingColumnsLength = columns.length;
    }

    /**
     * Constructs grouping rules based on the table state.
     * @param state Table state.
     */
    buildGroupRulesMap(state = this.getTableState()): void {
        const groupMap = new Map(state.groupBy.map((rule) => [rule.field, rule]));
        this.groupRules$.next(groupMap);
    }

    /**
     * Constructs sorting rules based on the table state.
     * @param state Table state
     */
    buildSortRulesMap(state = this.getTableState()): void {
        this.sortRules$.next(new Map(state.sortBy.filter((rule) => rule.field).map((rule) => [rule.field!, rule])));
    }

    /**
     * Constructs filter rules based on the table state.
     * @param state Table state.
     */
    buildFilterRulesMap(state = this.getTableState()): void {
        this.filterRules$.next(
            state.filterBy.reduce((hash, rule) => {
                const key = rule.field;
                if (!hash.has(key)) {
                    hash.set(key, []);
                }
                hash.get(key)?.push(rule);
                return hash;
            }, new Map<string, CollectionFilter[]>())
        );
    }

    /**
     * Constructs base table config.
     */
    constructTableMetadata(): void {
        this.buildGroupRulesMap();
        this.buildSortRulesMap();
        this.buildFilterRulesMap();
    }
}

function setCurrentPageToState(state: TableState, currentPage: number): TableState {
    const newPageState: CollectionPage = { ...state.page, currentPage };
    return { ...state, page: newPageState };
}
