import {
    AfterContentInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList
} from '@angular/core';
import {
    AnimationPlayer,
} from '@angular/animations';
import { CarouselItemDirective } from './carousel-item.directive';
import * as Hammer from 'hammerjs';
import { HammerConfig } from './carousel.module';
import { Subject } from 'rxjs';


export interface CarouselConfig {
    vertical?: boolean;
    elementsAtOnce?: number;
    panSupport?: boolean
    infinite?: boolean;
    transition?: string;
}

export const Default_Transition_Duration: string = '150ms';


@Directive({
    selector: '[fdCarousel]',
    host: {
        class: 'fd-carousel'
    }
})
export class CarouselDirective implements AfterContentInit {

    @Input()
    config: CarouselConfig;

    @Input()
    active: CarouselItemDirective;

    @Input()
    panSupport: boolean = true;

    @Output()
    readonly activeChange: EventEmitter<CarouselItemDirective> = new EventEmitter<CarouselItemDirective>();

    @Output()
    readonly dragged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    private _previousActiveItem: CarouselItemDirective;
    private _lastDistance: number = 0;
    private _currentTransitionPx: number = 0;

    constructor(
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef
    ) {}

    ngAfterContentInit(): void {
        if (this.config.panSupport) {
            this._hammerSetup();
        }
    }

    goToItem(item: CarouselItemDirective, smooth?: boolean): void {
        let index: number = this.getIndexOfItem(item);

        if (this.config.infinite) {
            this._centerActive(index);

            index = this.getIndexOfItem(item);
        }

        this._transitionToIndex(index, smooth);

        this._previousActiveItem = item;
    }

    private _handlePan(delta: number): void {
        const distance: number = delta - this._lastDistance;

        this._lastDistance = delta;

        this._transitionCarousel(this._currentTransitionPx + distance);
    }

    private _handlePanEnd(delta) {
        this._handlePan(delta);

        const closestItem: CarouselItemDirective = this._getClosest();

        this.goToItem(closestItem, true);

        this.activeChange.emit(closestItem);

        this.dragged.emit(false);
        this._lastDistance = 0;
    }

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

        /** Changing order of elements in QueryList and Native HTML */
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

        // Performance Saving Purposes
        // const transitionPx: number = this.items
        //     .filter((_item, _index) => _index < index - this.config.amountAtOnce)
        //     .map(_item => _item.getHeight())
        //     .reduce((_item: number, sum: number) => sum + _item)
        // ;


        if (smooth) {
            this._elementRef.nativeElement.style.transitionDuration = this._getTransition();
        } else {
            this._elementRef.nativeElement.style.transitionDuration = '0s';
        }

        this._transitionCarousel(-transitionPx);
    }

    /** Get closes element, based on current tansition */
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

    private getIndexOfItem(item: CarouselItemDirective): number {
        return this.items.toArray().findIndex(_item => _item === item);
    }

    private _hammerSetup(): void {
        const hammer = new Hammer(this._elementRef.nativeElement, new HammerConfig());

        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        if (this.config.vertical) {
            hammer.on('panmove', (event) => this._handlePan(event.deltaY));
            hammer.on('panstart', () => this._handlePanStart());
            hammer.on('panend', (event) => this._handlePanEnd(event.deltaY));
        } else {
            hammer.on('panmove', (event) => this._handlePan(event.deltaX));
            hammer.on('panstart', () => this._handlePanStart());
            hammer.on('panend', (event) => this._handlePanEnd(event.deltaX));
        }
    }

    /** Pam Start handler, removes transition duration, */
    private _handlePanStart(): void {
        this._elementRef.nativeElement.style.transitionDuration = '0s';
        this.dragged.emit(true);
    }

    /**
     * Animates the carousel to the currently selected slide.
     */
    private _transitionCarousel(transitionPx: number) {

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
            return Default_Transition_Duration;
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
