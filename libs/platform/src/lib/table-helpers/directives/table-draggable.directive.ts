import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    forwardRef,
    HostBinding,
    inject,
    Input,
    NgZone,
    Output
} from '@angular/core';
import {
    DragoverPredicate,
    DropPredicate,
    FdDndDropEventMode,
    FdDndDropType,
    FdDropEvent
} from '@fundamental-ngx/cdk/utils';
import { take } from 'rxjs/operators';
import { FDP_TABLE_DRAGGABLE_DIRECTIVE } from '../constants';
import { TableRowType } from '../enums';
import { findRowChildren, getRowParents } from '../helpers';
import { TableRow, TableRowsRearrangeEvent, UpdatedDndRowsPosition } from '../models';
import { TableDraggable } from '../models/directives';
import { Table } from '../table';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-table[isTreeTable], fdp-table[enableRowReordering]',
    standalone: true,
    providers: [
        {
            provide: FDP_TABLE_DRAGGABLE_DIRECTIVE,
            useExisting: forwardRef(() => TableDraggableDirective)
        }
    ]
})
export class TableDraggableDirective<T = any> extends TableDraggable<T> {
    /** Whether to allow for row reordering on tree tables via drag and drop. */
    @Input()
    enableRowReordering = true;

    /** Whether tree mode is enabled. */
    @HostBinding('class.fd-table--tree')
    @Input()
    isTreeTable = false;

    /**
     * Row drop mode.
     */
    @Input()
    dropMode: FdDndDropType = 'auto';

    /** Predicate function that checks whether the item can be dropped over another item. */
    @Input()
    dropPredicate: DropPredicate<TableRow<T>>;

    /**
     * Predicate function that checks whether the item can be dragged over another item.
     * If the function returns `false`, dragged over item will not be highlighted, and drop event will be canceled.
     */
    @Input()
    dragoverPredicate: DragoverPredicate<TableRow<T>>;

    /** Event fired when tree rows rearranged through drag & drop. Consider that rows rearranged with their children rows. */
    @Output()
    readonly rowsRearrange = new EventEmitter<TableRowsRearrangeEvent<T>>();

    /** @hidden */
    get _rowsDraggable(): boolean {
        return this.isTreeTable && this.enableRowReordering;
    }

    /** @hidden */
    private _table: Table;

    /** @hidden */
    private readonly _ngZone = inject(NgZone);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    dragDropInProgress = false;

    /** @hidden */
    private get _tableRowsVisible(): TableRow[] {
        return this._table.getVisibleRows();
    }

    /** @hidden */
    private set _tableRows(rows: TableRow[]) {
        this._table.setTableRows(rows);
    }

    private get _tableRows(): TableRow[] {
        return this._table.getTableRows();
    }

    /** Sets table reference. */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * Initiates drag&drop sequence.
     */
    dragDropStart(): void {
        this.dragDropInProgress = true;
    }

    /** @hidden */
    dragRowFromKeyboard(dir: string, event: Event, currentRowIndex: number, mode: 'shift' | 'group'): void {
        if (!this._rowsDraggable) {
            return;
        }
        event.preventDefault();
        let replacedIndex;
        dir === 'up' ? (replacedIndex = currentRowIndex - 1) : (replacedIndex = currentRowIndex + 1);

        if (this._tableRowsVisible[replacedIndex]) {
            const dragDropEvent: FdDropEvent<TableRow<T>> = {
                items: this._tableRowsVisible,
                draggedItemIndex: currentRowIndex,
                replacedItemIndex: replacedIndex,
                insertAt: dir === 'down' ? 'after' : 'before',
                mode
            };
            this.dragDropItemDrop(dragDropEvent);
            setTimeout(() => {
                (event.target as HTMLElement).focus();
            });
        }
    }

