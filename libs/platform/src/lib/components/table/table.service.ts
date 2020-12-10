import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from './interfaces';
import { SearchInput } from './interfaces/search-field.interface';
import { SortDirection } from './enums';
import { DEFAULT_TABLE_STATE } from './constants';
import { FilterChange, FreezeChange, GroupChange, SortChange, SearchChange } from './models';


@Injectable()
export class TableService {
    private _tableStateSubject$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);

    readonly tableState$: Observable<TableState> = this._tableStateSubject$.asObservable();
    readonly tableStateChanges$ = this.tableState$.pipe(skip(1));

    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();
    readonly searchChange: EventEmitter<SearchChange> = new EventEmitter<SearchChange>();

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableStateSubject$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableStateSubject$.next(state);
    }

    sort(field: string, direction: SortDirection): void {
        const prevState = this.getTableState();
        const prevSortBy = (prevState && prevState.sortBy) || [];

        if (prevSortBy.length && prevSortBy[0].field === field && prevSortBy[0].direction === direction) {
            return;
        }

        const newSortBy: CollectionSort[] = [{ field: field, direction: direction }];
        const state: TableState = { ...prevState, sortBy: newSortBy };

        this.setTableState(state);

        this.sortChange.emit({ current: state.sortBy, previous: prevSortBy });
    }

    filter(filters: CollectionFilter[]): void {
        const prevState = this.getTableState();
        const prevFilterBy = (prevState && prevState.filterBy) || [];

        const newFilterBy: CollectionFilter[] = [...filters];
        const state: TableState = { ...prevState, filterBy: newFilterBy };

        this.setTableState(state);

        this.filterChange.emit({ current: state.filterBy, previous: prevFilterBy });
    }

    group(field: string, direction: SortDirection): void {
        const prevState = this.getTableState();
        const prevGroupBy = (prevState && prevState.groupBy) || [];

        if (prevGroupBy.length && prevGroupBy[0].field === field && prevGroupBy[0].direction === direction) {
            return;
        }

        const newGroupBy: CollectionGroup[] = [{ field: field, direction: direction }];
        const state: TableState = { ...prevState, groupBy: newGroupBy };

        this.setTableState(state);

        this.groupChange.emit({ current: state.groupBy, previous: prevGroupBy });
    }

    freezeTo(columnName: string): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, freezeToColumn: columnName });

        this.freezeChange.emit({ current: columnName, previous: prevState.freezeToColumn });
    }

    search(searchInput: SearchInput): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, searchInput: searchInput });

        this.searchChange.emit({ current: searchInput, previous: prevState.searchInput });
    }
}
