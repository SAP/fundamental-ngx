import { ElementRef, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import Hammer from 'hammerjs';
import { Injectable } from '@angular/core';

export const DEFAULT_TRANSITION_DURATION = '150ms';

export interface CarouselItemInterface {
    getElement(): any;
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

@Injectable({
    providedIn: 'root'
})
export class CarouselService implements OnDestroy {
    /** Configuration for carousel */
    config: CarouselConfig;

    /** Initial active item of carousel, position first + offset */
    active: CarouselItemInterface;

    /** Event thrown when element is dragged. Emits "true" when drag starts and "false" when drag ends. */
    readonly dragStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown, when active element is changed */
    readonly activeChange: EventEmitter<PanEndOutput> = new EventEmitter<PanEndOutput>();

    /** @hidden */
    private _hammer: HammerManager = null;

    /** @hidden */
    private _previousActiveItem: CarouselItemInterface;

    /** @hidden */
    private _lastDistance = 0;

    /** @hidden */
    private _prePanTransitionPx = 0;

    /** @hidden */
    private _currentTransitionPx = 0;

    get currentTransitionPx(): number {
        return this._currentTransitionPx;
    }

    set currentTransitionPx(currentTransitionPx: number) {
        this._currentTransitionPx = currentTransitionPx;
    }

    private _elementRef: ElementRef;

    items: QueryList<CarouselItemInterface>;

    /** @hidden */
    ngOnDestroy(): void {
        if (this._hammer) {
            this._hammer.destroy();
        }
    }

    initialise(
        config: CarouselConfig,
        items: QueryList<CarouselItemInterface>,
        listElementReference: ElementRef
    ): void {
        this.config = config;
        this.setElementRef(listElementReference);
        this.setItems(items);

        if (this.config.gestureSupport) {
            this._hammerSetup();
        }
    }

    updateConfig(config: CarouselConfig): void {
        this.config = config;
    }

    setElementRef(elementRef: ElementRef): void {
        this._elementRef = elementRef;
    }

    setItems(items: QueryList<CarouselItemInterface>): void {
        this.items = items;
        const carouselArray: CarouselItemInterface[] = this.items.toArray();
        if (!this.active) {
            this.active = carouselArray[0];
        }
    }

    /** Change active element */
    goToItem(item: CarouselItemInterface, smooth?: boolean, languageDirection: string = 'ltr'): void {
        let index: number = this.getIndexOfItem(item);
        if (this.config.infinite) {
            this._centerActive(index);

            index = this.getIndexOfItem(item);
        }

        this._transitionToIndex(index, smooth, languageDirection);

        this._previousActiveItem = item;
    }

    pickNext(languageDirection = 'ltr'): void {
        const carouselArray: CarouselItemInterface[] = this.items.toArray();
        if (!this.active) {
            this.active = carouselArray[0];
        }
        const activeItemIndex: number = carouselArray.findIndex((item) => item === this.active);

        const itemToActivate = carouselArray[activeItemIndex + 1];
        this.goToItem(itemToActivate, true, languageDirection);
        this.active = itemToActivate;
    }

    pickPrevious(languageDirection = 'ltr'): void {
        const carouselArray: CarouselItemInterface[] = this.items.toArray();
        if (!this.active) {
            this.active = carouselArray[2];
        }
        const activeItemIndex: number = carouselArray.findIndex((item) => item === this.active);
        const itemToActivate = carouselArray[activeItemIndex - 1];
        this.goToItem(itemToActivate, true, languageDirection);
        this.active = itemToActivate;
    }

    /** @hidden */
    private _centerActive(index: number): void {
        const middleIndex = Math.ceil(this.items.length / 2);
        const offset = Math.ceil(this.config.elementsAtOnce / 2);
        const missingItems = index + offset - middleIndex;
        const array = this.items.toArray();

        if (missingItems > 0) {
            for (let i = 0; i < missingItems; i++) {
                array.push(array.shift());
            }
        } else {
            for (let i = 0; i < Math.abs(missingItems); i++) {
                array.unshift(array.pop());
            }
        }

        /** Changing order of elements in QueryList and Native HTML */
        this.items.reset(array);
        this.items.forEach((item) => item.getElement().parentNode.appendChild(item.getElement()));

        /**
         * For proper animation it's needed to transform elements,
         * by changing transition by amount of elements placed at top/bottom
         */
        this._elementRef.nativeElement.style.transitionDuration = '0s';
        this._transitionCarousel(this._currentTransitionPx + this._getSize(this.items.first) * missingItems);
    }

    /** @hidden */
    private _transitionToIndex(index: number, smooth?: boolean, languageDirection?: string): void {
        let transitionPx: number = this._getSize(this.items.first) * index;

        if (smooth) {
            this._elementRef.nativeElement.style.transitionDuration = this._getTransition();
        } else {
            this._elementRef.nativeElement.style.transitionDuration = '0s';
        }

        if (languageDirection === 'ltr' || (this.config.vertical && languageDirection === 'rtl')) {
            transitionPx = -transitionPx;
        }
        this._transitionCarousel(transitionPx);
    }

    /** Get closes element, based on current transition */
    private _getClosest(): CarouselItemInterface {
        /** If transition is positive, it'should go to first element */
        if (!this.config.infinite && this._currentTransitionPx > 0) {
            return this.items.first;
        }

        const size: number = this._getSize(this.items.first);

        /** When scroll is after half of element, then ext one should be active */
        const halfApproached: boolean = Math.abs(this._currentTransitionPx % size) > size / 2;
        /**
         * Index based on transition px divided by size of elements,
         * every element should have same width, otherwise it should be looped through all elements,
         * which is not good for performance
         */
        let index: number = Math.abs(Math.ceil(this._currentTransitionPx / size));

        // When elementsAtOnce > 1, swiping should stop at last index - elementsAtOnce
        if (!this.config.infinite && this.config.elementsAtOnce > 1) {
            if (index + this.config.elementsAtOnce >= this.items.length) {
                return this.items.toArray()[this.items.length - this.config.elementsAtOnce];
            }
        }

        index = index + (halfApproached ? 1 : 0);
        /** Checking if transition went out of scope of array */
        if (this.items.toArray()[index]) {
            return this.items.toArray()[index];
        } else {
            return this.items.last;
        }
    }

    /** @hidden */
    private getIndexOfItem(item: CarouselItemInterface): number {
        return this.items.toArray().findIndex((_item) => _item === item);
    }

    /** Getting size of carousel, width for horizontal, height for vertical */
    private _getSize(item: CarouselItemInterface): number {
        if (this.config.vertical) {
            return item.getHeight();
        } else {
            return item.getWidth();
        }
    }

    /** @hidden */
    private _handlePan(delta: number): void {
        const distance: number = delta - this._lastDistance;

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
            this.activeChange.emit({
                item: closestItem,
                after: delta < 0
            });
        } else if (this.active !== closestItem) {
            this.active = closestItem;
            this.activeChange.emit({
                item: closestItem,
                after: delta < 0
            });
        }

        this.dragStateChange.emit(false);
        this._lastDistance = 0;
    }

    /**
     * Animates the carousel to the currently selected slide.
     */
    private _transitionCarousel(transitionPx: number): void {
        this._currentTransitionPx = transitionPx;

        if (this.config.vertical) {
            this._elementRef.nativeElement.style.transform = 'translateY(' + this._currentTransitionPx + 'px)';
        } else {
            this._elementRef.nativeElement.style.transform = 'translateX(' + this._currentTransitionPx + 'px)';
        }
    }

    /** Pam Start handler, removes transition duration, */
    private _handlePanStart(): void {
        this._elementRef.nativeElement.style.transitionDuration = '0s';
        this._prePanTransitionPx = this._currentTransitionPx;
        this.dragStateChange.emit(true);
    }

    /** @hidden */
    private _hammerSetup(): void {

        this._hammer = new Hammer(this._elementRef.nativeElement);

        if (this.config.vertical) {
            this._hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
            this._hammer.on('panmove', (event) => this._handlePan(event.deltaY));
            this._hammer.on('panstart', () => this._handlePanStart());
            this._hammer.on('panend', (event) => this._handlePanEnd(event.deltaY));
        } else {
            this._hammer.on('panmove', (event) => this._handlePan(event.deltaX));
            this._hammer.on('panstart', () => this._handlePanStart());
            this._hammer.on('panend', (event) => this._handlePanEnd(event.deltaX));
        }
    }

    /** @hidden */
    private _getTransition(): string {
        if (this.config) {
            return this.config.transition;
        } else {
            return DEFAULT_TRANSITION_DURATION;
        }
    }
}
