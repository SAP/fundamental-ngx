import { EventEmitter, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TableColumnComponent } from './components';
import { CollectionSort, TableState } from './interfaces';
import { SortDirection } from './enums';
import { DEFAULT_TABLE_STATE } from './constants';
import { SortChange } from './models';

export class TableService {
    tableState: TableState;
    prevTableState: TableState;
    tableState$: BehaviorSubject<TableState> = new BehaviorSubject(null);

    columns: QueryList<TableColumnComponent>;

    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();

    constructor() {}

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this.tableState$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this.prevTableState = this.getTableState();
        this.tableState = state;
        this.tableState$.next(state);
    }

    sort(field: string, direction: SortDirection): void {
        const prevState = this.getTableState();
        const prevSortBy = prevState && prevState.sortBy || [];

        if (prevSortBy.length && prevSortBy[0].field === field && prevSortBy[0].direction === direction) {
            return;
        }

        const newSortBy: CollectionSort[] = [{field: field, direction: direction}];
        let state: TableState;

        if (!prevState) {
            state = {...DEFAULT_TABLE_STATE, sortBy: newSortBy};
        } else {
            state = {
                ...prevState,
                sortBy: [...newSortBy, ...prevState.sortBy]
            };
        }

        this.setTableState(state);
        this.sortChange.emit({ current: state.sortBy, previous: prevSortBy });
    }
}
