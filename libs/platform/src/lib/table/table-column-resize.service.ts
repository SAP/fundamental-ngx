import { ElementRef, Injectable, OnDestroy, Optional } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';

import { TableColumn } from './components/table-column/table-column';
import { TABLE_COLUMN_MIN_WIDTH } from './constants';
import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';
import { Table } from './table';

export const TABLE_RESIZER_BORDER_WIDTH = 3;

enum ColumnWidthChangeSource {
    WidthInput = 1,
    Resize
}

/**
 * Service to handle all things related to column resizing:
 * - Setting resizer
 * - Processing resize
 * - Calculating the real columns width
 */
@Injectable()
export class TableColumnResizeService implements OnDestroy {
    /** @hidden */
    private _columnsWidthMap = new Map<string, number>();

    /** @hidden is used to determine which width to rely on */
    private _columnsWidthChangeSourceMap = new Map<string, ColumnWidthChangeSource>();

    /** @hidden */
    private _columnsCellMap = new Map<string, ElementRef<HTMLTableDataCellElement>[]>();

    /** @hidden */
    private _visibleColumnNames: string[] = [];

    /** @hidden */
    private _startX: number | null = null;

    /** @hidden */
    private _clientStartX: number | null = null;

    /** @hidden */
    private _resizeInProgress = false;

    /** @hidden */
    private _resizedColumn: string;

    /** @hidden */
    private _resizerPosition: number | null = null;

    /** @hidden */
    private _scrollLeft = 0;

    /** @hidden */
    private _markForCheck = new Subject<void>();

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    private _resizerMoveSubscription = new Subscription();

    /** @hidden */
    private _tableRef: Table;

    /** Indicate if resizing process in progress. */
    get resizeInProgress(): boolean {
        return this._resizeInProgress;
    }

    /** Current column resizer position. */
    get resizerPosition(): number {
        return this._resizerPosition ?? 0;
    }

    /** Observable to notify to run CD */
    get markForCheck(): Observable<void> {
        return this._markForCheck.asObservable();
    }

    /** @hidden */
    private get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(
        private readonly _tableScrollDispatcherService: TableScrollDispatcherService,
        @Optional() private readonly _rtlService: RtlService
    ) {
        this._tableScrollDispatcherService
            ?.horizontallyScrolled()
            .pipe(takeUntil(this._destroyed))
            .subscribe((scrollable) => (this._scrollLeft = scrollable.getScrollLeft()));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._resizeInProgress = false;

        this._destroyed.next();
        this._destroyed.complete();

        this._resizerMoveSubscription.unsubscribe();
    }

    /** @hidden */
    setTableRef(ref: Table): void {
        this._tableRef = ref;
    }

    /** Reset columns width */
    resetColumnsWidth(): void {
        this._columnsWidthMap.clear();
    }

    /** Initialize service with data, trigger columns width calculation. */
    setColumnsWidth(visibleColumnNames: string[]): void {
        this._visibleColumnNames = visibleColumnNames;

        this._calculateColumnsWidth();
    }

    /** checks if freezable columns in total exceeds the size of table viewport. If yes, reduces each column equally  */
    updateFrozenColumnsWidth(): void {
        const maxWidth = this._tableRef.getMaxAllowedFreezableColumnsWidth();
        const freezeToNextColumnName = this._visibleColumnNames[this._tableRef._freezableColumns.size];
        const actualWidth = this.getPrevColumnsWidth(freezeToNextColumnName);
        if (actualWidth > maxWidth) {
            const reduceBy = actualWidth / maxWidth;
            [...this._tableRef._freezableColumns.keys()].forEach((columnName) => {
                const currentWidth = this._columnsWidthMap.get(columnName) ?? 0;
                const newWidth = Math.floor(currentWidth / reduceBy);
                this._columnsWidthMap.set(columnName, newWidth);
                this._columnsWidthChangeSourceMap.set(columnName, ColumnWidthChangeSource.Resize);
            });
            this._markForCheck.next();
        }
    }

    /**
     *  Get the column width, try in the next order:
     *  1. Width from map with calculated widths.
     *  2. Width defined by the user.
     *  3. Literally `auto`, means no width set.
     *
     *  In case there was a change to the width of the column (from the component input or resize event),
     *  corresponding value will be treated as higher priority
     */
    getColumnWidthStyle(column: TableColumn): string {
        const calculatedWidth = this._columnsWidthMap.get(column.name);
        const changeSource = this._columnsWidthChangeSourceMap.get(column.name);

        if (changeSource) {
            switch (changeSource) {
                case ColumnWidthChangeSource.Resize:
                    if (calculatedWidth) {
                        return calculatedWidth + 'px';
                    }

                    break;
                case ColumnWidthChangeSource.WidthInput:
                    if (column.width) {
                        return this.getColumnWidth(column.width);
                    }

                    break;
            }
        }

        if (calculatedWidth) {
            return calculatedWidth + 'px';
        }

        if (column.width) {
            return this.getColumnWidth(column.width);
        }

        return 'auto';
    }

    /** @hidden */
    private getColumnWidth(width: string): string {
        if (!width.trim().endsWith('%')) {
            return width;
        }

        const percent = parseFloat(width);

        return (this._tableRef._tableWidthPx * percent) / 100 + 'px';
    }

