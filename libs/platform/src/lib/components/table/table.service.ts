import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { SearchInput } from './interfaces/search-field.interface';
import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from './interfaces';
import { DEFAULT_TABLE_STATE } from './constants';
import { FilterChange, FreezeChange, GroupChange, SortChange, SearchChange, ColumnsChange } from './models';

@Injectable()
export class TableService {
    private _tableStateSubject$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);

    readonly tableState$: Observable<TableState> = this._tableStateSubject$.asObservable();
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));

    readonly searchChange: EventEmitter<SearchChange> = new EventEmitter<SearchChange>();
    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();
    readonly columnsChange: EventEmitter<ColumnsChange> = new EventEmitter<ColumnsChange>();

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableStateSubject$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableStateSubject$.next(state);
    }

    /** Set new sort rules */
    setSort(sortRules: CollectionSort[]): void {
        const prevState = this.getTableState();
        const prevSortRules = (prevState && prevState.sortBy) || [];

        const newSortRules: CollectionSort[] = [...sortRules];
        const state: TableState = { ...prevState, sortBy: newSortRules };

        this.setTableState(state);

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

        this.setTableState(state);

        this.sortChange.emit({ current: state.sortBy, previous: prevSortRules });
    }

    /** Set new sort rules */
    setFilters(filterRules: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterRules = (prevState && prevState.filterBy) || [];

        const newFilterRules: CollectionFilter[] = [...filterRules];
        const state: TableState = { ...prevState, filterBy: newFilterRules };

        this.setTableState(state);

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

        this.setTableState(state);

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

    /** Search */
    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, searchInput: searchInput });

        this.searchChange.emit({ current: searchInput, previous: prevState.searchInput });
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
}
