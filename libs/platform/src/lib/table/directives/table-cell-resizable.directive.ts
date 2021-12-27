import { AfterViewInit, Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';

import { TableColumnResizeService } from '../table-column-resize.service';

export type TableColumnResizableSide = 'start' | 'end' | 'both';

export const TABLE_CELL_RESIZABLE_THRESHOLD_PX = 4;

/**
 * Tracks mouse movement over the cell if the mouse pointer near the side of the cell, informs resize service.
 */
@Directive({ selector: '[fdpTableCellResizable]' })
export class PlatformTableCellResizableDirective implements AfterViewInit {
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
    @HostListener('mousemove', ['$event'])
    _onMouseMove(event: MouseEvent): void {
        if (!this._tableColumnResizeService) {
            return;
        }

        const [resizerPosition, resizedColumn] = this._getResizer(event);

        this._tableColumnResizeService.setInitialResizerPosition(resizerPosition, resizedColumn);
    }

    /** @hidden */
    private _getResizer(event: MouseEvent): [number, string] {
        const el = this._elRef.nativeElement;
        const elPosition = el.getBoundingClientRect();

        let resizerPosition: number;
        let resizedColumn: string;

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

        return [resizerPosition, resizedColumn];
    }
}
