import { Observable, Subject } from 'rxjs';
import { Directive, NgZone } from '@angular/core';
import { isFakeMousedownFromScreenReader, isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Point } from '../CDK-12-dnd/drag-ref';

/**
 * Time in milliseconds for which to ignore mouse events, after
 * receiving a touch event. Used to avoid doing double work for
 * touch devices where the browser fires fake mouse events, in
 * addition to touch events.
 */
const MOUSE_EVENT_IGNORE_TIME = 800;

@Directive()
export class DndRef {

    onStartHandler = this._onStart.bind(this);
    onMoveHandler = this._onMove.bind(this);
    onEndHandler = this._onEnd.bind(this);

    get start$(): Observable<any> {
        return this._start$$.asObservable();
    }

    get move$(): Observable<any> {
        return this._move$$.asObservable();
    }

    get end$(): Observable<any> {
        return this._end$$.asObservable();
    }
    /**
     * Amount of milliseconds to wait after the user has put their
     * pointer down before starting to drag the element.
     */
    private _start$$: Subject<any> = new Subject<any>();
    private _move$$: Subject<any> = new Subject<any>();
    private _end$$: Subject<any> = new Subject<any>();

    private _isDragging = false;
    /**
     * Time at which the last touch event occurred. Used to avoid firing the same
     * events multiple times on touch devices where the browser will fire a fake
     * mouse event for each touch event, after a certain time.
     */
    private _lastTouchEventTime: number;

    /** Time at which the last dragging sequence was started. */
    private _dragStartTime: number;

    constructor(
        private _el: HTMLElement,
        private _ngZone: NgZone
    ) {
        this._init();
    }

    private _init(): void {
        this._ngZone.runOutsideAngular(() => {
            this._el.addEventListener('mousedown', this.onStartHandler);
            this._el.addEventListener('touchstart', this.onStartHandler);
        });
    }

    private _onStart(event: MouseEvent | TouchEvent): void {
        this._initializeDragSequence(this._el, event);
        this._start$$.next();
    }

    private _onMove(event: MouseEvent | TouchEvent): void {
    }

    private _onEnd(): void {
    }

    private _initializeDragSequence(referenceElement: HTMLElement, event: MouseEvent | TouchEvent): void {
        const isTouchSequence = isTouchEvent(event);
        const isAuxiliaryMouseButton = !isTouchSequence && (event as MouseEvent).button !== 0;
        const isSyntheticEvent = !isTouchSequence && this._lastTouchEventTime &&
            this._lastTouchEventTime + MOUSE_EVENT_IGNORE_TIME > Date.now();
        const isFakeEvent = isTouchSequence
            ? isFakeTouchstartFromScreenReader(event as TouchEvent)
            : isFakeMousedownFromScreenReader(event as MouseEvent);


        // Abort if the user is already dragging or is using a mouse button other than the primary one.
        if (this._isDragging || isAuxiliaryMouseButton || isSyntheticEvent || isFakeEvent) {
            return;
        }

        // ToDo: Remove subscription and add new ones
        this._dragStartTime = Date.now();
    }
}

/** Determines whether an event is a touch event. */
function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    // This function is called for every pixel that the user has dragged so we need it to be
    // as fast as possible. Since we only bind mouse events and touch events, we can assume
    // that if the event's name starts with `t`, it's a touch event.
    return event.type[0] === 't';
}

function _getEventTarget<T extends EventTarget>(event: Event): T | null {
    // If an event is bound outside the Shadow DOM, the `event.target` will
    // point to the shadow root so we have to use `composedPath` instead.
    return (event.composedPath ? event.composedPath()[0] : event.target) as T | null;
}

/** Clamps a value between a minimum and a maximum. */
function clamp(value: number, min: number, max: number): any {
    return Math.max(min, Math.min(max, value));
}
