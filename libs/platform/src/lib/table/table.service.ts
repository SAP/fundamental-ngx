import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';
import equal from 'fast-deep-equal';

import { SearchInput } from './interfaces/search-field.interface';
import { CollectionFilter, CollectionGroup, CollectionPage, CollectionSort, TableState } from './interfaces';
import { DEFAULT_TABLE_STATE } from './constants';
import { ColumnsChange, FilterChange, FreezeChange, GroupChange, PageChange, SearchChange, SortChange } from './models';

@Injectable()
export class TableService {
    /** @hidden */
    private _tableStateSubject$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);
    /** @hidden */
    private _tableLoadingSubject$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private _markForCheck$: Subject<void> = new Subject<void>();
    /** @hidden */
    private _detectChanges$: Subject<void> = new Subject<void>();

    /** @hidden */
    readonly tableState$ = this._tableStateSubject$.asObservable();
    /** @hidden */
    readonly tableLoading$ = this._tableLoadingSubject$.asObservable();
    /** @hidden */
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));

    /** @hidden */
    readonly searchChange: EventEmitter<SearchChange> = new EventEmitter<SearchChange>();
    /** @hidden */
    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    /** @hidden */
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    /** @hidden */
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    /** @hidden */
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();
    /** @hidden */
    readonly columnsChange: EventEmitter<ColumnsChange> = new EventEmitter<ColumnsChange>();
    /** @hidden */
    readonly pageChange: EventEmitter<PageChange> = new EventEmitter<PageChange>();

    /** Listen for soft changes in table subcomponents (mostly table column) */
    get markForCheck$(): Subject<void> {
        return this._markForCheck$;
    }

    /** Listen for immediate changes in table subcomponents (mostly table column) */
    get detectChanges$(): Subject<void> {
        return this._detectChanges$;
    }

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableStateSubject$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableStateSubject$.next(state);
    }

    /** Set current loading state of the Table. */
    setTableLoading(isLoading: boolean): void {
        this._tableLoadingSubject$.next(isLoading);
    }

    /** Notify about changes in table subcomponents (mostly table column) and detect them on next detector check. */
    markForCheck(): void {
        this._markForCheck$.next();
    }

    /** Notify about changes in table subcomponents (mostly table column) and detect them immediately. */
    detectChanges(): void {
        this._detectChanges$.next();
    }

    /** Search */
    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        const state: TableState = { ...prevState, searchInput };

        this.setTableState(setCurrentPageToState(state, 1));

        this.searchChange.emit({ current: searchInput, previous: prevState.searchInput });
    }

    /** Set new sort rules */
    setSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [...sortRules];
        const state: TableState = { ...prevState, sortBy: newSortRules };

        if (!equal(prevSortRules, state.sortBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
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

            this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
        }
    }

    /** Set new sort rules */
    setFilters(filterRules: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [...filterRules];
        const state: TableState = { ...prevState, filterBy: newFilterRules };

        if (!equal(prevFilterRules, state.filterBy)) {
            this.setTableState(setCurrentPageToState(state, 1));

            this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
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

            this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
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

        this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
    }

    /** Set group rules */
    setGroups(groups: CollectionGroup[]): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = [...groups];
        const state: TableState = { ...prevState, groupBy: newGroups };

        if (!equal(prevGroups, state.groupBy)) {
            this.setTableState(state);

            this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
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

            this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
        }
    }

    /** Freeze table to column */
    freezeTo(columnName: string): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, freezeToColumn: columnName });

        this.freezeChange.emit({ current: columnName, previous: prevState.freezeToColumn });
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

            this.columnsChange.emit({ current: state.columns, previous: prevColumns });
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

        this.pageChange.emit({ current: state.page, previous: prevPageState });
    }
}

function setCurrentPageToState(state: TableState, currentPage: number): TableState {
    const newPageState: CollectionPage = { ...state.page, currentPage };
    return { ...state, page: newPageState };
}