    /** Previous column name */
    getPreviousColumnName(columnName: string): string {
        return this._visibleColumnNames[this._visibleColumnNames.findIndex((name) => name === columnName) - 1];
    }

    /** Overall previous columns width. Used to calculate offset for the absolute positioned cells. */
    getPrevColumnsWidth(columnName: string): number {
        if (!this._columnsWidthMap.size || !columnName) {
            return 0;
        }

        let columnsWidth = 0;

        for (let i = 0; i < this._visibleColumnNames.length; i++) {
            const currentColumnName = this._visibleColumnNames[i];

            if (columnName === currentColumnName) {
                break;
            }

            columnsWidth += this._columnsWidthMap.get(currentColumnName) ?? 0;
        }

        return columnsWidth;
    }

    /** Register column's cell to get its dimensions in further. */
    registerColumnCell(columnName: string, cellElRef: ElementRef): void {
        const columnCells = this._columnsCellMap.get(columnName) || [];
        this._columnsCellMap.set(columnName, [cellElRef, ...columnCells]);
    }

    unregisterColumnCell(columnName: string, cellElRef: ElementRef): void {
        const columnCells = this._columnsCellMap.get(columnName) || [];
        const elmIndex = columnCells.findIndex((e) => e.nativeElement === cellElRef.nativeElement);

        if (elmIndex === -1) {
            return;
        }

        columnCells.splice(elmIndex, 1);

        this._columnsCellMap.set(columnName, columnCells);
    }

    /** Register the fact column width input was changed */
    registerColumnWidthInputChange(columnName: string): void {
        this._columnsWidthChangeSourceMap.set(columnName, ColumnWidthChangeSource.WidthInput);
    }

    /** Set the appropriate column resizer position. */
    setInitialResizerPosition(resizerPosition: number, resizedColumn: string): void {
        if (this.resizeInProgress) {
            return;
        }

        this._resizedColumn = resizedColumn;
        this._resizerPosition = null;

        if (resizerPosition != null) {
            const scrollLeftOffset = this._scrollLeft * (this._rtl ? 1 : -1);
            this._resizerPosition = resizerPosition - TABLE_RESIZER_BORDER_WIDTH + scrollLeftOffset;
        }
    }

    /** Hide the column resizer. */
    hideResizer(): void {
        if (this._resizeInProgress) {
            return;
        }

        this._resizerPosition = null;
        this._markForCheck.next();
    }

    /** Handle start resizing. */
    startResize(event: MouseEvent): void {
        if (!this._columnsWidthMap.size) {
            return;
        }

        this._startX = this.resizerPosition;
        this._clientStartX = event.clientX;

        this._updateResizerPositionOnMouseMove();

        this._resizeInProgress = true;
    }

    /** Handle end resizing. */
    finishResize(event: MouseEvent): void {
        this._resizerMoveSubscription.unsubscribe();

        this._resizeInProgress = false;
        this._resizerPosition = null;

        if (this._startX != null) {
            const clientStartX = this._clientStartX ?? 0;
            const diffX = this._rtl ? clientStartX - event.clientX : event.clientX - clientStartX;

            this._processResize(diffX);
        }

        this._startX = null;
        this._clientStartX = null;
    }

    /** @hidden */
    private _calculateColumnsWidth(): void {
        this._columnsCellMap.forEach((cells, columnName) => {
            const cellsWithWidth = cells.filter((c) => c.nativeElement.clientWidth > 0);
            if (cellsWithWidth.length === 0) {
                return;
            }
            const { width } = cellsWithWidth[0].nativeElement.getBoundingClientRect();
            this._columnsWidthMap.set(columnName, width);
        });
    }

    /** Update column resizer position. */
    private _updateResizerPositionOnMouseMove(): void {
        this._resizerMoveSubscription = fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(debounceTime(10))
            .subscribe((event) => {
                const clientStartX = this._clientStartX ?? 0;
                const diffX = this._rtl ? clientStartX - event.clientX : event.clientX - clientStartX;

                this._resizerPosition = (this._startX ?? 0) + diffX;

                this._markForCheck.next();
            });
    }

    /** Update columns width after resizing, prevent from having too small columns. */
    private _processResize(diffX: number): void {
        const columnWidth = this._columnsWidthMap.get(this._resizedColumn) ?? 0;

        let newDiffX = diffX;

        if (diffX < 0 && columnWidth + diffX < TABLE_COLUMN_MIN_WIDTH) {
            newDiffX = diffX + (TABLE_COLUMN_MIN_WIDTH - (columnWidth + diffX));
        }

        if (newDiffX > 0 && this._tableRef._freezableColumns.has(this._resizedColumn)) {
            const freezeToNextColumnName = this._visibleColumnNames[this._tableRef._freezableColumns.size];
            const actualWidth = this.getPrevColumnsWidth(freezeToNextColumnName);
            const newWidth = actualWidth + newDiffX;
            const maxWidth = this._tableRef.getMaxAllowedFreezableColumnsWidth();
            // in case "_resizedColumn" is freezable, make sure the overall width of freezable columns does not exceed the width of the table
            if (newWidth >= maxWidth) {
                newDiffX = maxWidth - actualWidth;
            }
        }

        this._columnsWidthMap.set(this._resizedColumn, columnWidth + newDiffX);
        this._columnsWidthChangeSourceMap.set(this._resizedColumn, ColumnWidthChangeSource.Resize);
    }
}
