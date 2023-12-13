import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, NgZone, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FocusableCellPosition,
    FocusableItemPosition,
    KeyUtil,
    Nullable,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import { fromEvent } from 'rxjs';
import { TableColumnResizeService } from '../services/table-column-resize.service';
import { TableRowService } from '../services/table-row.service';

@Directive({
    selector: '[fdpTableHeaderResizer]',
    standalone: true
})
export class TableHeaderResizerDirective implements OnInit {
    /** @ignore */
    focusedCellPosition: Nullable<FocusableCellPosition>;

    /** @ignore */
    private readonly _destroyRef = inject(DestroyRef);

    /** @ignore */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @ignore */
    private readonly _elmRef = inject(ElementRef);

    /** @ignore */
    private readonly _tableColumnResizeService = inject(TableColumnResizeService);

    /** @ignore */
    private readonly _tableRowService = inject(TableRowService);

    /** @ignore */
    private readonly _zone = inject(NgZone);

    /** @ignore */
    private readonly _document = inject(DOCUMENT);

    /** @ignore */
    private _focusinTimerId: any;

    /** @ignore */
    private get _headerCellFocused(): boolean {
        return this._document.activeElement?.tagName.toLowerCase() === 'th';
    }
    /** @ignore */
    ngOnInit(): void {
        this._zone.runOutsideAngular(() => {
            fromEvent<KeyboardEvent>(this._elmRef.nativeElement, 'keydown')
                .pipe(takeUntilDestroyed(this._destroyRef))
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
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    if (!this._focusinTimerId) {
                        return;
                    }
                    clearTimeout(this._focusinTimerId);
                    this._focusinTimerId = null;
                });

            fromEvent(this._elmRef.nativeElement, 'focusout')
                .pipe(takeUntilDestroyed(this._destroyRef))
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

    /** @ignore */
    private _onCellFocused(position: FocusableItemPosition): void {
        this.focusedCellPosition = { rowIndex: position.rowIndex, colIndex: position.colIndex };
    }
}
