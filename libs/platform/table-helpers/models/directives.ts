import { EventEmitter } from '@angular/core';
import { DragoverPredicate, DropPredicate, FdDndDropType, FdDropEvent } from '@fundamental-ngx/cdk/utils';
import { Observable } from 'rxjs';
import { CollectionFilter, CollectionGroup, CollectionSort, TableState } from '../interfaces';
import { Table } from '../table';
import { TableRow } from './table-row.model';
import { TableRowsRearrangeEvent } from './table-rows-rearrange-event.model';

export abstract class TableDraggable<T = any> {
    abstract dragDropInProgress: boolean;
    abstract enableRowReordering: boolean;
    abstract isTreeTable: boolean;
    abstract dropMode: FdDndDropType;
    abstract dropPredicate: DropPredicate<TableRow<T>>;
    abstract dragoverPredicate: DragoverPredicate<TableRow<T>>;
    abstract rowsRearrange: EventEmitter<TableRowsRearrangeEvent<T>>;
    abstract draggedRow: TableRow<T> | null;
    abstract draggedDndIndex: number | null;
    abstract draggedRowGlobalIndex: number | null;
    abstract dragRowFromKeyboard(dir: string, event: Event, currentRowIndex: number, mode: 'shift' | 'group'): void;
    abstract dragDropItemDrop(event: FdDropEvent<TableRow>): void;
    abstract dragDropStart(draggedItem?: TableRow<T>, dndIndex?: number, globalIndex?: number): void;
    abstract setTable(table: Table): void;
    abstract dropCancelled(): void;
}

export abstract class TableInitialState {
    abstract initialSortBy: CollectionSort[];
    abstract initialVisibleColumns: string[];
    abstract initialFilterBy: CollectionFilter[];
    abstract initialGroupBy: CollectionGroup[];
    abstract initialPage: number;
    abstract state: TableState;
    abstract setTable(table: Table): void;
    abstract setInitialState(): void;
    /**
     * Returns the initial sort state snapshot captured when setInitialState() was first called.
     * This value does not change even if the initialSortBy input is dynamically updated.
     * Used by the settings dialog to determine the true "reset" target.
     */
    abstract getInitialSortBySnapshot(): CollectionSort[];
    /**
     * Returns the initial filter state snapshot captured when setInitialState() was first called.
     */
    abstract getInitialFilterBySnapshot(): CollectionFilter[];
    /**
     * Returns the initial group state snapshot captured when setInitialState() was first called.
     */
    abstract getInitialGroupBySnapshot(): CollectionGroup[];
}

export abstract class TableVirtualScroll {
    abstract rowHeight: number;
    abstract secondaryRowHeight: number | undefined;
    abstract virtualScrollTransform$: Observable<number>;
    abstract virtualScroll: boolean;
    abstract virtualScrollTotalHeight: number;
    abstract scrollWholeRows: boolean;
    abstract setTable(table: Table): void;
    abstract listenOnVirtualScroll(): void;
    abstract calculateVirtualScrollRows(): void;
}
