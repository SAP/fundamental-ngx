import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SearchInput } from '../search-field/search-field.component';
import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from './interfaces';
import { SortDirection } from './enums';
import { DEFAULT_TABLE_STATE } from './constants';
import { FilterChange, FreezeChange, GroupChange, SortChange } from './models';

@Injectable()
export class TableService {
    readonly tableState$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);

    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this.tableState$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this.tableState$.next(state);
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
        const prevFilterBy: any = (prevState && prevState.filterBy) || [];

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

    search(input: SearchInput): void {
        const prevState = this.getTableState();
        this.setTableState({ ...prevState, searchInput: input });
    }
}
