import { EventEmitter, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TableViewSettingsFilterComponent } from './components/table-view-settings-filter/table-view-settings-filter.component';
import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    TableState
} from './interfaces';
import { SortDirection } from './enums';
import { DEFAULT_TABLE_STATE } from './constants';
import { FilterChange, FreezeChange, GroupChange, SortChange } from './models';

export class TableService {
    prevTableState: TableState;
    tableState$: BehaviorSubject<TableState> = new BehaviorSubject(DEFAULT_TABLE_STATE);

    filters: QueryList<TableViewSettingsFilterComponent>;

    readonly sortChange: EventEmitter<SortChange> = new EventEmitter<SortChange>();
    readonly filterChange: EventEmitter<FilterChange> = new EventEmitter<FilterChange>();
    readonly groupChange: EventEmitter<GroupChange> = new EventEmitter<GroupChange>();
    readonly freezeChange: EventEmitter<FreezeChange> = new EventEmitter<FreezeChange>();

    constructor() {}

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this.tableState$.getValue();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this.prevTableState = this.getTableState();
        this.tableState$.next(state);
    }

    sort(field: string, direction: SortDirection): void {
        const prevState = this.getTableState();
        const prevSortBy = prevState && prevState.sortBy || [];

        if (prevSortBy.length && prevSortBy[0].field === field && prevSortBy[0].direction === direction) {
            return;
        }

        const newSortBy: CollectionSort[] = [{field: field, direction: direction}];
        const state: TableState = { ...prevState, sortBy: newSortBy };

        this.setTableState(state);
        this.sortChange.emit({ current: state.sortBy, previous: prevSortBy });
    }

    filter(filter: any /* CollectionFilter */): void {
        const prevState = this.getTableState();
        const prevFilterBy: any = prevState && prevState.filterBy || [];

        if (!this.isFilterChanged(filter, prevFilterBy)) {
            return;
        }

        const newFilterBy: CollectionFilter[] = [filter];
        const state: TableState = { ...prevState, filterBy: newFilterBy };

        this.setTableState(state);
        this.filterChange.emit({ current: state.filterBy, previous: prevFilterBy });
    }

    group(field: string, direction: SortDirection): void {
        const prevState = this.getTableState();
        const prevGroupBy = prevState && prevState.groupBy || [];

        if (prevGroupBy.length && prevGroupBy[0].field === field && prevGroupBy[0].direction === direction) {
            return;
        }

        const newGroupBy: CollectionGroup[] = [{field: field, direction: direction}];
        const state: TableState = { ...prevState, groupBy: newGroupBy };

        this.setTableState(state);
        this.groupChange.emit({ current: state.groupBy, previous: prevGroupBy });
    }

    freezeTo(columnName: string): void {
        const prevState = this.getTableState();

        this.setTableState({ ...prevState, freezeToColumn: columnName });
        this.freezeChange.emit({ current: columnName, previous: prevState.freezeToColumn });
    }

    private isFilterChanged(filter: any, prevFilterBy: any): boolean {
        return !(
            prevFilterBy.length &&
            prevFilterBy[0].field === filter.field &&
            (
                (prevFilterBy[0].value !== undefined && prevFilterBy[0].value === filter.value) ||
                (prevFilterBy[0].value2 !== undefined && prevFilterBy[0].value2 === filter.value2) ||
                (prevFilterBy[0].values !== undefined && prevFilterBy[0].values === filter.values) ||
                (prevFilterBy[0].valueMap !== undefined && prevFilterBy[0].valueMap === filter.valueMap)
            )
        );
    }
}
