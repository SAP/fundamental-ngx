import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, inject, NgZone, OnInit } from '@angular/core';
import {
    DestroyedService,
    FocusableCellPosition,
    FocusableItemPosition,
    KeyUtil,
    Nullable,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumnResizeService } from '../services/table-column-resize.service';
import { TableRowService } from '../services/table-row.service';

@Directive({
    selector: '[fdpTableHeaderResizer]',
    standalone: true,
    providers: [DestroyedService]
})
export class TableHeaderResizerDirective implements OnInit {
    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _elmRef = inject(ElementRef);

    /** @hidden */
    private readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @hidden */
    private readonly _tableRowService = inject(TableRowService);

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    private _focusinTimerId: any;

    /** @hidden */
    focusedCellPosition: Nullable<FocusableCellPosition>;

    /** @hidden */
    private get _headerCellFocused(): boolean {
        return document.activeElement?.tagName.toLowerCase() === 'th';
    }
    /** @hidden */
    ngOnInit(): void {
        this._zone.runOutsideAngular(() => {
            fromEvent<KeyboardEvent>(this._elmRef.nativeElement, 'keydown')
                .pipe(takeUntil(this._destroy$))
                .subscribe((event) => {
                    if (
                        (KeyUtil.isKeyCode(event, LEFT_ARROW) ||
                            (this._rtl?.rtl.value && KeyUtil.isKeyCode(event, RIGHT_ARROW))) &&
                        event.shiftKey &&
                        this._headerCellFocused
                    ) {
                        this._tableColumnResizeService._processResize(-32);
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    } else if (
                        (KeyUtil.isKeyCode(event, RIGHT_ARROW) ||
                            (this._rtl?.rtl.value && KeyUtil.isKeyCode(event, LEFT_ARROW))) &&
                        event.shiftKey &&
                        this._headerCellFocused
                    ) {
                        this._tableColumnResizeService._processResize(32);
                        event.preventDefault();
                        event.stopImmediatePropagation();
                    }
                });

            fromEvent(this._elmRef.nativeElement, 'focusin')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    if (!this._focusinTimerId) {
                        return;
                    }
                    clearTimeout(this._focusinTimerId);
                    this._focusinTimerId = null;
                });

            fromEvent(this._elmRef.nativeElement, 'focusout')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    this._focusinTimerId = setTimeout(() => {
                        this.focusedCellPosition = null;
                    });
                });
        });

        this._tableRowService.cellFocused$.subscribe((evt) => {
            this._onCellFocused(evt);
        });
    }

    /** @hidden */
    private _onCellFocused(position: FocusableItemPosition): void {
        this.focusedCellPosition = { rowIndex: position.rowIndex, colIndex: position.colIndex };
    }
}
