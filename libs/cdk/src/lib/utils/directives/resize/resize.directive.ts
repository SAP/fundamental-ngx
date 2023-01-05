import {
    AfterContentInit,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SimpleChanges
} from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { filter, map, mapTo, pairwise, takeUntil, tap } from 'rxjs/operators';
import { RtlService } from '../../services/rtl.service';

interface ResizeMove {
    x: number;
    y: number;
}

@Directive({
    selector: '[fdkResize], [fdResize], [fd-resize-handle]',
    standalone: true
})
export class ResizeDirective implements OnChanges, AfterContentInit, OnDestroy {
    /** Element limiting resizable container growth */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdResizeBoundary') resizeBoundary: string | HTMLElement = 'body';

    /** Whether resizable behaviour should be disabled */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdResizeDisabled') disabled = false;

    /** Localization of resize handle inside resizable container */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdResizeHandleLocation') resizeHandleLocation: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' =
        'bottom-right';

    /** Resize handle reference - should be used if Resize handle is not a ContentChild of resizable container */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdResizeResizeHandleRef') set setResizeHandleReference(value: ResizeHandleDirective) {
        this.resizeHandleReference = value;
    }

    /** Emits event when resizing has tarted */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onResizeStart = new EventEmitter<void>();

    /** Emits event when resizing has ended */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onResizeEnd = new EventEmitter<void>();

    /** @hidden Reference to Resize handle */
    @ContentChild(ResizeHandleDirective, { static: false }) resizeHandleReference;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, @Optional() private _rtlService: RtlService) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['disabled']) {
            if (changes['disabled'].previousValue === false && changes['disabled'].currentValue === true) {
                this._subscriptions.unsubscribe();
            } else if (changes['disabled'].previousValue === true && changes['disabled'].currentValue === false) {
                this._setResizeListeners();
            }
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        if (this._rtlService) {
            this._subscriptions.add(this._rtlService.rtl.subscribe((isRtl) => (this._isRtl = isRtl)));
        }

        if (!this.disabled) {
            this._setResizeListeners();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private get _direction(): number {
        return this._isRtl ? -1 : 1;
    }

    /** @hidden Sets Resize listeners */
    private _setResizeListeners(): void {
        const resize = this._getResizeFunction();
        const moveOffset = this._getMoveOffsetFunction();
        const resizeContainer = this._findResizeContainer();
        if (!resizeContainer) {
            return;
        }
        const isBoundaryOverflow = this._getBoundaryOverflowFunction(resizeContainer);

        const mouseUpEvent$ = fromEvent<MouseEvent>(window, 'mouseup');
        const mouseMoveEvent$ = fromEvent<MouseEvent>(resizeContainer, 'mousemove');
        const mouseDownEvent$ = fromEvent<MouseEvent>(this.resizeHandleReference.elementRef.nativeElement, 'mousedown');

        const resizeActive$ = merge(mouseDownEvent$.pipe(mapTo(true)), mouseUpEvent$.pipe(mapTo(false)));
        const emitResizableEvents$ = this._getResizeEventsNotifiers(resizeActive$);
        const preventOtherPointerEvents$ = this._blockOtherPointerEvents(resizeActive$);

        const resizingCursorMovement$ = mouseMoveEvent$.pipe(
            pairwise(),
            map(([event1, event2]: [MouseEvent, MouseEvent]) => moveOffset(event1, event2)),
            filter((move) => isBoundaryOverflow(move))
        );

        const setupResizer = (): void => {
            resizingCursorMovement$.pipe(takeUntil(mouseUpEvent$)).subscribe((event) => resize(event));
        };
        const setupResize$ = resizeActive$.pipe(
            filter((isActive) => isActive),
            tap(() => setupResizer())
        );

        this._subscriptions.add(setupResize$.subscribe());
        this._subscriptions.add(emitResizableEvents$.subscribe());
        this._subscriptions.add(preventOtherPointerEvents$.subscribe());
    }

    /** @hidden Creates resize function*/
    private _getResizeFunction(): (move: ResizeMove) => void {
        return (move: ResizeMove) => {
            this._elementRef.nativeElement.style.width = `${this._elementRef.nativeElement.offsetWidth + move.x}px`;
            this._elementRef.nativeElement.style.height = `${this._elementRef.nativeElement.offsetHeight + move.y}px`;
        };
    }

    /** @hidden Creates move function */
    private _getMoveOffsetFunction(): (event1: MouseEvent, event2: MouseEvent) => ResizeMove {
        let verticalModifier: 1 | -1;
        let horizontalModifier: 1 | -1;

        switch (this.resizeHandleLocation) {
            case 'top-left':
                horizontalModifier = -1;
                verticalModifier = -1;
                break;
            case 'top-right':
                horizontalModifier = -1;
                verticalModifier = 1;
                break;
            case 'bottom-left':
                horizontalModifier = 1;
                verticalModifier = -1;
                break;
            case 'bottom-right':
                horizontalModifier = 1;
                verticalModifier = 1;
                break;
        }

        return (event1: MouseEvent, event2: MouseEvent) => {
            const x = (event2.screenX - event1.screenX) * this._direction;
            const y = event2.screenY - event1.screenY;

            return {
                x: x * verticalModifier,
                y: y * horizontalModifier
            };
        };
    }

    /** @hidden Return boundary container */
    private _findResizeContainer(): Element | null {
        let resizeContainer: Element | null;
        if (typeof this.resizeBoundary === 'string') {
            resizeContainer = this._elementRef.nativeElement.closest(this.resizeBoundary);
        } else {
            resizeContainer = this.resizeBoundary;
        }

        if (resizeContainer) {
            return resizeContainer;
        } else {
            console.warn(`fdResize - Cannot find "${this.resizeBoundary}", falling back to "body"`);
            return document.querySelector('body');
        }
    }

    /** @hidden Check whether resizable container is overflowing boundary container */
    private _getBoundaryOverflowFunction(resizeContainer: Element): (move: ResizeMove) => boolean {
        return (move: ResizeMove) => {
            const containerPosition = resizeContainer.getBoundingClientRect();
            const elementPosition = this._elementRef.nativeElement.getBoundingClientRect();

            switch (this.resizeHandleLocation) {
                case 'top-left':
                    return (
                        containerPosition.top < elementPosition.top + move.y &&
                        containerPosition.left < elementPosition.left + move.x
                    );
                case 'top-right':
                    return (
                        containerPosition.top < elementPosition.top + move.y &&
                        containerPosition.right > elementPosition.right + move.x
                    );
                case 'bottom-left':
                    return (
                        containerPosition.bottom > elementPosition.bottom + move.y &&
                        containerPosition.left < elementPosition.left + move.x
                    );
                case 'bottom-right':
                    return (
                        containerPosition.bottom > elementPosition.bottom + move.y &&
                        containerPosition.right > elementPosition.right + move.x
                    );
            }
        };
    }

    /** @hidden Create Observable notifying on resize actions */
    private _getResizeEventsNotifiers(trigger$: Observable<boolean>): Observable<any> {
        const emitResizableStart$ = trigger$.pipe(
            filter((isActive) => isActive),
            tap(() => this.onResizeStart.emit())
        );

        const emitResizableEnd$ = trigger$.pipe(
            filter((isActive) => !isActive),
            tap(() => this.onResizeEnd.emit())
        );

        return merge(emitResizableStart$, emitResizableEnd$);
    }

    /** @hidden Block resizable container pointer events when resizing  */
    private _blockOtherPointerEvents(trigger$: Observable<boolean>): Observable<any> {
        return trigger$.pipe(
            map((isActive) => (isActive ? 'none' : 'auto')),
            tap((value) => (this._elementRef.nativeElement.style.pointerEvents = value))
        );
    }
}
