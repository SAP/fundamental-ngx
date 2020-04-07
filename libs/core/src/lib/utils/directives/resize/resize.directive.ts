import {
    AfterContentInit,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges
} from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { filter, map, mapTo, pairwise, takeUntil, tap } from 'rxjs/operators';
import { closestElement } from '../../functions/closest-element';

interface ResizeMove {
    x: number;
    y: number;
}

@Directive({
    selector: '[fdResize], [fd-resize-handle]'
})
export class ResizeDirective implements OnChanges, AfterContentInit, OnDestroy {
    /** Element limiting resizable container growth */
    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeBoundary') resizeBoundary = 'body';

    /** Whether resizable behaviour should be disabled */
    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeDisabled') disabled: boolean = false;

    /** Localization of resize handle inside resizable container */
    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeHandleLocation') resizeHandleLocation: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' =
        'bottom-right';

    /** Resize handle reference - should be used if Resize handle is not a ContentChild of resizable container */
    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeResizeHandleRef') set setResizeHandleReference(value: ResizeHandleDirective) {
        this.resizeHandleReference = value;
    }

    /** Emits event when resizing has tarted */
    @Output() onResizeStart = new EventEmitter<void>();

    /** Emits event when resizing has ended */
    @Output() onResizeEnd = new EventEmitter<void>();

    /** @hidden Reference to Resize handle */
    @ContentChild(ResizeHandleDirective, { static: false }) resizeHandleReference;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        if (changes['disabled']) {
            if (changes['disabled'].previousValue === false && changes['disabled'].currentValue === true) {
                this._subscriptions.unsubscribe();
            } else if (changes['disabled'].previousValue === true && changes['disabled'].currentValue === false) {
                this._setResizeListeners();
            }
        }
    }

    /** @hidden */
    ngAfterContentInit() {
        if (!this.disabled) {
            this._setResizeListeners();
        }
    }

    /** @hidden */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

    /** @hidden Sets Resize listeners */
    private _setResizeListeners(): void {
        const resize = this._getResizeFunction();
        const moveOffset = this._getMoveOffsetFunction();
        const resizeContainer = this._findResizeContainer();
        const isBoundaryOverflow = this._getBoundaryOverflowFunction(resizeContainer);

        const mouseUpEvent$ = fromEvent(window, 'mouseup');
        const mouseMoveEvent$ = fromEvent(resizeContainer, 'mousemove');
        const mouseDownEvent$ = fromEvent(this.resizeHandleReference.elementRef.nativeElement, 'mousedown');

        const resizeActive$ = merge(mouseDownEvent$.pipe(mapTo(true)), mouseUpEvent$.pipe(mapTo(false)));
        const emitResizableEvents$ = this._getResizeEventsNotifiers(resizeActive$);
        const preventOtherPointerEvents$ = this._blockOtherPointerEvents(resizeActive$);

        const resizingCursorMovement$ = mouseMoveEvent$.pipe(
            pairwise(),
            map(([event1, event2]: [MouseEvent, MouseEvent]) => moveOffset(event1, event2)),
            filter((move) => isBoundaryOverflow(move))
        );

        const setupResizer = () =>
            resizingCursorMovement$.pipe(takeUntil(mouseUpEvent$)).subscribe((event) => resize(event));

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

        return (event1: MouseEvent, event2: MouseEvent) => ({
            x: (event2.screenX - event1.screenX) * verticalModifier,
            y: (event2.screenY - event1.screenY) * horizontalModifier
        });
    }

    /** @hidden Return boundary container */
    private _findResizeContainer(): Element {
        const resizeContainer = closestElement(this.resizeBoundary, this._elementRef.nativeElement);
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
            tap((_) => this.onResizeStart.emit())
        );

        const emitResizableEnd$ = trigger$.pipe(
            filter((isActive) => !isActive),
            tap((_) => this.onResizeEnd.emit())
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
