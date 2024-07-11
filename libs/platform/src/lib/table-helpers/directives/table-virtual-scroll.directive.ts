import { Directive, HostListener, inject, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DestroyedService, FocusableItemPosition, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE, ROW_HEIGHT } from '../constants';
import { TableVirtualScroll } from '../models';
import { TableScrollDispatcherService } from '../services/table-scroll-dispatcher.service';
import { Table } from '../table';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { TableRowService } from '../services/table-row.service';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-table[virtualScroll]',
    standalone: true,
    providers: [
        DestroyedService,
        {
            provide: FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE,
            useExisting: TableVirtualScrollDirective
        }
    ]
})
export class TableVirtualScrollDirective extends TableVirtualScroll implements OnInit, OnChanges, OnDestroy {
    /** Whether to show only visible rows in matter of performance
     * false by default, when true setting bodyHeight and rowHeight is required.
     */
    @Input()
    virtualScroll = false;

    /**
     * Whether to scroll whole rows rather than pixel by pixel when the user performs a scroll.
     * This gives greater performance improvements but also lends to some potentially undesirable UX changes.
     * A "rowHeight" must be provided when using this feature.
     */
    @Input()
    scrollWholeRows = false;

    /** Cache size for the virtualScroll, default is 40 in each direction */
    @Input()
    renderAhead = 40;

    /** Body height. */
    @Input()
    bodyHeight: string;

    /**
     * Height of the row, required for the virtualScroll,
     * default is 44px in cozy, 32px in compact and 24px in condensed (set automatically)
     */
    @Input()
    rowHeight = ROW_HEIGHT.get(ContentDensityMode.COZY)!;

    /** @hidden */
    virtualScrollTotalHeight = 0;

    /** @hidden */
    virtualScrollTransform$ = new BehaviorSubject<number>(0);

    /** @hidden */
    private _table: Table;

    /** @hidden */
    private _virtualScrollCache = { startNodeIndex: -1, visibleNodeCount: -1, totalNodeCount: -1 };

    /** @hidden */
    private readonly _tableScrollDispatcher = inject(TableScrollDispatcherService);

    /** @hidden */
    private readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private _wheelTimeout: any;

    /** @hidden */
    private _scrollMockTimeout: any;

    /** @hidden */
    private _lastMockScrollPosition = 0;

    /** @hidden */
    private _focusableGridSubscription: Subscription;

    /** @hidden */
    private _focusedCell: FocusableItemPosition;

