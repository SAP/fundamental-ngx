import { AfterViewInit, Directive, inject, Input, OnDestroy, OnInit } from '@angular/core';

import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItemDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { TableCellDirective } from '@fundamental-ngx/core/table';
import equal from 'fast-deep-equal';
import { TableColumnResizeService } from '../services/table-column-resize.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

export type TableColumnResizableSide = 'start' | 'end' | 'both';

export const TABLE_CELL_RESIZABLE_THRESHOLD_PX = 4;

/**
 * Tracks mouse movement over the cell if the mouse pointer near the side of the cell, informs resize service.
 */
@Directive({
    selector: '[fdpTableCellResizable]',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: PlatformTableCellResizableDirective
        },
        {
            provide: FocusableItemDirective,
            useExisting: PlatformTableCellResizableDirective
        },
        {
            provide: TableCellDirective,
            useExisting: PlatformTableCellResizableDirective
        }
    ]
})
export class PlatformTableCellResizableDirective
    extends TableCellDirective
    implements OnInit, AfterViewInit, OnDestroy
{
    /** First column can be resized only by its end */
    @Input('fdpTableCellResizable')
    set resizableSide(value: TableColumnResizableSide) {
        if (!value) {
            return;
        }

        this._resizableSide = value;
    }

    /** Column name */
    @Input()
    columnName: string;

    /** @hidden */
    private _resizableSide: TableColumnResizableSide = 'both';

    /** @hidden */
    private get _isRtl(): boolean {
        return this._rtlService?.rtl.getValue() ?? false;
    }

    /** @hidden */
    private readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    constructor() {
        super();
    }

    /** @hidden */
    ngOnInit(): void {
        this._zone.runOutsideAngular(() => {
            fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousemove')
                .pipe(
                    filter(() => this._tableColumnResizeService?.resizeInProgress !== true),
                    debounceTime(5),
                    map((event) => this._getResizer(event) || { resizerPosition: 0, resizedColumn: this.columnName }),
                    distinctUntilChanged((prev, curr) => equal(prev, curr)),
                    takeUntil(this._destroy$)
                )
                .subscribe((data) => {
                    this._tableColumnResizeService.setInitialResizerPosition(data.resizerPosition, data.resizedColumn);
                });
            fromEvent<FocusEvent>(this.elementRef.nativeElement, 'focus')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    this._tableColumnResizeService.setInitialResizerPosition(0, this.columnName);
                });
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.columnName == null) {
            return;
        }

        this._tableColumnResizeService?.registerColumnCell(this.columnName, this.elementRef);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tableColumnResizeService?.unregisterColumnCell(this.columnName, this.elementRef);
    }

    /** @hidden */
    private _getResizer(event: MouseEvent): { resizerPosition: number; resizedColumn: string } | null {
        const el = this.elementRef.nativeElement;
        const elPosition = el.getBoundingClientRect();
        // check if mouse is within 5px of cell border
        if (event.clientX > elPosition.x + elPosition.width - 5 || event.clientX < elPosition.x + 5) {
            let resizerPosition: number | undefined;
            let resizedColumn: string | undefined;

            const pointerOnLeft = this._isRtl
                ? elPosition.right - event.clientX < TABLE_CELL_RESIZABLE_THRESHOLD_PX
                : event.clientX - elPosition.left < TABLE_CELL_RESIZABLE_THRESHOLD_PX;

            if (pointerOnLeft && this._resizableSide !== 'end') {
                resizerPosition = this._isRtl
                    ? el.parentElement!.offsetWidth - (el.offsetLeft + el.offsetWidth)
                    : el.offsetLeft;

                resizedColumn = this._tableColumnResizeService.getPreviousColumnName(this.columnName);
            }

            const pointerOnRight = this._isRtl
                ? event.clientX - elPosition.left < TABLE_CELL_RESIZABLE_THRESHOLD_PX
                : elPosition.right - event.clientX < TABLE_CELL_RESIZABLE_THRESHOLD_PX;

            if (pointerOnRight && this._resizableSide !== 'start') {
                resizerPosition = this._isRtl
                    ? el.parentElement!.offsetWidth - el.offsetLeft
                    : el.offsetLeft + el.offsetWidth;

                resizedColumn = this.columnName;
            }

            if (!resizedColumn) {
                return null;
            }

            return { resizerPosition: resizerPosition!, resizedColumn };
        } else {
            return null;
        }
    }
}
