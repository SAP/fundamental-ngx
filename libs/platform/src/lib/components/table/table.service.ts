import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip } from 'rxjs/operators';

import { SearchInput } from './interfaces/search-field.interface';
import { CollectionFilter, CollectionGroup, CollectionPage, CollectionSort, TableState } from './interfaces';
import { DEFAULT_TABLE_STATE } from './constants';
import { ColumnsChange, FilterChange, FreezeChange, GroupChange, PageChange, SearchChange, SortChange } from './models';

@Injectable()
export class TableService {
    private _tableStateSubject$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);
    private _markForCheck$: Subject<void> = new Subject<void>();
    private _tableColumnsWidth$ = new Subject<void>();

    readonly tableColumnsWidth$ = this._tableColumnsWidth$.asObservable();
    readonly tableState$ = this._tableStateSubject$.asObservable();
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));

    readonly searchChange: EventEmitter<SearchChange> = new EventEmitter<SearchChange>();
    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();
    readonly columnsChange: EventEmitter<ColumnsChange> = new EventEmitter<ColumnsChange>();
    readonly pageChange: EventEmitter<PageChange> = new EventEmitter<PageChange>();

    /** Listen for changes in table subcomponents (mostly table column) */
    get markForCheck$(): Subject<void> {
        return this._markForCheck$;
    }

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableStateSubject$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableStateSubject$.next(state);
    }

    /** Notify about changes in table subcomponents (mostly table column) */
    markForCheck(): void {
        this._markForCheck$.next();
    }

    /** Search */
    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        const state: TableState = { ...prevState, searchInput: searchInput };

        this.setTableState(setCurrentPageToState(state, 1));

        this.searchChange.emit({ current: searchInput, previous: prevState.searchInput });
    }

    /** Set new sort rules */
    setSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [...sortRules];
        const state: TableState = { ...prevState, sortBy: newSortRules };

        this.setTableState(setCurrentPageToState(state, 1));

        this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
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

        this.setTableState(setCurrentPageToState(state, 1));

        this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
    }

    /** Set new sort rules */
    setFilters(filterRules: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [...filterRules];
        const state: TableState = { ...prevState, filterBy: newFilterRules };

        this.setTableState(setCurrentPageToState(state, 1));

        this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
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

        this.setTableState(setCurrentPageToState(state, 1));

        this.filterChange.emit({ current: state.filterBy, previous: prevFilterRules });
    }

    /** Set group rules */
    setGroups(groups: CollectionGroup[]): void {
        const prevState = this.getTableState();
        const prevGroups = (prevState && prevState.groupBy) || [];

        const newGroups: CollectionGroup[] = [...groups];
        const state: TableState = { ...prevState, groupBy: newGroups };

        this.setTableState(state);

        this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
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

        this.setTableState(state);

        this.groupChange.emit({ current: state.groupBy, previous: prevGroups });
    }

    /** Freeze table to column */
    freezeTo(columnName: string): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, freezeToColumn: columnName });

        this.freezeChange.emit({ current: columnName, previous: prevState.freezeToColumn });
    }

    /** Set table columns */
    setColumns(columns: string[]): void {
        const prevState = this.getTableState();
        const prevColumns = (prevState && prevState.columns) || [];

        const newColumns = [...columns];
        const state: TableState = { ...prevState, columns: newColumns };

        this.setTableState(state);

        this.columnsChange.emit({ current: state.columns, previous: prevColumns });
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

    /** Trigger columns width recalculation */
    recalculateColumnsWidth(): void {
        this._tableColumnsWidth$.next();
    }
}

function setCurrentPageToState(state: TableState, currentPage: number): TableState {
    const newPageState: CollectionPage = { ...state.page, currentPage: currentPage };
    return { ...state, page: newPageState  };
}
