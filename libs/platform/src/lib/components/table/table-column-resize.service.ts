import { ElementRef, Injectable, OnDestroy, OnInit, Optional } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { delay, takeUntil, takeWhile } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';

import { TableColumn } from './components/table-column/table-column';
import { TABLE_COLUMN_MIN_WIDTH } from './constants';
import { TableScrollDispatcherService } from './table-scroll-dispatcher.service';

export const TABLE_RESIZER_BORDER_WIDTH = 3;

/**
 * Service to handle all things related to column resizing:
 * - Setting resizer
 * - Processing resize
 * - Calculating the real columns width
 */
@Injectable()
export class TableColumnResizeService implements OnInit, OnDestroy {
    /** @hidden */
    private _columnsWidthMap = new Map<number, number>();

    /** @hidden */
    private _columnsCellMap = new Map<number, ElementRef>();

    /** @hidden */
    private _startX: number;

    /** @hidden */
    private _clientStartX: number;

    /** @hidden */
    private _resizeInProgress = false;

    /** @hidden */
    private _resizedColumnIndex: number;

    /** @hidden */
    private _resizerPosition: number;

    /** @hidden */
    private _selectionColumnWidth: number;

    /** @hidden */
    private _scrollbarWidth: number;

    /** @hidden */
    private _scrollLeft = 0;

    /** @hidden */
    private _markForCheck = new Subject<void>();

    /** Temporary: Prevent from resizing when there are fixed columns.
     *  They are positioned absolutely and it breaks all.
     */
    private _fixedColumnsPresent: boolean;

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** Indicate if resizing process in progress. */
    get resizeInProgress(): boolean {
        return this._resizeInProgress;
    }

    /** Current column resizer position. */
    get resizerPosition(): number {
        if (this._resizerPosition == null) {
            return null;
        }

        if (this.resizeInProgress) {
            return this._resizerPosition;
        }

        const scrollLeftOffset = this._scrollLeft * (this._rtl ? 1 : -1);
        return this._resizerPosition + this._selectionColumnWidth + scrollLeftOffset;
    }

    get markForCheck(): Observable<void> {
        return this._markForCheck.asObservable();
    }

    /** @hidden */
    private get _preventResize(): boolean {
        return this._fixedColumnsPresent;
    }

    /** @hidden */
    private get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(
        @Optional() private readonly _tableScrollDispatcherService: TableScrollDispatcherService,
        @Optional() private readonly _rtlService: RtlService
    ) { }

    /** @hidden */
    ngOnInit(): void {
        this._tableScrollDispatcherService?.horizontallyScrolled()
            .pipe(takeUntil(this._destroyed))
            .subscribe(scrollable => this._scrollLeft = scrollable.getScrollLeft());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._resizeInProgress = false;

        this._destroyed.next();
        this._destroyed.complete();
    }

    /** Initialize service with data, trigger columns width calculation. */
    initialize(selectionColumnWidth: number, fixedColumnsPresent: boolean, scrollbarWidth: number): void {
        this._selectionColumnWidth = selectionColumnWidth;
        this._fixedColumnsPresent = fixedColumnsPresent;
        this._scrollbarWidth = scrollbarWidth;

        this._calculateColumnsWidth();
    }

    /** Reset previously calculated columns width */
    resetColumnsWidth(): void {
        this._columnsWidthMap.clear();
    }

    /** Try to get the real column width in the next order:
     *  1. Width from stored widths map.
     *  2. Width defined by the user (may be changed over time by column resizing).
     *  3. Literally `auto`.
     */
    getColumnWidthStyle(column: TableColumn, columnIndex: number): string {
        const calculatedWidth = this._columnsWidthMap.get(columnIndex);

        if (calculatedWidth) {
            return calculatedWidth + 'px';
        }

        if (column.width) {
            return column.width;
        }

        return 'auto';
    }

    /** Overall previous columns width. Used to calculate offset for the absolute positioned cells. */
    getPrevColumnsWidth(columnIndex: number): number {
        if (!this._columnsWidthMap.size) {
            return 0;
        }

        return Array.from(this._columnsWidthMap.values())
            .slice(0, columnIndex)
            .reduce((sum, width) => (sum += width), 0);
    }

    /** Register column's cell to get its dimensions in further. */
    registerColumnCell(index: number, cellElRef: ElementRef): void {
        this._columnsCellMap.set(index, cellElRef);
    }

    /** Set the appropriate column resizer position. */
    setInitialResizerPosition(resizerPosition: number, resizedColumnIndex: number): void {
        if (this.resizeInProgress || this._preventResize) {
            return;
        }

        this._resizedColumnIndex = resizedColumnIndex;
        this._resizerPosition = resizerPosition != null ? (resizerPosition - TABLE_RESIZER_BORDER_WIDTH) : null;
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
        this._resizeInProgress = false;
        this._resizerPosition = null;

        if (this._startX != null) {
            const diffX = this._rtl
                ? (this._clientStartX - event.clientX)
                : (event.clientX - this._clientStartX);

            this._processResize(diffX);
        }

        this._startX = null;
        this._clientStartX = null;
    }

    /** @hidden */
    private _calculateColumnsWidth(): void {
        this._columnsCellMap.forEach((cell, index) => {
            this._columnsWidthMap.set(index, cell.nativeElement.offsetWidth);
        });
    }

    /** Update column resizer position. */
    private _updateResizerPositionOnMouseMove(): void {
        fromEvent(document, 'mousemove')
            .pipe(delay(10), takeWhile(() => this._resizeInProgress))
            .subscribe((event: MouseEvent) => {
                const diffX = this._rtl
                    ? (this._clientStartX - event.clientX)
                    : (event.clientX - this._clientStartX);

                this._resizerPosition = this._startX + diffX;

                this._markForCheck.next();
            });
    }

    /** Update columns width after resizing, prevent from having too small columns. */
    private _processResize(diffX: number): void {
        const columnWidth = this._columnsWidthMap.get(this._resizedColumnIndex);

        let newDiffX = diffX;

        if (diffX < 0 && columnWidth + diffX < TABLE_COLUMN_MIN_WIDTH) {
            newDiffX = diffX + (TABLE_COLUMN_MIN_WIDTH - (columnWidth + diffX));
        }

        this._columnsWidthMap.set(this._resizedColumnIndex, columnWidth + newDiffX);
    }
}
