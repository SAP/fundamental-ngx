import { ElementRef, Injectable, OnDestroy, Optional } from '@angular/core';
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

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
export class TableColumnResizeService implements OnDestroy {
    /** @hidden */
    private _columnsWidthMap = new Map<string, number>();

    /** @hidden */
    private _columnsCellMap = new Map<string, ElementRef>();

    /** @hidden */
    private _visibleColumnNames: string[] = [];

    /** @hidden */
    private _startX: number;

    /** @hidden */
    private _clientStartX: number;

    /** @hidden */
    private _resizeInProgress = false;

    /** @hidden */
    private _resizedColumn: string;

    /** @hidden */
    private _resizerPosition: number;

    /** @hidden */
    private _offsetWidth: number;

    /** @hidden
     * Temporary: Prevent from resizing when there are fixed columns. They are positioned absolutely and it breaks all.
     */
    private _preventResize = false;

    /** @hidden */
    private _scrollLeft = 0;

    /** @hidden */
    private _markForCheck = new Subject<void>();

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    private _resizerMoveSubscription = new Subscription();

    /** Indicate if resizing process in progress. */
    get resizeInProgress(): boolean {
        return this._resizeInProgress;
    }

    /** Current column resizer position. */
    get resizerPosition(): number {
        return this._resizerPosition;
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
        this._tableScrollDispatcherService?.horizontallyScrolled()
            .pipe(takeUntil(this._destroyed))
            .subscribe(scrollable => this._scrollLeft = scrollable.getScrollLeft());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._resizeInProgress = false;

        this._destroyed.next();
        this._destroyed.complete();

        this._resizerMoveSubscription.unsubscribe();
    }

    /** Initialize service with data, trigger columns width calculation. */
    setColumnsWidth(
        visibleColumnNames: string[],
        freezeColumnsTo: string,
        offsetWidth: number
    ): void {
        this._visibleColumnNames = visibleColumnNames;
        this._preventResize = this._visibleColumnNames.includes(freezeColumnsTo);
        this._offsetWidth = offsetWidth;

        this._resetColumnsWidth();
        this._calculateColumnsWidth();
    }

    /** Get the column width, try in the next order:
     *  1. Width from map with calculated widths.
     *  2. Width defined by the user.
     *  3. Literally `auto`, means no width set.
     */
    getColumnWidthStyle(column: TableColumn): string {
        const calculatedWidth = this._columnsWidthMap.get(column.name);

        if (calculatedWidth) {
            return calculatedWidth + 'px';
        }

        if (column.width) {
            return column.width;
        }

        return 'auto';
    }

    /** Previous column name */
    getPreviousColumnName(columnName: string): string {
        return this._visibleColumnNames[this._visibleColumnNames.findIndex(name => name === columnName) - 1];
    }

    /** Overall previous columns width. Used to calculate offset for the absolute positioned cells. */
    getPrevColumnsWidth(columnName: string): number {
        if (!this._columnsWidthMap.size || !columnName) {
            return 0;
        }

        let columnsWidth = 0;

        for (let i = 0; i < this._visibleColumnNames.length; i ++) {
            const currentColumnName = this._visibleColumnNames[i];

            if (columnName === currentColumnName) {
                break;
            }

            columnsWidth += this._columnsWidthMap.get(currentColumnName);
        }

        return columnsWidth;
    }

    /** Register column's cell to get its dimensions in further. */
    registerColumnCell(columnName: string, cellElRef: ElementRef): void {
        this._columnsCellMap.set(columnName, cellElRef);
    }

    /** Set the appropriate column resizer position. */
    setInitialResizerPosition(resizerPosition: number, resizedColumn: string): void {
        if (this.resizeInProgress || this._preventResize) {
            return;
        }

        this._resizedColumn = resizedColumn;
        this._resizerPosition = null;

        if (resizerPosition != null) {
            const scrollLeftOffset = this._scrollLeft * (this._rtl ? 1 : -1);
            this._resizerPosition = resizerPosition + this._offsetWidth - TABLE_RESIZER_BORDER_WIDTH + scrollLeftOffset;
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
        this._columnsCellMap.forEach((cell, columnName) => {
            this._columnsWidthMap.set(columnName, cell.nativeElement.offsetWidth);
        });
    }

    /** @hidden */
    private _resetColumnsWidth(): void {
        this._columnsWidthMap.clear();
    }

    /** Update column resizer position. */
    private _updateResizerPositionOnMouseMove(): void {
        this._resizerMoveSubscription = fromEvent(document, 'mousemove')
            .pipe(delay(10))
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
        const columnWidth = this._columnsWidthMap.get(this._resizedColumn);

        let newDiffX = diffX;

        if (diffX < 0 && columnWidth + diffX < TABLE_COLUMN_MIN_WIDTH) {
            newDiffX = diffX + (TABLE_COLUMN_MIN_WIDTH - (columnWidth + diffX));
        }

        this._columnsWidthMap.set(this._resizedColumn, columnWidth + newDiffX);
    }
}
