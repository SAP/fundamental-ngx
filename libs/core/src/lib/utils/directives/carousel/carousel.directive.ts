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
    animate,
    AnimationBuilder,
    AnimationFactory,
    AnimationPlayer,
    style
} from '@angular/animations';
import { CarouselItemDirective } from './carousel-item.directive';
import * as Hammer from 'hammerjs';
import { HammerConfig } from './carousel.module';
import { Subject } from 'rxjs';
import { tap, throttleTime } from 'rxjs/operators';


export interface CarouselConfig {
    vertical?: boolean;
    offset?: number;
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

    @Output()
    readonly activeChange: EventEmitter<CarouselItemDirective> = new EventEmitter<CarouselItemDirective>();

    @Output()
    readonly dragged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChildren(CarouselItemDirective)
    items: QueryList<CarouselItemDirective>;

    private _previousActiveItem: CarouselItemDirective;
    private _player: AnimationPlayer;
    private _lastDistance: number = 0;
    private _currentTransitionPx: number = 0;

    private _panMoved$ = new Subject<number>();

    constructor(
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        private _builder: AnimationBuilder
    ) {
        this._panMoved$.subscribe(delta => this._handlePan(delta));
    }

    ngAfterContentInit(): void {
        const hammer = new Hammer(this._elementRef.nativeElement, new HammerConfig());

        hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

        hammer.on('panmove', (event) => this._panMoved$.next(event.deltaY));
        hammer.on('panstart', () => this.dragged.emit(true));
        hammer.on('panend', (event) => this._handlePanEnd(event.deltaY));
    }

    goToItem(item: CarouselItemDirective, smooth?: boolean): void {

        let index: number = this.getIndexOfItem(item);

        console.log(index);

        if (index < this._getOverflowItems() &&
            this.config.infinite) {
            this._placeOnTop();
        } else if (
            index > this.items.length - this._getOverflowItems() &&
            this.config.infinite) {
            this._placeOnBottom();
        }

        console.log(index);

        index = this.getIndexOfItem(item);
        this._transitionToIndex(index, smooth);

        this._previousActiveItem = item;
    }

    private _handlePan(delta: number): void {
        const distance: number = delta - this._lastDistance;

        this._lastDistance = delta;

        this._transitionCarousel(this._currentTransitionPx + distance, false);
    }

    private _handlePanEnd(delta) {
        this._handlePan(delta);

        const closestItem: CarouselItemDirective = this._getClosest();

        this.goToItem(closestItem, true);

        this.activeChange.emit(closestItem);

        this.dragged.emit(false);
        this._lastDistance = 0;
    }

    private _placeOnBottom(): void {
        const array = this.items.toArray();
        for (let i = 0; i < this._getOverflowItems(); i++) {
            const firstElement = array.shift();
            array.push(firstElement);
        }

        this.items.reset(array);
        this.items.forEach(item => item.getElement().parentNode.appendChild(item.getElement()));

        this._transitionToIndex(this.getIndexOfItem(this._previousActiveItem), false);
    }

    private _placeOnTop(): void {
        let array = this.items.toArray();
        for (let i = 0; i < this._getOverflowItems(); i++) {
            const lastElement = array.pop();
            array = [lastElement].concat(array);
        }

        this.items.reset(array);
        this.items.forEach(item => item.getElement().parentNode.appendChild(item.getElement()));

        this._transitionToIndex(this.getIndexOfItem(this._previousActiveItem), false);
    }

    private _transitionToIndex(index: number, smooth?: boolean): void {

        if (index < this.config.offset || index > this.items.length - this.config.offset) {
            // TODO Throw some error
            return;
        }

        const transitionPx: number = this.items.first.getHeight() * (index - this.config.offset);

        // Performance Saving Purposes
        // const transitionPx: number = this.items
        //     .filter((_item, _index) => _index < index - this.config.amountAtOnce)
        //     .map(_item => _item.getHeight())
        //     .reduce((_item: number, sum: number) => sum + _item)
        // ;

        this._transitionCarousel(-transitionPx, smooth);
    }

    private _getClosest(): CarouselItemDirective {

        // TODO Comment
        const halfApproached: boolean =
            Math.abs(this._currentTransitionPx % this.items.first.getHeight()) >
            this.items.first.getHeight() / 2
        ;

        const index: number =
            Math.ceil(this._currentTransitionPx / this.items.first.getHeight())
        ;

        let absIndex = Math.abs(index);

        if (this.items.toArray()[absIndex]) {
            absIndex = absIndex + (halfApproached ? 1 : 0);
            return this.items.toArray()[absIndex + this.config.offset];
        } else {
            if (index > 0) {
                return this.items.first;
            } else {
                return this.items.last;
            }
        }
    }

    private getIndexOfItem(item: CarouselItemDirective): number {
        return this.items.toArray().findIndex(_item => _item === item);
    }

    private buildAnimation(offset, time: boolean) {
        return this._builder.build([
            animate(time ? this._getTransition() : 0, style({ transform: `translateY(${offset}px)` }))
        ]);
    }

    private _getOverflowItems(): number {
        return Math.ceil(this.items.length / 5);
    }

    /**
     * Animates the carousel to the currently selected slide.
     */
    private _transitionCarousel(transitionPx: number, smooth: boolean) {

        console.log(transitionPx);

        this._currentTransitionPx = transitionPx;

        if (smooth) {
            console.log('smooth');
            this._elementRef.nativeElement.style.transitionDuration = this._getTransition();
        } else {
            this._elementRef.nativeElement.style.transitionDuration = '0s';
        }

        this._elementRef.nativeElement.style.transform = 'translateY(' + this._currentTransitionPx + 'px)';


        // this._elementRef.nativeElement.scrollTo({
        //     top: this._currentTransitionPx,
        //     left: 0,
        //     behavior: 'smooth'
        // });


        // TODO Consider animation usage -> poor performance
        // style({ transform: `translateY(${offset}px)` })
        // const myAnimation: AnimationFactory = this.buildAnimation(this._currentTransitionPx, time);
        //
        // this._player = myAnimation.create(this._elementRef.nativeElement);
        // this._player.play();
    }

    private _getTransition(): string {
        if (this.config) {
            return this.config.transition;
        } else {
            return Default_Transition_Duration;
        }
    }

}
