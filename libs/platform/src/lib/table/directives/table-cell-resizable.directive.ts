import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Optional } from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';

import { TableColumnResizeService } from '../table-column-resize.service';

export type TableColumnResizableSide = 'start' | 'end' | 'both';

export const TABLE_CELL_RESIZABLE_THRESHOLD_PX = 4;

/**
 * Tracks mouse movement over the cell if the mouse pointer near the side of the cell, informs resize service.
 */
@Directive({ selector: '[fdpTableCellResizable]' })
export class PlatformTableCellResizableDirective implements AfterViewInit, OnDestroy {
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
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(
        private readonly _elRef: ElementRef,
        private readonly _tableColumnResizeService: TableColumnResizeService,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.columnName == null) {
            return;
        }

        this._tableColumnResizeService?.registerColumnCell(this.columnName, this._elRef);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._tableColumnResizeService?.unregisterColumnCell(this.columnName, this._elRef);
    }

    /** @hidden */
    @HostListener('focus')
    _onFocus(): void {
        this._tableColumnResizeService.setInitialResizerPosition(0, this.columnName);
    }

    /** @hidden */
    @HostListener('mousemove', ['$event'])
    _onMouseMove(event: MouseEvent): void {
        if (!this._tableColumnResizeService || this._tableColumnResizeService.resizeInProgress) {
            return;
        }

        const data = this._getResizer(event);

        if (!data) {
            // If cursor is out of resizer boundaries, hide it.
            this._tableColumnResizeService.setInitialResizerPosition(0, this.columnName);
            return;
        }

        this._tableColumnResizeService.setInitialResizerPosition(data.resizerPosition, data.resizedColumn);
    }

    /** @hidden */
    private _getResizer(event: MouseEvent): { resizerPosition: number; resizedColumn: string } | null {
        const el = this._elRef.nativeElement;
        const elPosition = el.getBoundingClientRect();

        let resizerPosition: number | undefined;
        let resizedColumn: string | undefined;

        const pointerOnLeft = this._isRtl
            ? elPosition.right - event.clientX < TABLE_CELL_RESIZABLE_THRESHOLD_PX
            : event.clientX - elPosition.left < TABLE_CELL_RESIZABLE_THRESHOLD_PX;

        if (pointerOnLeft && this._resizableSide !== 'end') {
            resizerPosition = this._isRtl
                ? el.parentElement.offsetWidth - (el.offsetLeft + el.offsetWidth)
                : el.offsetLeft;

            resizedColumn = this._tableColumnResizeService.getPreviousColumnName(this.columnName);
        }

        const pointerOnRight = this._isRtl
            ? event.clientX - elPosition.left < TABLE_CELL_RESIZABLE_THRESHOLD_PX
            : elPosition.right - event.clientX < TABLE_CELL_RESIZABLE_THRESHOLD_PX;

        if (pointerOnRight && this._resizableSide !== 'start') {
            resizerPosition = this._isRtl
                ? el.parentElement.offsetWidth - el.offsetLeft
                : el.offsetLeft + el.offsetWidth;

            resizedColumn = this.columnName;
        }

        if (!resizedColumn) {
            return null;
        }

        return { resizerPosition: resizerPosition!, resizedColumn };
    }
}