    /** @hidden */
    dragDropItemDrop(event: FdDropEvent<TableRow>): void {
        /** After timeout to make click event handled first */
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => (this.dragDropInProgress = false));
        });

        this._onZoneFree(() => {
            if (this.isTreeTable && event.draggedItemIndex !== event.replacedItemIndex) {
                const dragRow = this._tableRows.find((row) => row === this._tableRowsVisible[event.draggedItemIndex]);
                const dropRow = this._tableRows.find((row) => row === this._tableRowsVisible[event.replacedItemIndex]);

                if (!dragRow || !dropRow || this._isDroppedInsideItself(dropRow, dragRow)) {
                    return;
                }

                this._dragDropUpdateDragParentRowAttributes(dragRow);
                this._dragDropRearrangeTreeRows(dragRow, dropRow, event);
                this._dragDropUpdateDropRowAttributes(dragRow, dropRow, event.mode);

                if (!dropRow.expanded && event.mode === 'group') {
                    this._table.toggleExpandableTableRow(dropRow);
                } else {
                    this._table.onTableRowsChanged();
                }

                this._cdr.detectChanges();
                this._emitRowsRearrangeEvent(dragRow, dropRow, event);
            }
        });
    }

    /**
     * @hidden
     * Create table rows rearrange event
     */
    _emitRowsRearrangeEvent(row: TableRow, dropRow: TableRow, event: FdDropEvent<TableRow>): void {
        const rows = this._tableRows.map(({ value }) => value);

        this.rowsRearrange.emit(
            new TableRowsRearrangeEvent(
                row.value,
                dropRow.value,
                event.draggedItemIndex,
                event.replacedItemIndex,
                event.insertAt,
                event.mode,
                rows
            )
        );
    }

    /** @hidden */
    private _isDroppedInsideItself(dropRow: TableRow, dragRow: TableRow): boolean {
        const dropRowParents = getRowParents(dropRow);
        return !!dropRowParents.find((row) => row === dragRow);
    }

    /** @hidden */
    private _dragDropUpdateDragParentRowAttributes(dragRow: TableRow): void {
        const parentRow = dragRow.parent;

        if (!parentRow) {
            return;
        }

        const parentRowChildren = findRowChildren(parentRow, this._tableRows);
        const dragRowChildren = findRowChildren(dragRow, this._tableRows);

        if (parentRowChildren.length - (dragRowChildren.length + 1) === 0) {
            parentRow.setRowType(TableRowType.ITEM);
        }
    }

    /** @hidden */
    private _dragDropUpdateDropRowAttributes(dragRow: TableRow, dropRow: TableRow, mode: FdDndDropEventMode): void {
        if (dragRow.parent) {
            // Remove child row from previous parent row.
            dragRow.parent.children.splice(dragRow.parent.children.indexOf(dragRow), 1);
        }
        dragRow.level = dropRow.level + (mode === 'group' ? 1 : 0);

        if (mode === 'group') {
            dragRow.parent = dropRow;
            if (!dropRow.isTree) {
                dropRow.setRowType(TableRowType.TREE);
            }

            dropRow.children.push(dragRow);
        } else {
            dragRow.parent = dropRow.parent;
            dropRow.parent?.children.push(dragRow);
        }

        const children = findRowChildren(dragRow, this._tableRows);
        children.forEach((row) => {
            row.level = getRowParents(row).length;
        });
    }

    /** @hidden */
    private _dragDropRearrangeTreeRows(dragRow: TableRow, dropRow: TableRow, event: FdDropEvent<TableRow>): void {
        if (event.mode === 'shift') {
            this._handleShiftDropAction(dragRow, dropRow, event);
        } else {
            this._handleReplaceDropAction(dragRow, dropRow);
        }
    }

    /** @hidden */
    private _getNewDragDropRowsPosition(dragRow: TableRow, dropRow: TableRow): UpdatedDndRowsPosition {
        const allRows = this._tableRows;

        const dragRowIndex = allRows.findIndex((row) => row === dragRow);
        const dragRowChildren = findRowChildren(dragRow, this._tableRows);

        const rowsToMove = allRows.splice(dragRowIndex, dragRowChildren.length + 1);

        const dropRowIndex = allRows.findIndex((row) => row === dropRow);
        const dropRowChildren = findRowChildren(dropRow, this._tableRows);

        const dropRowItemsLength = dropRowChildren.length + 1;

        const rowsAfterDropRow = allRows.splice(dropRowIndex + dropRowItemsLength, allRows.length + dropRowItemsLength);
        const dropRowItems = allRows.splice(dropRowIndex, dropRowItemsLength);

        return {
            allRows,
            rowsToMove,
            rowsAfterDropRow,
            dropRowItems
        };
    }

    /** @hidden */
    private _handleShiftDropAction(dragRow: TableRow, dropRow: TableRow, event: FdDropEvent<TableRow>): void {
        const { allRows, rowsToMove, rowsAfterDropRow, dropRowItems } = this._getNewDragDropRowsPosition(
            dragRow,
            dropRow
        );

        this._tableRows = [
            ...allRows,
            ...(event.insertAt === 'after' ? dropRowItems : []),
            ...rowsToMove,
            ...(event.insertAt === 'after' ? [] : dropRowItems),
            ...rowsAfterDropRow
        ];
    }

    /** @hidden */
    private _handleReplaceDropAction(dragRow: TableRow, dropRow: TableRow): void {
        const { allRows, rowsToMove, rowsAfterDropRow, dropRowItems } = this._getNewDragDropRowsPosition(
            dragRow,
            dropRow
        );

        this._tableRows = [...allRows, ...dropRowItems, ...rowsToMove, ...rowsAfterDropRow];
    }

    /** @hidden */
    private _onZoneFree(callback: () => void): void {
        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            callback();
        });
    }
}
