import { Injectable } from '@angular/core';
import { FocusableItemPosition } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { convertTreeLikeToFlatList, createGroupedTableRowsTree, sortTreeLikeGroupedRows } from '../helpers';
import { CollectionGroup } from '../interfaces';
import { TableRow } from '../models';
import { EditableTableCell } from '../table-cell.class';

export type ToggleRowModel =
    | {
          type: 'toggleRow';
          row: TableRow;
      }
    | {
          type: 'toggleSingleSelectableRow';
          row: TableRow;
      }
    | {
          type: 'toggleMultiSelectRow';
          row: TableRow;
          event?: Event;
      };

export interface CellClickedModel {
    index: number;
    row: TableRow;
}

@Injectable()
export class TableRowService<T = any> {
    /** @hidden */
    private readonly _toggleRowSubject = new Subject<ToggleRowModel>();

    /** @hidden */
    private readonly _scrollToOverlappedCellSubject = new Subject<void>();

    /** @hidden */
    private readonly _cellClickedSubject = new Subject<CellClickedModel>();

    /** @hidden */
    private readonly _cellFocusedSubject = new Subject<FocusableItemPosition>();

    /** @hidden */
    private readonly _toggleAllSelectableRowsSubject = new Subject<boolean>();

    /** Stream that emits when toggling all selectable rows is needed. */
    readonly toggleAllSelectableRows$ = this._toggleAllSelectableRowsSubject.asObservable();

    /** Stream that emits when table cell being clicked. */
    readonly cellClicked$ = this._cellClickedSubject.asObservable();

    /** Stream that emits when scrolling to overlapped cell is needed. */
    readonly scrollToOverlappedCell$ = this._scrollToOverlappedCellSubject.asObservable();

    /** Stream that emits when the table cell being focused. */
    readonly cellFocused$ = this._cellFocusedSubject.asObservable();

    /** Toggle row stream. */
    readonly toggleRow$ = this._toggleRowSubject.asObservable();

    /** Editable cells map. */
    readonly editableCells = new Map<TableRow<any>, EditableTableCell[]>();

    /** @hidden */
    readonly childRowsAdded$ = new Subject<{ row: TableRow; rowIndex: number; items: T[] }>();

    /** Stream to load child items for a particular rows. */
    readonly loadChildRows$ = new Subject<TableRow<T>[]>();

    /** `toggleRow$` stream trigger. */
    toggleRow(evt: ToggleRowModel): void {
        this._toggleRowSubject.next(evt);
    }

    /** `scrollToOverlappedCell$` stream trigger. */
    scrollToOverlappedCell(): void {
        this._scrollToOverlappedCellSubject.next();
    }

    /** `cellClicked$` stream trigger. */
    cellClicked(evt: CellClickedModel): void {
        this._cellClickedSubject.next(evt);
    }

    /** `cellFocused$` stream trigger. */
    cellFocused(evt: FocusableItemPosition): void {
        this._cellFocusedSubject.next(evt);
    }

    /** `toggleAllSelectableRows$` stream trigger. */
    toggleAllSelectableRows(selectAll: boolean): void {
        this._toggleAllSelectableRowsSubject.next(selectAll);
    }

    /** Groups the table rows. */
    groupTableRows(
        sourceRows: TableRow[],
        groups: Iterable<CollectionGroup>,
        groupRulesMap: Map<string, CollectionGroup>
    ): TableRow[] {
        const groupRules = Array.from(groups);

        if (!groupRules.length) {
            /**
             * In case if previously we had groups with collapsed items
             * but now we don't have it we need to reset row.hidden flag
             * in order to avoid empty table after groups settings removing
             */
            sourceRows.forEach((row) => {
                row.hidden = false;
            });
            return sourceRows;
        }

        // Build tree like groups
        const treeLikeGroupedRows = createGroupedTableRowsTree(groupRules, sourceRows);

        // Sort tree like groups
        const sortedTreeLikeGroupedRows = sortTreeLikeGroupedRows(treeLikeGroupedRows, groupRulesMap);

        // Convert tree like list to a flat list
        return convertTreeLikeToFlatList(sortedTreeLikeGroupedRows);
    }

    /** Sets editable cells for particular row. */
    updateEditableCells(row: TableRow, cells: EditableTableCell[]): void {
        this.editableCells.set(row, cells);
    }

    /** Removes editable cells of particular row. */
    removeEditableCells(row: TableRow): void {
        this.editableCells.delete(row);
    }

    /** Triggers stream to load child items for a particular rows. */
    loadChildRows(rows: TableRow<T> | TableRow<T>[]): void {
        const expandableRows: TableRow<T>[] = [];
        if (Array.isArray(rows)) {
            expandableRows.push(...rows.filter((r) => !r.childItemsLoading$.value));
        } else {
            if (rows.childItemsLoading$.value) {
                return;
            }
            expandableRows.push(rows);
        }
        this.loadChildRows$.next(expandableRows);
    }
}
