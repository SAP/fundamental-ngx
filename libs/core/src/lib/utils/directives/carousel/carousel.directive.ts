import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    QueryList
} from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import * as Hammer from 'hammerjs';

export interface CarouselConfig {
    /** Defines if carousel items are placed vertically */
    vertical?: boolean;
    /** Amount of visible elements in carousel */
    elementsAtOnce?: number;
    /** Defines if support for gestures, like touch swipe or mouse drag should be enabled */
    gestureSupport?: boolean
    /** Defines if carousel should move elements to sides. It allows to slide infinitely in one direction */
    infinite?: boolean;
    /** Transition time of CSS translate, `150ms` by default */
    transition?: string;
}

export interface PanEndOutput {
    item: CarouselItemDirective;
    after: boolean;
}

export const DEFAULT_TRANSITION_DURATION = '150ms';


@Directive({
    selector: '[fdCarousel]',
    host: {
        class: 'fd-carousel'
    }
})
export class CarouselDirective implements AfterContentInit, OnDestroy {

    /** Configuration for carousel */
    @Input()
    config: CarouselConfig;

    /** Initial active item of carousel, position first + offset */
    @Input()
    active: CarouselItemDirective;

    /** Event thrown, when active element is changed */
    @Output()
    readonly activeChange: EventEmitter<PanEndOutput> = new EventEmitter<PanEndOutput>();

    /** Event thrown when element is dragged. Emits "true" when drag starts and "false" when drag ends. */
    @Output()
    readonly dragStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    /** @hidden */
    private _previousActiveItem: CarouselItemDirective;

    /** @hidden */
    private _lastDistance = 0;

    /** @hidden */
    private _prePanTransitionPx = 0;

    /** @hidden */
    private _currentTransitionPx = 0;

    /** @hidden */
    private _hammer: Hammer = null;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.config.gestureSupport) {
            this._hammerSetup();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._hammer) {
            this._hammer.destroy();
        }
    }

    /** Change active element */
    goToItem(item: CarouselItemDirective, smooth?: boolean): void {
        let index: number = this.getIndexOfItem(item);

        if (this.config.infinite) {
            this._centerActive(index);

            index = this.getIndexOfItem(item);
        }

        this._transitionToIndex(index, smooth);

        this._previousActiveItem = item;
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

        const closestItem: CarouselItemDirective = this._getClosest();

        this.goToItem(closestItem, true);

        this.activeChange.emit({
            item: closestItem,
            after: delta < 0
        });

        this.dragStateChange.emit(false);
        this._lastDistance = 0;
    }

    /** @hidden */
    private _centerActive(index: number): void {
        const middleIndex = Math.ceil(this.items.length / 2);
        const offset = Math.ceil(this.config.elementsAtOnce / 2);
        const missingItems = (index + offset) - middleIndex;
        const array = this.items.toArray();


        if (missingItems > 0) {
            for (let i = 0; i < missingItems; i ++) {
                array.push(array.shift())
            }
        } else {
            for (let i = 0; i < Math.abs(missingItems); i ++) {
                array.unshift(array.pop())
            }
        }

        /** Changing order of elements in QueryList and NATIVE HTML */
        this.items.reset(array);
        this.items.forEach(item => item.getElement().parentNode.appendChild(item.getElement()));

        /**
         * For proper animation it's needed to transform elements,
         * by changing transition by amount of elements placed at top/bottom
         */
        this._elementRef.nativeElement.style.transitionDuration = '0s';
        this._transitionCarousel(this._currentTransitionPx + this._getSize(this.items.first) * missingItems);
    }

    /** @hidden */
    private _transitionToIndex(index: number, smooth?: boolean): void {
        const transitionPx: number = this._getSize(this.items.first) * index;

        if (smooth) {
            this._elementRef.nativeElement.style.transitionDuration = this._getTransition();
        } else {
            this._elementRef.nativeElement.style.transitionDuration = '0s';
        }

        this._transitionCarousel(-transitionPx);
    }

    /** Get closes element, based on current transition */
    private _getClosest(): CarouselItemDirective {

        /** If transition is positive, it'should go to first element */
        if (this._currentTransitionPx > 0) {
            return this.items.first;
        }

        const size: number = this._getSize(this.items.first);

        /** When scroll is after half of element, then ext one should be active */
        const halfApproached: boolean =
            Math.abs(this._currentTransitionPx % size) >
            size / 2
        ;

        /**
         * Index based on transition px divided by size of elements,
         * every element should have same width, otherwise it should be looped through all elements,
         * which is not good for performance
         */
        let index: number = Math.abs(Math.ceil(this._currentTransitionPx / size));

        /** Checking if transition went out of scope of array */
        if (this.items.toArray()[index]) {
            index = index + (halfApproached ? 1 : 0);
            return this.items.toArray()[index];
        } else {
            return this.items.last;
        }
    }

    /** @hidden */
    private getIndexOfItem(item: CarouselItemDirective): number {
        return this.items.toArray().findIndex(_item => _item === item);
    }

    /** @hidden */
    private _hammerSetup(): void {
        this._hammer = new Hammer(this._elementRef.nativeElement);

        this._hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        if (this.config.vertical) {
            this._hammer.on('panmove', (event) => this._handlePan(event.deltaY));
            this._hammer.on('panstart', () => this._handlePanStart());
            this._hammer.on('panend', (event) => this._handlePanEnd(event.deltaY));
        } else {
            this._hammer.on('panmove', (event) => this._handlePan(event.deltaX));
            this._hammer.on('panstart', () => this._handlePanStart());
            this._hammer.on('panend', (event) => this._handlePanEnd(event.deltaX));
        }
    }

    /** Pam Start handler, removes transition duration, */
    private _handlePanStart(): void {
        this._elementRef.nativeElement.style.transitionDuration = '0s';
        this._prePanTransitionPx = this._currentTransitionPx;
        this.dragStateChange.emit(true);
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

    /** @hidden */
    private _getTransition(): string {
        if (this.config) {
            return this.config.transition;
        } else {
            return DEFAULT_TRANSITION_DURATION;
        }
    }

    /** Getting size of carousel, width for horizontal, height for vertical */
    private _getSize(item: CarouselItemDirective): number {
        if (this.config.vertical) {
            return item.getHeight();
        } else {
            return item.getWidth();
        }
    }
}
