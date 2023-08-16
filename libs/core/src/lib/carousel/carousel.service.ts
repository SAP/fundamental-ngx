import { ElementRef, EventEmitter, Inject, OnDestroy, QueryList, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export const DEFAULT_TRANSITION_DURATION = '150ms';

export interface CarouselItemInterface {
    element: HTMLElement;
    getHeight(): number;
    getWidth(): number;
}

export interface CarouselConfig {
    /** Defines if carousel items are placed vertically */
    vertical?: boolean;
    /** Amount of visible elements in carousel */
    elementsAtOnce?: number;
    /** Defines if support for gestures, like touch swipe or mouse drag should be enabled */
    gestureSupport?: boolean;
    /** Defines if carousel should move elements to sides. It allows to slide infinitely in one direction */
    infinite?: boolean;
    /** Transition time of CSS translate, `150ms` by default */
    transition?: string;
}

export interface PanEndOutput {
    item: CarouselItemInterface;
    after: boolean;
}

/** @dynamic */
@Injectable({
    providedIn: 'root'
})
export class CarouselService implements OnDestroy {
    /** Event thrown when element is dragged. Emits "true" when drag starts and "false" when drag ends. */
    readonly dragStateChange$: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown, when active element is changed */
    readonly activeChange$: EventEmitter<PanEndOutput> = new EventEmitter<PanEndOutput>();

    /** Configuration for carousel */
    config: CarouselConfig;

    /** Initial active item of carousel, position first + offset */
    active: Nullable<CarouselItemInterface>;

    /** Set to true for rtl mode */
    isRtl = false;

    /** carousel items query list */
    items: QueryList<CarouselItemInterface>;

    /** Current transition value in px */
    set currentTransitionPx(currentTransitionPx: number) {
        this._currentTransitionPx = currentTransitionPx;
    }
    get currentTransitionPx(): number {
        return this._currentTransitionPx;
    }

    /** @hidden */
    private get elementsAtOnce(): number {
        const num = this.config?.elementsAtOnce ?? 1;

        return Math.max(1, num);
    }

    /** @hidden */
    private _lastDistance = 0;

    /** @hidden */
    private _currentTransitionPx = 0;

    /** @hidden */
    private _element: HTMLElement;

    /** @hidden */
    private _initialDragPosition = 0;

    /** @hidden */
    private _lastDragPosition = 0;

    /** @hidden */
    private _listenToMouseMove = false;
    /** @hidden */
    private _dragStarted = false;

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(@Inject(DOCUMENT) private readonly _document: Document | null) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();

        this.activeChange$.complete();
        this.dragStateChange$.complete();
    }

    /** set initial values for the service */
    initialise(
        config: CarouselConfig,
        items: QueryList<CarouselItemInterface>,
        listElementReference: ElementRef
    ): void {
        this.config = config;
        this.setElement(listElementReference);
        this.setItems(items);

        if (this.config.gestureSupport) {
            this._setupGestures();
        }
    }

    /** update config value for the service */
    updateConfig(config: CarouselConfig): void {
        this.config = config;
    }

    /** set element ref */
    setElement(elementRef: ElementRef): void {
        this._element = elementRef.nativeElement;
    }

    /** set items and assign active item, if not already there */
    setItems(items: QueryList<CarouselItemInterface>): void {
        this.items = items;

        if (!this.active) {
            this.active = this.items.first;
        }
    }

    /** Change active element */
    goToItem(item: CarouselItemInterface, smooth?: boolean): void {
        let index = this._getIndexOfItem(item);
        if (this.config.infinite) {
            this._centerActive(index);

            index = this._getIndexOfItem(item);
        }

        this._transitionToIndex(index, smooth);
    }

    /** pick next element and set it active */
    pickNext(): void {
        if (!this.active) {
            this.active = this.items.first;
        }

        const activeItemIndex = this._getIndexOfItem(this.active);
        const itemToActivate = this.items.get(activeItemIndex + 1) ?? this.items.first;

        this.goToItem(itemToActivate, true);
        this.active = itemToActivate;
    }

    /** pick previous element and set it active */
    pickPrevious(): void {
        if (!this.active) {
            this.active = this.items.get(2);
        }

        const activeItemIndex = this._getIndexOfItem(this.active);
        let itemToActivate = this.items.get(activeItemIndex - 1);

        // case where slides can move infinitely in one direction
        // handle case where on-load activeItemIndex = 0 and activeItemIndex - 1 returns undefined item from item array.
        if (!itemToActivate) {
            itemToActivate = this.items.last;
        }

        this.goToItem(itemToActivate, true);
        this.active = itemToActivate;
    }

    /** @hidden */
    private _centerActive(index: number): void {
        const size = this._getSize(this.items.first);
        if (isNaN(size)) {
            return;
        }
        const middleIndex = Math.ceil(this.items.length / 2);
        const offset = Math.ceil(this.elementsAtOnce / 2);
        const missingItems = index + offset - middleIndex;
        const array = this.items.toArray();

        if (missingItems > 0) {
            for (let i = 0; i < missingItems; i++) {
                const item = array.shift();
                item && array.push(item);
            }
        } else {
            for (let i = 0; i < Math.abs(missingItems); i++) {
                const item = array.pop();
                item && array.unshift(item);
            }
        }

        /** Changing order of elements in QueryList and Native HTML */
        this.items.reset(array);
        this.items.forEach((item) => item.element.parentNode?.appendChild(item.element));

        /**
         * For proper animation it's needed to transform elements,
         * by changing transition by amount of elements placed at top/bottom
         */
        this._element.style.transitionDuration = '0s';
        this._transitionCarousel(this._currentTransitionPx + this._getSize(this.items.first) * missingItems);
    }

    /** @hidden */
    private _transitionToIndex(index: number, smooth?: boolean): void {
        let transitionPx: number = this._getSize(this.items.first) * index;

        this._element.style.transitionDuration = smooth ? this._getTransition() : '0s';

        if (!this.isRtl || (this.config.vertical && this.isRtl)) {
            transitionPx = -transitionPx;
        }

        this._transitionCarousel(transitionPx);
    }

    /** @hidden Get closes element, based on current transition */
    private _getClosest(): CarouselItemInterface {
        /** If transition is positive, it should go to first element */
        if (
            !this.config.infinite &&
            ((!this.config.vertical &&
                ((!this.isRtl && this._currentTransitionPx > 0) || (this.isRtl && this._currentTransitionPx < 0))) ||
                (this.config.vertical && this._currentTransitionPx > 0))
        ) {
            return this.items.first;
        }

        const size = this._getSize(this.items.first);

        /** When scroll is after half of element, then ext one should be active */
        const halfApproached: boolean = Math.abs(this._currentTransitionPx % size) > size / 2;
        /**
         * Index based on transition px divided by size of elements,
         * every element should have same width, otherwise it should be looped through all elements,
         * which is not good for performance
         */
        let index = Math.ceil(Math.abs(this._currentTransitionPx / size));

        // When elementsAtOnce > 1, swiping should stop at last index - elementsAtOnce
        const elementsAtOnce = this.elementsAtOnce;
        if (!this.config.infinite && elementsAtOnce > 1) {
            // When there're less items in the carousel than the area might display, it should stop to first
            if (this.items.length < elementsAtOnce) {
                return this.items.first;
            }

            if (index + elementsAtOnce >= this.items.length) {
                return this.items.get(this.items.length - elementsAtOnce) ?? this.items.first;
            }
        }

        index = index + (halfApproached ? 0 : -1);
        const item = this.items.get(index);

        /** Checking if transition went out of scope of array */
        return item || this.items.last;
    }

    /** @hidden */
    private _getIndexOfItem(item?: CarouselItemInterface): number {
        if (!item) {
            return -1;
        }
        return this.items.toArray().findIndex((_item) => _item === item);
    }

    /** @hidden Getting size of carousel, width for horizontal, height for vertical */
    private _getSize(item: CarouselItemInterface): number {
        if (this.config.vertical) {
            return item.getHeight();
        }

        return item.getWidth();
    }

    /** @hidden */
    private _handlePan(delta: number): void {
        const distance = delta - this._lastDistance;

        this._lastDistance = delta;

        this._transitionCarousel(this._currentTransitionPx + distance);
    }

    /** @hidden */
    private _handlePanEnd(delta: number): void {
        this._handlePan(delta);

        const closestItem: CarouselItemInterface = this._getClosest();

        this.goToItem(closestItem, true);

        if (!this.active) {
            this.active = closestItem;
            this.activeChange$.emit({
                item: closestItem,
                after: delta < 0
            });
        } else if (this.active !== closestItem) {
            this.active = closestItem;
            this.activeChange$.emit({
                item: closestItem,
                after: delta < 0
            });
        }

        this.dragStateChange$.emit(false);
        this._lastDistance = 0;
    }

    /**
     * @hidden Animates the carousel to the currently selected slide.
     */
    private _transitionCarousel(transitionPx: number): void {
        this._currentTransitionPx = transitionPx;
        const axis = this.config.vertical ? 'Y' : 'X';

        this._element.style.transform = `translate${axis}(${this._currentTransitionPx}px)`;
    }

    /** @hidden Pam Start handler, removes transition duration, */
    private _handlePanStart(): void {
        this._element.style.transitionDuration = '0s';
        this.dragStateChange$.emit(true);
    }

    /** @hidden */
    private _setupGestures(): void {
        this._setupDragStart();
        this._setupDrag();
        this._setupDragEnd();
    }

    /** @hidden */
    private _subscribeToEvents(
        events: string[],
        element: HTMLElement | Document,
        callback: (event: MouseEvent | TouchEvent) => void
    ): void {
        merge(events.map((e) => fromEvent<MouseEvent | TouchEvent>(element, e, { passive: true }))).forEach(
            (evt: Observable<MouseEvent | TouchEvent>) => {
                evt.pipe(takeUntil(this._onDestroy$)).subscribe((event) => {
                    callback(event);
                });
            }
        );
    }

    /** @hidden */
    private _setupDragStart(): void {
        const events = ['mousedown', 'touchstart'];

        this._subscribeToEvents(events, this._element, (event) => {
            this._listenToMouseMove = true;
            this._lastDragPosition = this._initialDragPosition = this._getDragCoordinate(event);
            this._handlePanStart();
        });
    }

    /** @hidden */
    private _setupDrag(): void {
        const events = ['mousemove', 'touchmove'];

        if (!this._document) {
            throw new Error(
                `Could not setup drag event subscription. Expected to get document ref, got ${this._document} instead`
            );
        }

        this._subscribeToEvents(events, this._document, (event) => {
            const coordinate = this._getDragCoordinate(event);

            if (!this._listenToMouseMove || coordinate === this._lastDragPosition) {
                return;
            }

            this._dragStarted = true;
            this._handlePan(this._getDraggedDelta(coordinate));
        });
    }

    /** @hidden */
    private _setupDragEnd(): void {
        const events = ['mouseup', 'touchend'];

        if (!this._document) {
            throw new Error(
                `Could not setup drag event subscription. Expected to get document ref, got ${this._document} instead`
            );
        }

        this._subscribeToEvents(events, this._document, (event) => {
            if (!this._listenToMouseMove) {
                return;
            }

            if (this._dragStarted) {
                this._handlePanEnd(this._getDraggedDelta(this._getDragCoordinate(event)));
            } else {
                this.dragStateChange$.emit(false);
            }

            this._listenToMouseMove = false;
            this._dragStarted = false;
        });
    }

    /** @hidden */
    private _getTransition(): string {
        return this.config?.transition ?? DEFAULT_TRANSITION_DURATION;
    }

    /** @hidden */
    private _getDraggedDelta(offset: number): number {
        this._lastDragPosition = offset;

        return offset - this._initialDragPosition;
    }

    /** @hidden */
    private _getDragCoordinate(event: MouseEvent | TouchEvent): number {
        let coordinates: Touch | MouseEvent;

        if (this._isTouchEvent(event)) {
            coordinates = event.touches[0] || event.changedTouches[0];
        } else {
            coordinates = event;
        }

        return this.config.vertical ? coordinates.pageY : coordinates.pageX;
    }

    /** @hidden */
    private _isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
        return window.TouchEvent && event instanceof TouchEvent;
    }
}
