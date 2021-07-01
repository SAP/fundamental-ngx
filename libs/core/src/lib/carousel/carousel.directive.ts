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
import { CarouselConfig, CarouselService, PanEndOutput } from './carousel.service';
import { CarouselItemDirective } from './carousel-item.directive';

@Directive({
    selector: '[fdCarousel]',
    host: {
        class: 'fd-carousel_'
    },
    providers: [CarouselService]
})
export class CarouselDirective implements AfterContentInit {
    /** Configuration for carousel */
    @Input()
    config: CarouselConfig;

    /** Initial active item of carousel, position first + offset */
    @Input()
    active: CarouselItemDirective;

    get carouselService(): CarouselService {
        return this._carouselService;
    }

    /** Event thrown, when active element is changed */
    @Output()
    readonly activeChange: EventEmitter<PanEndOutput> = new EventEmitter<PanEndOutput>();

    /** Event thrown when element is dragged. Emits "true" when drag starts and "false" when drag ends. */
    @Output()
    readonly dragStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ContentChildren(CarouselItemDirective, { descendants: true })
    items: QueryList<CarouselItemDirective>;

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        private _carouselService: CarouselService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._carouselService.initialise(this.config, this.items, this._elementRef);

        this._carouselService.activeChange.subscribe((event) => this.activeChange.emit(event));
        this._carouselService.dragStateChange.subscribe((event) => this.dragStateChange.emit(event));
    }

    /** Change active element */
    goToItem(item: CarouselItemDirective, smooth?: boolean): void {
        this._carouselService.goToItem(item, smooth);
    }

    pickPrevious(): void {
        this._carouselService.pickPrevious();
    }

    pickNext(): void {
        this._carouselService.pickNext();
    }
}
