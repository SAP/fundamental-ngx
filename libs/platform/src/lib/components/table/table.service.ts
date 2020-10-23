import { BehaviorSubject } from 'rxjs';

import { TableState } from './interfaces';

export class TableService {
    tableState: TableState;
    prevTableState: TableState;
    tableState$: BehaviorSubject<TableState> = new BehaviorSubject(null);

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
}
