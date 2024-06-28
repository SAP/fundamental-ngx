import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Directive, HostListener, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FocusableItemPosition, KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { Subscription } from 'rxjs';
import { FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE, ROW_HEIGHT } from '../constants';
import { TableVirtualScroll } from '../models';
import { Table } from '../table';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-table[virtualScroll]',
    standalone: true,
    providers: [
        {
            provide: FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE,
            useExisting: TableVirtualScrollDirective
        }
    ]
})
export class TableVirtualScrollDirective extends TableVirtualScroll implements OnChanges, OnDestroy {
    /**
     * Whether to show only visible rows in matter of performance
     * false by default, when true setting bodyHeight and rowHeight is required.
     */
    @Input()
    virtualScroll = false;

    /** Cache size for the virtualScroll, default is 40 in each direction */
    @Input()
    renderAhead = 40;

    /** Body height. Required for virtual scrolling. */
    @Input()
    bodyHeight: string;

    /**
     * Height of the row, required for virtual scrolling.
     * default is 44px in cozy, 32px in compact and 24px in condensed (set automatically)
     */
    @Input()
    rowHeight = ROW_HEIGHT.get(ContentDensityMode.COZY)!;

    /** @hidden */
    virtualScrollTotalHeight = 0;

    /** @hidden */
    private _table: Table;

    /** @hidden */
    private _previousStartNodeIndex: number | null = null;

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
    constructor(private _cdRef: ChangeDetectorRef) {
        super();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _keydownHandler(event: KeyboardEvent): void {
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
            this._scrollRow('up', -1);
        } else if (
            this._focusedCell?.rowIndex === this._getNumberOfRowsToDisplay() &&
            KeyUtil.isKeyCode(event, DOWN_ARROW)
        ) {
            this._scrollRow('down', 1);
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
    }

    /** Sets table reference. */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * Calculates rows in viewport.
     */
    calculateVirtualScrollRows(): void {
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
        }

        const rowsVisible = this._table._tableRowsVisible;
        const totalNodeCount = rowsVisible.length;
        let visibleNodeCount =
            Math.ceil(this._table.tableContainer.nativeElement.clientHeight / this.rowHeight) * this.renderAhead;
        visibleNodeCount = Math.min(totalNodeCount - startNodeIndex, visibleNodeCount);
        this.virtualScrollTotalHeight = totalNodeCount * this.rowHeight - visibleNodeCount * this.rowHeight;

        this._setRows(startNodeIndex);

        this._table.tableScrollMockContainer.nativeElement.style.width = '1rem';
        this._table.tableScrollMockContainer.nativeElement.style.maxHeight = this.bodyHeight;
    }

    /**
     * Initialises scroll listener.
     */
    listenOnVirtualScroll(): void {
        this._table.tableContainer.nativeElement.addEventListener('wheel', this._wheelScrollListenerFunction, {
            passive: false
        });
        this._table.tableScrollMockContainer.nativeElement.addEventListener(
            'scroll',
            this._mockScrollbarListenerFunction,
            { passive: false }
        );
    }

    private _getNumberOfRowsToDisplay(): number {
        let tableHeight = this._table.tableContainer.nativeElement.clientHeight;
        tableHeight = tableHeight - this._table.tableContainer.nativeElement.querySelector('thead').clientHeight;
        return Math.floor(tableHeight / (this.rowHeight + 2));
    }

    private _wheelScrollListenerFunction = (event: WheelEvent): void => {
        event.preventDefault();
        event.stopImmediatePropagation();
        clearTimeout(this._wheelTimeout);
        const deltaY = event.deltaY;
        if (deltaY) {
            this._wheelTimeout = setTimeout(() => {
                this._table.tableScrollMockContainer.nativeElement.scrollBy({ top: deltaY });
                this._scrollRow(deltaY > 0 ? 'down' : 'up', deltaY > 0 ? 1 : -1);
                this._lastMockScrollPosition = this._table.tableScrollMockContainer.nativeElement.scrollTop;
            }, 5);
        }
    };

    private _mockScrollbarListenerFunction = (event: Event): void => {
        event.preventDefault();
        event.stopImmediatePropagation();
        clearTimeout(this._scrollMockTimeout);
        let deltaY = this._table.tableScrollMockContainer.nativeElement.scrollTop - this._lastMockScrollPosition;
        deltaY = deltaY / this.rowHeight;
        this._scrollMockTimeout = setTimeout(() => {
            this._scrollRow(deltaY > 0 ? 'down' : 'up', deltaY);
            this._lastMockScrollPosition = this._table.tableScrollMockContainer.nativeElement.scrollTop;
            if (this._table.tableScrollMockContainer.nativeElement.scrollTop === 0) {
                this._setRows(0);
            }
            if (
                this._table.tableScrollMockContainer.nativeElement.scrollTop +
                    this._table.tableContainer.nativeElement.getBoundingClientRect().height ===
                this._table.tableScrollMockContainer.nativeElement.scrollHeight
            ) {
                this._setRows(this._table._tableRows.length - this._getNumberOfRowsToDisplay());
            }
        });
    };

    private _scrollRow(direction: 'up' | 'down', count: number): void {
        let startingNode = 0;
        if (this._previousStartNodeIndex !== null && this._previousStartNodeIndex >= 0) {
            startingNode = this._previousStartNodeIndex;
        }
        if (startingNode + count + this._getNumberOfRowsToDisplay() <= this._table._tableRows.length) {
            startingNode = Math.ceil(startingNode + count);
        }
        if (startingNode < 0) {
            startingNode = 0;
        }
        this._setRows(startingNode);
    }

    private _setRows(startingNode: number): void {
        this._table.setRowsInViewport(startingNode, this._getNumberOfRowsToDisplay());
        this._previousStartNodeIndex = startingNode;
        this._table.setTableState({
            ...this._table.getTableState(),
            scrollTopPosition: this.rowHeight * startingNode
        });
    }
}
