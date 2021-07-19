import { AfterViewInit, Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';

import { TableColumnResizeService } from '../table-column-resize.service';

export type TableColumnResizableSide = 'end' | 'both';

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

    /** To calculate resized column index */
    @Input()
    columnIndex: number;

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
        if (this.columnIndex == null) {
            return;
        }

        this._tableColumnResizeService?.registerColumnCell(this.columnIndex, this._elRef);
    }

    /** @hidden */
    @HostListener('mousemove', ['$event'])
    _onMouseMove(event: MouseEvent): void {
        if (!this._tableColumnResizeService) {
            return;
        }

        const el = this._elRef.nativeElement;

        const [resizerPosition, resizedColumnIndex] = this._isRtl
            ? this._getResizerRtl(event, el)
            : this._getResizer(event, el);

        this._tableColumnResizeService.setInitialResizerPosition(resizerPosition, resizedColumnIndex);
    }

    /** @hidden */
    private _getResizer(event: MouseEvent, el: HTMLElement): number[] {
        const elPosition = el.getBoundingClientRect();

        let resizerPosition: number;
        let resizedColumnIndex: number;

        if (event.clientX - elPosition.left < 4 && this._resizableSide !== 'end') {
            resizerPosition = el.offsetLeft;
            resizedColumnIndex = this.columnIndex - 1;
        }

        if (elPosition.right - event.clientX < 4) {
            resizerPosition = el.offsetLeft + el.offsetWidth
            resizedColumnIndex = this.columnIndex;
        }

        return [resizerPosition, resizedColumnIndex];
    }

    /** @hidden */
    private _getResizerRtl(event: MouseEvent, el: HTMLElement): number[] {
        const elPosition = el.getBoundingClientRect();

        let resizerPosition: number;
        let resizedColumnIndex: number;

        if (elPosition.right - event.clientX < 4 && this._resizableSide !== 'end') {
            resizerPosition = el.parentElement.offsetWidth - (el.offsetLeft + el.offsetWidth);
            resizedColumnIndex = this.columnIndex - 1;
        }

        if (event.clientX - elPosition.left < 4) {
            resizerPosition = el.parentElement.offsetWidth - el.offsetLeft;
            resizedColumnIndex = this.columnIndex;
        }

        return [resizerPosition, resizedColumnIndex];
    }
}
