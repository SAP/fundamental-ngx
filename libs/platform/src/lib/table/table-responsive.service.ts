import { ElementRef, Inject, Injectable, OnDestroy } from '@angular/core';
import { resizeObservable } from '@fundamental-ngx/core/utils';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { TableColumn } from './components';
import { FdpColumnResponsiveState } from './interfaces/column-responsive-state.interface';
import { Table } from './table';
import { TableService } from './table.service';

export interface FdpTableBreakpoint {
    min: number;
    max: number;
    visibility: FdpColumnResponsiveState;
}

@Injectable()
export class TableResponsiveService implements OnDestroy {
    /** @hidden */
    private readonly _responsiveBreakpoints = new Map<TableColumn, FdpTableBreakpoint[]>();

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    /** @hidden */
    private _resizeSubscription: Subscription | undefined;

    /** @hidden */
    constructor(
        @Inject(Table) private readonly _table: Table,
        private readonly _tableService: TableService,
        private readonly _elmRef: ElementRef
    ) {}

    /**
     * Registers responsive column with it's breakpoint configuration.
     * @param column Table Column
     * @param breakpoints Breakpoint configuration.
     */
    registerResponsiveColumn(column: TableColumn, breakpoints: Record<string, FdpColumnResponsiveState>): void {
        this._responsiveBreakpoints.set(column, this._normalizeBreakpoints(breakpoints));

        this._listenToTableResize();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @hidden
     * Transforms plain breakpoints into a list with minimal/maximal element width with it's visibility state.
     */
    private _normalizeBreakpoints(breakpoints: Record<string, FdpColumnResponsiveState>): FdpTableBreakpoint[] {
        const sortedBreakpoints = Object.keys(breakpoints)
            .map((i) => parseInt(i, 10))
            .sort((a, b) => a - b);
        const newBreakpoints = sortedBreakpoints.reduce((result: FdpTableBreakpoint[], value, index, array) => {
            result.push({
                min: value,
                max: index + 1 < array.length ? array[index + 1] - 1 : Infinity,
                visibility: breakpoints[value.toString()]
            });

            return result;
        }, []);

        return newBreakpoints;
    }

    /**
     * @hidden
     * Listens to the table element resize and calculates columns visibility based on the current breakpoint.
     */
    private _listenToTableResize(): void {
        this._resizeSubscription?.unsubscribe();

        this._resizeSubscription = resizeObservable(this._elmRef.nativeElement)
            .pipe(debounceTime(20), takeUntil(this._onDestroy$))
            .subscribe(() => {
                this._processResponsiveColumns();
            });
    }

    /** @hidden */
    private _processResponsiveColumns(): void {
        let shouldNotify = false;
        const { width } = this._elmRef.nativeElement.getBoundingClientRect();

        this._responsiveBreakpoints.forEach((breakpoints, item) => {
            const fittingBreakpoint = breakpoints.find(
                (breakpoint) => breakpoint.min <= width && breakpoint.max >= width
            );

            if (fittingBreakpoint) {
                shouldNotify = shouldNotify || item.responsiveState !== fittingBreakpoint.visibility;
                item.responsiveState = fittingBreakpoint.visibility;
            }
        });

        // Notify only when there's actual visibility changes to any of the columns.
        if (!shouldNotify) {
            return;
        }

        const currentTableColumns = this._table.getVisibleTableColumns().map((column) => column.name);

        this._tableService.columnsChange.emit({ previous: currentTableColumns, current: currentTableColumns });

        this._tableService.detectChanges();
    }
}