    /** @hidden */
    private _previousStartNodeIndex: number | null = null;

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _keydownHandler(event: KeyboardEvent): void {
        if (this.scrollWholeRows) {
            if (this._focusedCell?.rowIndex === 0 && KeyUtil.isKeyCode(event, UP_ARROW)) {
                if (this._table.tableContainer.nativeElement.querySelectorAll('tr')[1].ariaRowIndex !== '0') {
                    const cellToFocus = {
                        colIndex: this._focusedCell.colIndex,
                        rowIndex: 1,
                        totalCols: this._focusedCell.totalCols,
                        totalRows: this._focusedCell.totalRows
                    };
                    this._table._focusableGrid.focusCell(cellToFocus);
                }
                this._scrollRow(-1);
            } else if (
                this._focusedCell?.rowIndex === this._getNumberOfRowsToDisplay() &&
                KeyUtil.isKeyCode(event, DOWN_ARROW)
            ) {
                this._scrollRow(1);
            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.scrollWholeRows && !this.virtualScroll) {
            this.virtualScroll = true;
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._table.tableScrollable) {
            return;
        }
        if (this.virtualScroll && (changes['rowHeight'] || changes['virtualScroll'] || changes['renderAhead'])) {
            this.calculateVirtualScrollRows();
        }
        if (changes?.scrollWholeRows && changes.scrollWholeRows.currentValue && !this.virtualScroll) {
            this.virtualScroll = true;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._focusableGridSubscription?.unsubscribe();
    }

    /** Sets table reference. */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * Calculates rows in viewport.
     */
    calculateVirtualScrollRows(): void {
        if (this.scrollWholeRows) {
            if (!this._focusableGridSubscription) {
                this._focusableGridSubscription = this._table._focusableGrid.itemFocused.subscribe((event) => {
                    this._focusedCell = event;
                });
            }
            if (!this.virtualScroll || !this.bodyHeight) {
                return;
            }

            let startNodeIndex = 0;
            const scrollTop = this._table.getTableState().scrollTopPosition;
            if (scrollTop !== 0) {
                startNodeIndex = Math.floor(scrollTop / this.rowHeight);
                if (startNodeIndex > this._table._tableRowsVisible.length) {
                    startNodeIndex = 0;
                }
            }

            const totalNodeCount = this._table._tableRowsVisible.length;
            let visibleNodeCount = Math.floor(this._table.tableContainer.nativeElement.clientHeight / this.rowHeight);
            visibleNodeCount = Math.min(totalNodeCount - startNodeIndex, visibleNodeCount);
            this.virtualScrollTotalHeight = totalNodeCount * this.rowHeight - visibleNodeCount * this.rowHeight;

            this._setRows(startNodeIndex);
            const scrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
            scrollMockContainer.style.width = '1rem';
            scrollMockContainer.style.maxHeight = this.bodyHeight;
        } else {
            if (!this.virtualScroll || !this.bodyHeight) {
                return;
            }

            const rowHeight = this.rowHeight + 1;

            const rowsVisible = this._table._tableRowsVisible;
            const rowsInViewPort = this._table.getRowsInViewport();
            const totalNodeCount = rowsVisible.length;
            const scrollTop = this._table.tableScrollable.getScrollTop();

            let startNodeIndex = Math.floor(scrollTop / rowHeight) - this.renderAhead;
            startNodeIndex = Math.max(0, startNodeIndex);

            let visibleNodeCount =
                Math.ceil(this._table.tableContainer.nativeElement.clientHeight / rowHeight) + 2 * this.renderAhead;
            visibleNodeCount = Math.min(totalNodeCount - startNodeIndex, visibleNodeCount);

            this.virtualScrollTransform$.next(startNodeIndex * rowHeight);

            // Simple caching to avoid unnecessary re-renderings
            const isCached =
                startNodeIndex === this._virtualScrollCache.startNodeIndex &&
                visibleNodeCount === this._virtualScrollCache.visibleNodeCount &&
                totalNodeCount === this._virtualScrollCache.totalNodeCount &&
                // On rows change, even if the total number of rows is the same, the row object will be different
                startNodeIndex === rowsInViewPort[0];

            if (isCached) {
                return;
            }

            this._virtualScrollCache = { startNodeIndex, visibleNodeCount, totalNodeCount };
            this.virtualScrollTotalHeight = totalNodeCount * rowHeight - visibleNodeCount * rowHeight;
            this._table.setRowsInViewport(
                startNodeIndex,
                rowsVisible.slice(startNodeIndex, startNodeIndex + visibleNodeCount).length
            );
        }
    }

    /**
     * Initialises scroll listener.
     */
    listenOnVirtualScroll(): void {
        if (this.scrollWholeRows) {
            this._table.tableContainer.nativeElement.addEventListener('wheel', this._wheelScrollListenerFunction, {
                passive: false
            });
            this._table.tableScrollMockContainer.nativeElement.addEventListener(
                'scroll',
                this._mockScrollbarListenerFunction,
                { passive: false }
            );
        } else {
            this._tableScrollDispatcher
                .verticallyScrolled()
                .pipe(
                    filter(() => this.virtualScroll && !!this.bodyHeight),
                    takeUntil(this._destroy$)
                )
                .subscribe((scrollable) => {
                    this.calculateVirtualScrollRows();
                    this._table.setTableState({
                        ...this._table.getTableState(),
                        scrollTopPosition: scrollable.getScrollTop()
                    });
                });
        }
    }

    /** @hidden */
    private _getNumberOfRowsToDisplay(): number {
        const tableContainer = this._table.tableContainer.nativeElement;
        let tableHeight = tableContainer.clientHeight;
        tableHeight = tableHeight - tableContainer.querySelector('thead').clientHeight;
        return Math.floor(tableHeight / (this.rowHeight + 2));
    }

    /** @hidden */
    private _wheelScrollListenerFunction = (event: WheelEvent): void => {
        if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (this._wheelTimeout) {
                window.cancelAnimationFrame(this._wheelTimeout);
            }
            const deltaY = event.deltaY;
            if (deltaY) {
                this._wheelTimeout = window.requestAnimationFrame(() => {
                    this._scrollRow(deltaY > 0 ? 1 : -1);
                });
            }
        }
    };

    /** @hidden */
    private _mockScrollbarListenerFunction = (event: Event): void => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this._scrollMockTimeout) {
            window.cancelAnimationFrame(this._scrollMockTimeout);
        }
        const tableScrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
        let deltaY = tableScrollMockContainer.scrollTop - this._lastMockScrollPosition;
        deltaY = deltaY / this.rowHeight;
        this._scrollMockTimeout = window.requestAnimationFrame(() => {
            this._scrollRow(deltaY, true);
            this._lastMockScrollPosition = tableScrollMockContainer.scrollTop;
            if (tableScrollMockContainer.scrollTop === 0) {
                this._setRows(0);
            }
            if (
                tableScrollMockContainer.scrollTop + tableScrollMockContainer.getBoundingClientRect().height ===
                tableScrollMockContainer.scrollHeight
            ) {
                const startingNodeIndex = this._table._tableRowsVisible.length - this._getNumberOfRowsToDisplay();
                this._setRows(startingNodeIndex);
            }
        });
    };

    /** @hidden */
    private _scrollRow(count: number, fromMockScrollbarListener = false): void {
        let startingNode = 0;
        if (this._previousStartNodeIndex !== null && this._previousStartNodeIndex >= 0) {
            startingNode = this._previousStartNodeIndex;
        }
        if (
            startingNode + count + this._getNumberOfRowsToDisplay() <= this._table._tableRowsVisible.length ||
            count < 0
        ) {
            startingNode = Math.ceil(startingNode + count);
        }
        if (startingNode < 0) {
            startingNode = 0;
        }
        if (
            count > 0 &&
            startingNode === this._previousStartNodeIndex &&
            this._table.pageScrolling &&
            this._table._tableRowsVisible.length === this._table._tableRows.length
        ) {
            this._table._onSpyIntersect(true);
        }
        this._setRows(startingNode);
        const tableScrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
        if (!fromMockScrollbarListener) {
            tableScrollMockContainer.scrollBy({ top: count * this.rowHeight });
        }
        this._lastMockScrollPosition = tableScrollMockContainer.scrollTop;
    }

    /** @hidden */
    private _setRows(startingNode: number): void {
        this._table.setRowsInViewport(startingNode, this._getNumberOfRowsToDisplay());
        this._previousStartNodeIndex = startingNode;
        this._table.setTableState({
            ...this._table.getTableState(),
            scrollTopPosition: this.rowHeight * startingNode
        });
    }
}
