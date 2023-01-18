import { ElementRef, Injectable, OnDestroy, Optional } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/cdk/utils';

import { TABLE_COLUMN_MIN_WIDTH } from './constants';
import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';
import { Table } from './table';

export const TABLE_RESIZER_BORDER_WIDTH = 3;

/**
 * Service to handle all things related to column resizing:
 * - Setting resizer
 * - Processing resize
 * - Calculating the real columns width
 */
@Injectable()
export class TableColumnResizeService implements OnDestroy {
    /** @hidden */
    private _fixedColumnsWidthMap = new Map<string, string>();

    /** @hidden */
    private _columnsCellMap = new Map<string, ElementRef<HTMLTableDataCellElement>[]>();

    /** @hidden */
    private _visibleColumnNames: string[] = [];

    /** @hidden */
    private _visibleColumnLeftNeighbourMap = new Map<string, string | undefined>();

    /** @hidden */
    private _visibleColumnLeftOffsetPxMap = new Map<string, number>();

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

    /** table has fixed width if all of it's columns are fixed */
    get fixedWidth(): boolean {
        return this._fixedColumnsWidthMap.size === this._visibleColumnNames.length;
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

    /** @hidden initializes service with data, trigger columns width calculation. */
    setColumnNames(visibleColumnNames: string[]): void {
        this._visibleColumnLeftNeighbourMap.clear();
        visibleColumnNames.forEach((column, index) => {
            this._visibleColumnLeftNeighbourMap.set(column, visibleColumnNames[index - 1]);
        });
        this._visibleColumnNames = [...visibleColumnNames];
        this.updateFrozenColumnsWidth();
    }

    /** @hidden */
    updateFrozenColumnsWidth(): void {
        let allPreviousWidths = 0;
        for (const [column, prevColumn] of this._visibleColumnLeftNeighbourMap.entries()) {
            allPreviousWidths +=
                this._columnsCellMap.get(prevColumn as string)?.[0]?.nativeElement.getBoundingClientRect().width ?? 0;
            this._visibleColumnLeftOffsetPxMap.set(column, allPreviousWidths);
        }
    }

    /** @hidden */
    updateFrozenColumnsWidthAfterResize(columnName: string, diffX: number): void {
        let found = false;
        for (const [column, width] of this._visibleColumnLeftOffsetPxMap.entries()) {
            if (column === columnName) {
                found = true;
            } else if (found) {
                this._visibleColumnLeftOffsetPxMap.set(column, width + diffX);
            }
        }
    }

    /** Retrieves custom column value or returns `unset` */
    getColumnWidthStyle(columnName: string): string {
        const calculatedWidth = this._fixedColumnsWidthMap.get(columnName);
        return calculatedWidth || 'unset';
    }

    /** Previous column name */
    getPreviousColumnName(columnName: string): string | undefined {
        return this._visibleColumnLeftNeighbourMap.get(columnName);
    }

    /** Overall previous columns width. Used to calculate offset for the absolute positioned cells. */
    getPrevColumnsWidth(columnName: string): number {
        return this._visibleColumnLeftOffsetPxMap.get(columnName) ?? 0;
    }

    /** Register column's cell to get its dimensions in further. */
    registerColumnCell(columnName: string, cellElRef: ElementRef): void {
        const columnCells = this._columnsCellMap.get(columnName) || [];
        this._columnsCellMap.set(columnName, [cellElRef, ...columnCells]);
    }

    /** Unregister column's cell. */
    unregisterColumnCell(columnName: string, cellElRef: ElementRef): void {
        const columnCells = this._columnsCellMap.get(columnName) || [];
        const elmIndex = columnCells.findIndex((e) => e.nativeElement === cellElRef.nativeElement);

        if (elmIndex === -1) {
            return;
        }

        columnCells.splice(elmIndex, 1);

        this._columnsCellMap.set(columnName, columnCells);
    }

    /** Register the value of column width that changed from  input */
    setCustomWidth(columnName: string, value: string): void {
        this._fixedColumnsWidthMap.set(columnName, value);
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

        this._markForCheck.next();
    }

    /** Update columns width after resizing, prevent from having too small columns. */
    _processResize(diffX: number): void {
        const columnWidth = this._columnsCellMap
            .get(this._resizedColumn)?.[0]
            ?.nativeElement.getBoundingClientRect().width;

        if (!columnWidth) {
            return;
        }

        if (diffX < 0 && columnWidth + diffX < TABLE_COLUMN_MIN_WIDTH) {
            diffX = TABLE_COLUMN_MIN_WIDTH - columnWidth;
        }

        if (!this.fixedWidth) {
            for (const [columnName, cells] of this._columnsCellMap.entries()) {
                if (cells.length) {
                    this._fixedColumnsWidthMap.set(
                        columnName,
                        cells[0].nativeElement.getBoundingClientRect().width + 'px'
                    );
                }
            }
        }

        if (diffX > 0 && this._tableRef._freezableColumns.has(this._resizedColumn)) {
            const freezeToNextColumnName = this._visibleColumnNames[this._tableRef._freezableColumns.size];
            const actualWidth = this.getPrevColumnsWidth(freezeToNextColumnName);
            const newWidth = actualWidth + diffX;
            const maxWidth = this._tableRef.getMaxAllowedFreezableColumnsWidth();
            // in case "_resizedColumn" is freezable, make sure the overall width of freezable columns does not exceed the width of the table
            if (newWidth >= maxWidth) {
                diffX = maxWidth - actualWidth;
            }
        }

        this._fixedColumnsWidthMap.set(this._resizedColumn, columnWidth + diffX + 'px');
        this.updateFrozenColumnsWidthAfterResize(this._resizedColumn, diffX);
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
}
