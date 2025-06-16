import {
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    DOCUMENT,
    ElementRef,
    inject,
    Inject,
    NgZone,
    OnInit,
    Optional,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { TableColumnResizeService } from '@fundamental-ngx/platform/table-helpers';
import { fromEvent, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RtlService } from '@fundamental-ngx/cdk/utils';

/** @dynamic */
@Component({
    selector: `fdp-table-column-resizer`,
    template: ` <div class="fdp-table__resizer-inner"></div>`,
    styleUrl: './table-column-resizer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fdp-table-column-resizer'
    },
    standalone: true
})
export class PlatformTableColumnResizerComponent implements OnInit {
    /** @hidden */
    private _pointerMoveListener: Subscription;

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    constructor(
        private readonly _ngZone: NgZone,
        private readonly _tableColumnResizeService: TableColumnResizeService,
        private readonly _renderer: Renderer2,
        private readonly _elmRef: ElementRef,
        @Inject(DOCUMENT) private readonly _document: Document | null,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._ngZone.runOutsideAngular(() => {
            fromEvent<MouseEvent>(this._elmRef.nativeElement, 'mousedown')
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((evt) => {
                    if (evt.button === 0 && !evt.ctrlKey) {
                        this._tableColumnResizeService.startResize(evt);

                        this._listenForMouseUp();
                    }
                });

            this._tableColumnResizeService.resizerPosition$
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((position) => {
                    this._renderer.setStyle(this._elmRef.nativeElement, 'display', position > 0 ? 'block' : 'none');
                    if (!position) {
                        return;
                    }
                    this._renderer.setStyle(
                        this._elmRef.nativeElement,
                        'left',
                        this._rtl$() ? 'auto' : `${position}px`
                    );
                    this._renderer.setStyle(
                        this._elmRef.nativeElement,
                        'right',
                        !this._rtl$() ? 'auto' : `${position}px`
                    );
                });

            this._tableColumnResizeService.resizeInProgress$
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe((resizeInProgress) => {
                    if (resizeInProgress) {
                        this._renderer.addClass(this._elmRef.nativeElement, 'fdp-table-column-resizer--active');
                    } else {
                        this._renderer.removeClass(this._elmRef.nativeElement, 'fdp-table-column-resizer--active');
                    }
                });
        });
    }

    /** @hidden */
    private _listenForMouseUp(): void {
        this._ngZone.runOutsideAngular(() => {
            this._pointerMoveListener?.unsubscribe();

            if (!this._document) {
                return;
            }
            this._pointerMoveListener = fromEvent<MouseEvent>(this._document, 'mouseup')
                .pipe(take(1), takeUntilDestroyed(this._destroyRef))
                .subscribe((event) => {
                    this._tableColumnResizeService.finishResize(event);
                    // this._cd.markForCheck();
                });
        });
    }
}
