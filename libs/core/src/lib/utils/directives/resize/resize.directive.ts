import {
    AfterContentInit,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { filter, map, mapTo, tap, withLatestFrom } from 'rxjs/operators';

interface ResizeMove {
    x: number;
    y: number;
}

@Directive({
    selector: '[fdResize], [fd-resize-handle]'
})
export class ResizeDirective implements AfterContentInit, OnDestroy {
    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeBoundary') resizeBoundary = 'body';

    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeHandleLocation') resizeHandleLocation: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';

    // tslint:disable-next-line:no-input-rename
    @Input('fdResizeResizeHandleRef') set setResizeHandleReference(value: ResizeHandleDirective) {
        this.resizeHandleReference = value;
    };

    @Output() onResizeStart = new EventEmitter<void>();

    @Output() onResizeEnd = new EventEmitter<void>();

    @ContentChild(ResizeHandleDirective, {static: false}) resizeHandleReference;

    private _subscriptions = new Subscription();

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterContentInit() {
        this._setResizeListeners();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }

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

        const resizingCursorPosition$ = mouseMoveEvent$.pipe(
            withLatestFrom(resizeActive$),
            filter(([_, isActive]: [MouseEvent, boolean]) => isActive),
            map(([event, _]) => moveOffset(event)),
            filter(move => isBoundaryOverflow(move))
        );

        this._subscriptions.add(resizingCursorPosition$.subscribe(event => resize(event)));
        this._subscriptions.add(preventOtherPointerEvents$.subscribe());
        this._subscriptions.add(emitResizableEvents$.subscribe());
    }

    private _getResizeFunction(): (move: ResizeMove) => void {
        return (move: ResizeMove) => {
            this._elementRef.nativeElement.style.width = this._elementRef.nativeElement.offsetWidth + move.x + 'px';
            this._elementRef.nativeElement.style.height = this._elementRef.nativeElement.offsetHeight + move.y + 'px';
        }
    }

    private _getMoveOffsetFunction(): (event: MouseEvent) => ResizeMove {

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

        return (event: MouseEvent) => ({
            x: event.movementX * verticalModifier,
            y: event.movementY * horizontalModifier
        })
    }

    private _findResizeContainer(): Element {
        const resizeContainer = document.querySelector(this.resizeBoundary);
        if (resizeContainer) {
            return resizeContainer;
        } else {
            console.warn(`Cannot find "${this.resizeBoundary}", falling back to "body"`);
            return document.querySelector('body')
        }
    }

    private _getBoundaryOverflowFunction(resizeContainer: Element): (move: ResizeMove) => boolean {
        return (move: ResizeMove) => {
            const containerPosition = resizeContainer.getBoundingClientRect();
            const elementPosition = this._elementRef.nativeElement.getBoundingClientRect();

            switch (this.resizeHandleLocation) {
                case 'top-left':
                    return containerPosition.top < elementPosition.top + move.y
                        && containerPosition.left < elementPosition.left + move.x;
                case 'top-right':
                    return containerPosition.top < elementPosition.top + move.y
                        && containerPosition.right > elementPosition.right + move.x;
                case 'bottom-left':
                    return containerPosition.bottom > elementPosition.bottom + move.y
                        && containerPosition.left < elementPosition.left + move.x;
                case 'bottom-right':
                    return containerPosition.bottom > elementPosition.bottom + move.y
                        && containerPosition.right > elementPosition.right + move.x;
            }
        }
    }

    private _getResizeEventsNotifiers(trigger$: Observable<boolean>): Observable<any> {
        const emitResizableStart$ = trigger$.pipe(
            filter(isActive => isActive),
            tap(_ => this.onResizeStart.emit())
        );

        const emitResizableEnd$ = trigger$.pipe(
            filter(isActive => !isActive),
            tap(_ => this.onResizeEnd.emit())
        );

        return merge(emitResizableStart$, emitResizableEnd$);
    }

    private _blockOtherPointerEvents(trigger$: Observable<boolean>): Observable<any> {
        return trigger$.pipe(
            map(isActive => isActive ? 'none' : 'auto'),
            tap(value => this._elementRef.nativeElement.style.pointerEvents = value)
        );
    }
}
