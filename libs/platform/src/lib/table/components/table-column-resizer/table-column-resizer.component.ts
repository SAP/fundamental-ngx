import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    HostListener,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core/utils';

import { TableColumnResizeService } from '../../table-column-resize.service';

/** @dynamic */
@Component({
    selector: `fdp-table-column-resizer`,
    template: `<div class="fdp-table__resizer-inner"></div>`,
    styleUrls: ['./table-column-resizer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-table-column-resizer'
    }
})
export class PlatformTableColumnResizerComponent implements OnInit, OnDestroy {
    /** @hidden */
    @HostBinding('style.display')
    get _resizerDisplay(): string {
        return this._resizerPosition > 0 ? 'block' : 'none';
    }

    /** @hidden */
    @HostBinding('style.left')
    get _resizerPositionLeft(): string {
        if (this._rtl || !this._resizerPosition) {
            return 'auto';
        }

        return this._resizerPosition + 'px';
    }

    /** @hidden */
    @HostBinding('style.right')
    get _resizerPositionRight(): string {
        if (!this._rtl || !this._resizerPosition) {
            return 'auto';
        }

        return this._resizerPosition + 'px';
    }

    /** @hidden */
    @HostBinding('class.fdp-table-column-resizer--active')
    get _isActive(): boolean {
        return this._tableColumnResizeService.resizeInProgress;
    }

    /** @hidden */
    private get _resizerPosition(): number {
        return this._tableColumnResizeService.resizerPosition;
    }

    /** @hidden */
    private _pointerMoveListener: Subscription;

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    private get _rtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _ngZone: NgZone,
        private readonly _tableColumnResizeService: TableColumnResizeService,
        @Inject(DOCUMENT) private readonly _document: Document | null,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._tableColumnResizeService.markForCheck
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._cd.markForCheck());
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @hidden */
    @HostListener('mousedown', ['$event'])
    _onMouseDown(event: MouseEvent): void {
        this._tableColumnResizeService.startResize(event);

        this._listenForMouseUp();
    }

    /** @hidden */
    private _listenForMouseUp(): void {
        this._pointerMoveListener?.unsubscribe();

        if (!this._document) {
            return;
        }

        this._pointerMoveListener = fromEvent<MouseEvent>(this._document, 'mouseup')
            .pipe(take(1), takeUntil(this._destroyed))
            .subscribe((event) => {
                this._tableColumnResizeService.finishResize(event);
                this._cd.markForCheck();
            });
    }
}
