import { Directive, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { BehaviorSubject, filter } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE, ROW_HEIGHT } from '../constants';
import { TableVirtualScroll } from '../models';
import { TableScrollDispatcherService } from '../services/table-scroll-dispatcher.service';
import { Table } from '../table';

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
export class TableVirtualScrollDirective extends TableVirtualScroll implements OnChanges {
    /** Whether to show only visible rows in matter of performance
     * false by default, when true setting bodyHeight and rowHeight is required.
     */
    @Input()
    virtualScroll = false;

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
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._table.tableScrollable) {
            return;
        }
        if (this.virtualScroll && (changes['rowHeight'] || changes['virtualScroll'] || changes['renderAhead'])) {
            this.calculateVirtualScrollRows();
        }
    }

    /** Sets table reference. */
    setTable(table: Table): void {
        this._table = table;
    }

    /**
     * Calculates rows in viewport.
     */
    calculateVirtualScrollRows(): void {
        if (!this.virtualScroll || !this.bodyHeight) {
            return;
        }

        const rowHeight = this.rowHeight + 1;

        const rowsVisible = this._table.getVisibleRows();
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
            rowsVisible[startNodeIndex] === rowsInViewPort[0];

        if (isCached) {
            return;
        }

        this._virtualScrollCache = { startNodeIndex, visibleNodeCount, totalNodeCount };
        this.virtualScrollTotalHeight = totalNodeCount * rowHeight - visibleNodeCount * rowHeight;
        this._table.setRowsInViewport(rowsVisible.slice(startNodeIndex, startNodeIndex + visibleNodeCount));
    }

    /**
     * Initialises scroll listener.
     */
    listenOnVirtualScroll(): void {
        this._tableScrollDispatcher
            .verticallyScrolled()
            .pipe(
                filter(() => this.virtualScroll && !!this.bodyHeight),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this.calculateVirtualScrollRows();
            });
    }
}
