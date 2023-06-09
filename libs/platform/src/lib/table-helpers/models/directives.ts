import { EventEmitter } from '@angular/core';
import { DragoverPredicate, DropPredicate, FdDndDropType, FdDropEvent, Nullable } from '@fundamental-ngx/cdk/utils';
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
    abstract dragRowFromKeyboard(dir: string, event: Event, currentRowIndex: number, mode: 'shift' | 'group'): void;
    abstract dragDropItemDrop(event: FdDropEvent<TableRow>): void;
    abstract dragDropStart(): void;
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
}

export abstract class TableVirtualScroll {
    abstract rowHeight: number;
    abstract virtualScroll: boolean;
    abstract virtualScrollTotalHeight: number;
    abstract virtualScrollTransform: Nullable<string>;
    abstract setTable(table: Table): void;
    abstract listenOnVirtualScroll(): void;
    abstract calculateVirtualScrollRows(): void;
}
