import { Directive, HostListener, inject, Input, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DestroyedService, FocusableItemPosition, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { BehaviorSubject, filter, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FDP_TABLE_DRAGGABLE_DIRECTIVE, FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE, ROW_HEIGHT } from '../constants';
import { TableDraggable, TableVirtualScroll } from '../models';
import { TableScrollDispatcherService } from '../services/table-scroll-dispatcher.service';
import { Table } from '../table';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { TableRowService } from '../services/table-row.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    set scrollWholeRows(value: boolean) {
        this._scrollWholeRows = coerceBooleanProperty(value);
        if (this._scrollWholeRows) {
            this.virtualScroll = true;
        }
    }

    get scrollWholeRows(): boolean {
        return this._scrollWholeRows;
    }

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
    private readonly _dndTableDirective = inject<TableDraggable>(FDP_TABLE_DRAGGABLE_DIRECTIVE, {
        optional: true
    });

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
    private _scrollWholeRows = false;

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _keydownHandler(event: KeyboardEvent): void {
        if (this.scrollWholeRows) {
            if (this._focusedCell?.rowIndex === 0 && KeyUtil.isKeyCode(event, UP_ARROW)) {
                if (this._table.tableContainer.nativeElement.querySelectorAll('tr')[1].ariaRowIndex !== '0') {
                    const cellToFocus = {
                        colIndex: this._focusedCell.colIndex,
                        rowIndex: 1
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
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._focusableGridSubscription?.unsubscribe();
        if (this.scrollWholeRows) {
            this._table.tableContainer.nativeElement.removeEventListener('wheel', this._wheelScrollListenerFunction, {
                passive: false
            });
            this._table.tableScrollMockContainer.nativeElement.removeEventListener(
                'scroll',
                this._mockScrollbarListenerFunction,
                { passive: false }
            );
        }
    }

    /** Sets table reference. */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * This function determines how many rows can be displayed in the table, and sets the rows in the table based on the
     * start node index, which may come from the table state
     */
    calculateVirtualScrollRows(): void {
        if (this.scrollWholeRows) {
            if (!this._focusableGridSubscription) {
                this._focusableGridSubscription = this._table._focusableGrid.itemFocused.subscribe((event) => {
                    this._focusedCell = event;
                });
            }
            if (!this.virtualScroll || !this.bodyHeight || this._dndTableDirective?.dragDropInProgress) {
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
            let visibleNodeCount = this._getNumberOfRowsToDisplay();
            visibleNodeCount = Math.min(totalNodeCount - startNodeIndex, visibleNodeCount);
            this.virtualScrollTotalHeight = totalNodeCount * this.rowHeight - visibleNodeCount * this.rowHeight;

            this._setRows(startNodeIndex);
            const scrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
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
     * @hidden
     * Initialises scroll listeners.
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
        const numberOfRows = Math.floor(tableHeight / this.rowHeight);
        let retVal: number;
        if (this._table._tableRowsVisible.length < numberOfRows) {
            retVal = this._table._tableRowsVisible.length;
        } else {
            retVal = numberOfRows;
        }
        return retVal;
    }

    /**
     * @hidden
     * This function is called when the user performs a wheel event. It determines whether or not the user has scrolled
     * up or down using the event's deltaX property, and scrolls the table by one row.
     */
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

    /**
     * @hidden
     * This function is called when the mock scrollbar (when using 'scrollWholeRows') is moved. It determines if the
     * scroll was up or down by comparing the current scroll top to the previous scroll top and scrolls rows accordingly.
     */
    private _mockScrollbarListenerFunction = (event: Event): void => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (this._scrollMockTimeout) {
            window.cancelAnimationFrame(this._scrollMockTimeout);
        }
        const tableScrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
        let deltaY = tableScrollMockContainer.scrollTop - this._lastMockScrollPosition;
        deltaY = Math.ceil(deltaY / this.rowHeight);
        this._scrollMockTimeout = window.requestAnimationFrame(() => {
            this._scrollRow(deltaY, true);
            this._lastMockScrollPosition = tableScrollMockContainer.scrollTop;
            if (tableScrollMockContainer.scrollTop === 0) {
                // Always display the first row of the table when the user scrolls all the way to the top
                this._setRows(0);
            }
            if (
                tableScrollMockContainer.scrollTop + tableScrollMockContainer.getBoundingClientRect().height ===
                tableScrollMockContainer.scrollHeight
            ) {
                // Always display the last rows of the table when the user scrolls all the way to the bottom
                const startingNodeIndex = this._table._tableRowsVisible.length - this._getNumberOfRowsToDisplay();
                this._setRows(startingNodeIndex);
            }
        });
    };

    /**
     * @hidden
     * This function, used only when 'scrollWholeRows' is truthy, calculates what should be the new starting node, based
     * off the previous starting node and the provided 'count' parameter. For example if the previous start node was 10
     * and the count parameter is -2, the new starting node will be 8. This function also programmatically moves the
     * mock scrollbar.
     */
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
        // This next 'if' statement is for triggering new page loads when 'pageScrolling' is true
        if (count > 0 && startingNode === this._previousStartNodeIndex && this._table.pageScrolling) {
            this._table._onSpyIntersect(true);
        }
        this._setRows(startingNode);
        const tableScrollMockContainer = this._table.tableScrollMockContainer.nativeElement;
        if (!fromMockScrollbarListener) {
            tableScrollMockContainer.scrollBy({ top: count * this.rowHeight });
        }
        this._lastMockScrollPosition = tableScrollMockContainer.scrollTop;
        if (this._table.pageScrolling) {
            this._table.tableScrolled.emit(this._lastMockScrollPosition);
        }
    }

    /**
     * @hidden
     * This function sets rows in the table's viewport depending on the provided starting node. It also sets the table
     * state.
     */
    private _setRows(startingNode: number): void {
        this._table.setRowsInViewport(startingNode, this._getNumberOfRowsToDisplay());
        this._previousStartNodeIndex = startingNode;
        this._table.setTableState({
            ...this._table.getTableState(),
            scrollTopPosition: this.rowHeight * startingNode
        });
    }
}
