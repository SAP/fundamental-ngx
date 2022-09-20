import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject, throttleTime } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { KeyUtil } from '@fundamental-ngx/core/utils';

import {
    SplitterPaneContainerOrientation,
    SplitterPaneContainerOrientationType
} from '../splitter-pane-container/splitter-pane-orientation.enum';

/** @dynamic */
@Component({
    selector: 'fd-splitter-resizer',
    templateUrl: './splitter-resizer.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-splitter__resizer',
        '[class.is-active]': '_start != null || _isInFocus',
        '[tabindex]': '0'
    }
})
export class SplitterResizerComponent implements OnDestroy {
    /** Orientation of the splitter's host pane container. */
    @Input()
    orientation: SplitterPaneContainerOrientationType = SplitterPaneContainerOrientation.vertical;

    /** Event emitted after resizing has started. */
    @Output()
    startResize = new EventEmitter<void>();

    /** Event emitted after resizing has ended. */
    @Output()
    endResize = new EventEmitter<void>();

    /** Event emitted while resizing. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    resize = new EventEmitter<number>();

    /** @hidden */
    _start: number | null = null;

    /** @hidden */
    _isInFocus = false;

    /** @hidden */
    @HostBinding('attr.role')
    get _role(): string {
        return 'separator';
    }

    /** @hidden */
    @HostBinding('attr.aria-orientation')
    get _ariaOrientation(): string {
        return this.orientation;
    }

    /** @hidden */
    get _isHorizontal(): boolean {
        return this.orientation === SplitterPaneContainerOrientation.horizontal;
    }

    /** @hidden */
    get _isVertical(): boolean {
        return this.orientation === SplitterPaneContainerOrientation.vertical;
    }

    /** @hidden */
    private _prevDiff = 0;

    /** @hidden */
    private _pointerMoveListener = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<Element>,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _ngZone: NgZone,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null
    ) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._unsubscribe();
    }

    /** @hidden */
    @HostListener('mousedown', ['$event'])
    _onMouseDown(event: MouseEvent): void {
        event.preventDefault();

        this._start = this._isHorizontal ? event.clientY : event.clientX;

        this.startResize.emit();

        this._listenToPointerMove();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            event.preventDefault();

            let diff: number | undefined;

            if (this._isHorizontal) {
                this._start = this._elementRef.nativeElement.getBoundingClientRect().left;

                if (KeyUtil.isKeyCode(event, [UP_ARROW])) {
                    diff = this._start - 1;
                }

                if (KeyUtil.isKeyCode(event, [DOWN_ARROW])) {
                    diff = this._start + 1;
                }
            }

            if (this._isVertical) {
                this._start = this._elementRef.nativeElement.getBoundingClientRect().top;

                if (KeyUtil.isKeyCode(event, [LEFT_ARROW])) {
                    diff = this._start - 1;
                }

                if (KeyUtil.isKeyCode(event, [RIGHT_ARROW])) {
                    diff = this._start + 1;
                }
            }

            if (diff !== undefined) {
                this.startResize.emit();
                this._emitResize(diff);
                this.endResize.emit();
            }

            this._unsubscribe(false);
        }
    }

    /** @hidden */
    @HostListener('focus')
    _onFocus(): void {
        this._isInFocus = true;

        this._cdr.markForCheck();
    }

    /** @hidden */
    @HostListener('focusout')
    _onBlur(): void {
        this._isInFocus = false;

        this._cdr.markForCheck();
    }

    /** @hidden */
    private _listenToPointerMove(): void {
        this._pointerMoveListener = new Subject<void>();

        if (!this._document) {
            return;
        }

        this._ngZone.runOutsideAngular(() => {
            fromEvent<MouseEvent>(this._document!, 'mousemove')
                .pipe(throttleTime(10), takeUntil(this._pointerMoveListener))
                .subscribe((event) => {
                    this._ngZone.run(() => {
                        const newPosition = this._isHorizontal ? event.clientY : event.clientX;

                        this._emitResize(newPosition);
                        this._cdr.markForCheck();
                    });
                });

            fromEvent(this._document!, 'mouseup')
                .pipe(take(1), takeUntil(this._pointerMoveListener))
                .subscribe(() => {
                    this._ngZone.run(() => {
                        this.endResize.emit();
                        this._unsubscribe();
                        this._cdr.markForCheck();
                    });
                });
        });
    }

    /** @hidden */
    private _emitResize(newPosition: number): void {
        const diff = newPosition - (this._start ?? newPosition);

        this.resize.emit(diff - this._prevDiff);

        this._prevDiff = diff;
    }

    /** @hidden */
    private _unsubscribe(removeFocus = true): void {
        this._start = null;
        this._prevDiff = 0;

        this._pointerMoveListener?.next();
        this._pointerMoveListener?.complete();

        if (removeFocus) {
            this._isInFocus = false;

            this._cdr.markForCheck();
        }
    }
}
