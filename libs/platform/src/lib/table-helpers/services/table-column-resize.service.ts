import { ElementRef, Injectable, OnDestroy, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { TABLE_COLUMN_MIN_WIDTH } from '../constants';

import { Table } from '../table';
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
    /** Subject that emits new map of fixed columns and their respective width. */
    readonly fixedColumsWidthChange = new BehaviorSubject<Map<string, string>>(new Map());
    /** @hidden */
    private _fixedColumnsWidthMap = new Map<string, string>();

    /** @hidden */
    private _columnsCellMap = new Map<string, ElementRef<HTMLTableDataCellElement>[]>();

    /** @hidden */
    private _visibleColumnNames: string[] = [];

    /** @hidden */
    private _visibleColumnLeftNeighbourMap = new Map<string, string | undefined>();

    /** @hidden */
    private _visibleColumnRightNeighbourMap = new Map<string, string | undefined>();

    /** @hidden */
    private _visibleColumnLeftOffsetPxMap = new Map<string, number>();

    /** @hidden */
    private _visibleColumnRightOffsetPxMap = new Map<string, number>();

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

    /** Resize progress stream. */
    readonly resizeInProgress$ = new BehaviorSubject<boolean>(this._resizeInProgress);

    /** Whether cell mock should be visible. */
    readonly cellMockVisible$ = new BehaviorSubject<boolean>(false);

    /** Current column resizer position. */
    get resizerPosition(): number {
        return this._resizerPosition ?? 0;
    }

    /** Resizer position stream. */
    readonly resizerPosition$ = new BehaviorSubject<number>(0);

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
        this.resizeInProgress$.next(false);

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
        this._visibleColumnRightNeighbourMap.clear();
        visibleColumnNames.forEach((column, index) => {
            this._visibleColumnLeftNeighbourMap.set(column, visibleColumnNames[index - 1]);
        });
        visibleColumnNames.reverse().forEach((column, index) => {
            this._visibleColumnRightNeighbourMap.set(column, visibleColumnNames[index - 1]);
        });
        this._visibleColumnNames = [...visibleColumnNames];
        this.updateFrozenColumnsWidth();
    }

    /** @hidden */
    updateFrozenColumnsWidth(): void {
        let allPreviousWidths = 0,
            allNextWidths = 0;
        for (const [column, prevColumn] of this._visibleColumnLeftNeighbourMap.entries()) {
            allPreviousWidths +=
                this._columnsCellMap.get(prevColumn as string)?.[0]?.nativeElement.getBoundingClientRect().width ?? 0;
            this._visibleColumnLeftOffsetPxMap.set(column, allPreviousWidths);
        }
        for (const [column, nextColumn] of this._visibleColumnRightNeighbourMap.entries()) {
            allNextWidths +=
                this._columnsCellMap.get(nextColumn as string)?.[0]?.nativeElement.getBoundingClientRect().width ?? 0;
            this._visibleColumnRightOffsetPxMap.set(column, allNextWidths);
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

    /** Previous column name */
    getNextColumnName(columnName: string): string | undefined {
        return this._visibleColumnRightNeighbourMap.get(columnName);
    }

    /** Overall previous columns width. Used to calculate offset for the absolute positioned cells. */
    getPrevColumnsWidth(columnName: string): number {
        return this._visibleColumnLeftOffsetPxMap.get(columnName) ?? 0;
    }

    /** Overall next columns width. Used to calculate offset for the absolute positioned cells. */
    getNextColumnsWidth(columnName: string): number {
        return this._visibleColumnRightOffsetPxMap.get(columnName) ?? 0;
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
        this.fixedColumsWidthChange.next(this._fixedColumnsWidthMap);
    }

    /** Set the appropriate column resizer position. */
    setInitialResizerPosition(resizerPosition: number, resizedColumn: string): void {
        if (this.resizeInProgress) {
            return;
        }

        this._resizedColumn = resizedColumn;
        this._resizerPosition = null;
        this.resizerPosition$.next(this.resizerPosition);

        if (resizerPosition != null) {
            const scrollLeftOffset = this._scrollLeft * (this._rtl ? 1 : -1);
            this._resizerPosition = resizerPosition - TABLE_RESIZER_BORDER_WIDTH + scrollLeftOffset;
            this.resizerPosition$.next(this.resizerPosition);
        }

        this._markForCheck.next();
    }

    /** Hide the column resizer. */
    hideResizer(): void {
        if (this._resizeInProgress) {
            return;
        }

        this._resizerPosition = null;
        this.resizerPosition$.next(this.resizerPosition);
        this._markForCheck.next();
    }

    /** Handle start resizing. */
    startResize(event: MouseEvent): void {
        this._startX = this.resizerPosition;
        this._clientStartX = event.clientX;

        this._updateResizerPositionOnMouseMove();

        this._resizeInProgress = true;
        this.resizeInProgress$.next(true);
    }

    /** Handle end resizing. */
    finishResize(event: MouseEvent): void {
        this._resizerMoveSubscription.unsubscribe();

        this._resizeInProgress = false;
        this.resizeInProgress$.next(false);
        this._resizerPosition = null;
        this.resizerPosition$.next(this.resizerPosition);

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
        const resizedElement = this._columnsCellMap.get(this._resizedColumn)?.[0]?.nativeElement;
        const columnWidth = resizedElement?.getBoundingClientRect().width;

        if (!columnWidth || !resizedElement) {
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

        this.fixedColumsWidthChange.next(this._fixedColumnsWidthMap);

        /**
         * In case "_resizedColumn" is freezable, make sure the overall width of freezable columns does not exceed the width of the table.
         * If it does, columns will be made unfrozen.
         */
        if (
            diffX > 0 &&
            (this._tableRef._freezableColumns.has(this._resizedColumn) ||
                this._tableRef._freezableEndColumns?.has(this._resizedColumn))
        ) {
            let actualWidth = this.getPrevColumnsWidth(this._resizedColumn) + columnWidth;
            if (this._tableRef._freezableEndColumns?.has(this._resizedColumn)) {
                actualWidth = this.getNextColumnsWidth(this._resizedColumn) + columnWidth;
            }
            const newWidth = actualWidth + diffX;
            const maxWidth = this._tableRef.getMaxAllowedFreezableColumnsWidth();
            if (newWidth >= maxWidth) {
                this._tableRef._freezableColumns.forEach((column) => {
                    this._tableRef.unfreeze(column.toString());
                });
            }
        }

        const updatedWidth = columnWidth + diffX;
        this._fixedColumnsWidthMap.set(this._resizedColumn, updatedWidth + 'px');
        this.fixedColumsWidthChange.next(this._fixedColumnsWidthMap);
        this.updateFrozenColumnsWidthAfterResize(this._resizedColumn, diffX);

        const computed = window.getComputedStyle(resizedElement);
        const padding = parseInt(computed.paddingLeft, 10) + parseInt(computed.paddingRight, 10);
        this._updateHeaderOverflowState(updatedWidth - padding);
        this._markForCheck.next();
    }

    /** Update column resizer position. */
    private _updateResizerPositionOnMouseMove(): void {
        this._resizerMoveSubscription = fromEvent<MouseEvent>(document, 'mousemove')
            .pipe(debounceTime(10))
            .subscribe((event) => {
                const clientStartX = this._clientStartX ?? 0;
                const diffX = this._rtl ? clientStartX - event.clientX : event.clientX - clientStartX;

                this._resizerPosition = (this._startX ?? 0) + diffX;
                this.resizerPosition$.next(this.resizerPosition);

                this._markForCheck.next();
            });
    }

    /**
     * Check if the header text length goes over the column width. In such case applies text truncation with
     * ellipsis and make sure we also show a tooltip.
     *
     * @private
     */
    private _updateHeaderOverflowState(updatedWidth: number): void {
        const element = this._columnsCellMap
            .get(this._resizedColumn)
            ?.find((c) => c?.nativeElement.tagName === 'TH')?.nativeElement;
        const visibleColumn = this._tableRef.getVisibleTableColumns().find((c) => c.name === this._resizedColumn);
        const headerTextElem = element?.querySelector(`#${this._tableRef.id}-header-cell-${this._resizedColumn}`);

        if (!headerTextElem || !visibleColumn) {
            return;
        }
        visibleColumn.headerOverflows = headerTextElem.scrollWidth > updatedWidth;
    }
}
