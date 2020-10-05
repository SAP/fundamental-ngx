import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RtlService } from '@fundamental-ngx/core';
import { FdCarouselResourceStrings, CarouselResourceStringsEN } from './i18n/carousel-resources';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselService, CarouselConfig } from '../utils/services/carousel.service';

/** Page limit to switch to numerical indicator */
const ICON_PAGE_INDICATOR_LIMIT = 8;

export const CarouselIndicatorsOrientation = {
    bottom: 'bottom',
    top: 'top'
};

export enum SlideDirection {
    None,
    NEXT,
    PREVIOUS
}

let carouselUniqueId = 0;

class CarouselActiveSlides {
    constructor(public readonly activeItems: CarouselItemComponent[], public readonly slideDirection: string) {}
}

@Component({
    selector: 'fd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
    /** Id for the Carousel. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-${carouselUniqueId++}`;

    /** Sets aria-label attribute for carousel */
    @Input()
    ariaLabel = 'carousel';

    /** Sets aria-labelledby attribute for carousel */
    @Input()
    ariaLabelledBy: string;

    /** Sets aria-describedby attribute for carousel */
    @Input()
    ariaDescribedBy: string;

    /** Sets position of page indicator container. Default position is bottom. */
    @Input()
    carouselIndicatorsOrientation = CarouselIndicatorsOrientation.bottom;

    /** Height for carousel container */
    @Input()
    height: string;

    /** Width for carousel container */
    @Input()
    width: string;

    /** If carousel is in circular loop */
    @Input()
    loop = false;

    /** Label for left navigation button */
    @Input()
    leftNavigationBtnLabel = 'Go to previous item';

    /** Label for right navigation button */
    @Input()
    rightNavigationBtnLabel = 'Go to next item';

    /** Shows/hides optional navigation button */
    @Input()
    navigation = true;

    /** Show navigation button in page indicator container or inside content. Default is page indicator container on true value */
    @Input()
    navigatorInPageIndicator = true;

    /** Convert to Numeric page indicator */
    @Input()
    numericIndicator = false;

    /** Shows/hides optional page indicator container  */
    @Input()
    pageIndicatorContainer = true;

    /** Shows/hides optional page indicator */
    @Input()
    pageIndicator = true;

    /**
     * An accessor that sets the resource strings.
     * By default it uses EN resources.
     */
    @Input()
    set resourceStrings(value: FdCarouselResourceStrings) {
        this._resourceStrings = Object.assign({}, this._resourceStrings, value);
    }

    /**
     * An accessor that returns the resource strings.
     */
    get resourceStrings(): FdCarouselResourceStrings {
        return this._resourceStrings;
    }

    /**
     * Returns the `role` attribute of the carousel.
     */
    @HostBinding('attr.role')
    role = 'region';

    /** Sets sliding duration */
    @Input()
    slideTransitionDuration = '150ms';

    /** Is swipe enabled */
    @Input()
    swipeEnabled = false;

    /**
     * Returns the `tabIndex` of the carousel component.
     */
    @HostBinding('attr.tabindex')
    get tabIndex(): number {
        return 0;
    }

    /** Is carousel is vertical. Default value is false. */
    @Input()
    vertical = false;

    /** Number of items to be visible at a time */
    @Input()
    visibleSlidesCount = 1;

    /** An event that is emitted after a slide transition has happened */
    @Output()
    readonly onSlideChange: EventEmitter<CarouselActiveSlides> = new EventEmitter<CarouselActiveSlides>();

    /** @hidden */
    @ContentChildren(CarouselItemComponent, { descendants: true })
    slides: QueryList<CarouselItemComponent>;

    @ViewChild('slideContainer')
    slideContainer: ElementRef;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden handles rtl service */
    dir: string;

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;

    /** @hidden Fake array for counting number of page indicator */
    pageIndicatorsCountArray: number[] = [];

    private _resourceStrings = CarouselResourceStringsEN;

    private _config: CarouselConfig = {};

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing) */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _carouselService: CarouselService,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscribeToRtl();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        // On carousel load, display first slide + number of slide visible
        this.currentActiveSlidesStartIndex = 0;

        // Change pagination display to numeric, if item count is more than 8
        if (this.slides.length > ICON_PAGE_INDICATOR_LIMIT) {
            this.numericIndicator = true;
        }

        if (this.slides.length > 0) {
            this._initializeCarousel();
        } else {
            this.leftButtonDisabled = true;
            this.rightButtonDisabled = true;
        }

        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initializeServiceConfig();
        this._carouselService.initialise(this._config, this.slides, this.slideContainer);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    public get getPageIndicatorLabel(): string {
        return `${this.currentActiveSlidesStartIndex + 1} ${this.resourceStrings.fd_carousel_of} ${
            this.pageIndicatorsCountArray.length
        }`;
    }

    /** @hidden */
    public get screenReaderLabel(): string {
        return `${this.resourceStrings.fd_carousel_reader} ${this.currentActiveSlidesStartIndex + 1} ${
            this.resourceStrings.fd_carousel_of
        } ${this.pageIndicatorsCountArray.length}`;
    }

    /** @hidden */
    @HostListener('keydown.arrowright', ['$event'])
    public onKeydownArrowRight(event): void {
        event.preventDefault();
        if (!this.loop && this.currentActiveSlidesStartIndex >= this.pageIndicatorsCountArray.length - 1) {
            return;
        } else {
            this.next();
        }
    }

    /** @hidden */
    @HostListener('keydown.arrowleft', ['$event'])
    public onKeydownArrowLeft(event): void {
        event.preventDefault();
        if (!this.loop && this.currentActiveSlidesStartIndex <= 0) {
            return;
        } else {
            this.previous();
        }
    }

    /** Transitions to the previous slide in the carousel. */
    public previous(): void {
        this.rightButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.PREVIOUS);
        this._carouselService.pickPrevious();
        this._notifySlideChange(SlideDirection.PREVIOUS);
    }

    /** Transitions to the next slide in the carousel. */
    public next(): void {
        // Moving to next slide
        this.leftButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.NEXT);
        this._carouselService.pickNext();
        this._notifySlideChange(SlideDirection.NEXT);
    }

    /** @hidden Adjust position of active item, based on slide direction */
    private _adjustActiveItemPosition(slideDirection: SlideDirection): void {
        // Move one step in the direction
        const positionAdjustment = slideDirection === SlideDirection.NEXT ? 1 : -1;
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex + positionAdjustment;

        // If carousel set to loop
        if (this.loop) {
            if (this.currentActiveSlidesStartIndex < 0) {
                this.currentActiveSlidesStartIndex = this.slides.length - 1;
            } else if (this.currentActiveSlidesStartIndex === this.slides.length) {
                this.currentActiveSlidesStartIndex = 0;
            }
        } else {
            this._disableNavigationButton();
        }
    }

    /** @hidden Disable navigation if either side limit reached */
    private _disableNavigationButton(): void {
        // Need to disable navigation button if either direction limit has reached.
        if (this.currentActiveSlidesStartIndex === 0) {
            this.leftButtonDisabled = true;
        } else if (this.slides.length - 1 === this.currentActiveSlidesStartIndex) {
            this.rightButtonDisabled = true;
        } else if (
            this.visibleSlidesCount > 1 &&
            this.currentActiveSlidesStartIndex + this.visibleSlidesCount === this.slides.length
        ) {
            this.rightButtonDisabled = true;
        }
    }

    /** @hidden Initialize carousel with visible items */
    private _initializeCarousel(): void {
        // Handles navigator button enabled/disabled state
        this._initializeButtonVisibility();

        // set page indicator count with fake array, to use in template
        this.pageIndicatorsCountArray = new Array(this.slides.length - this.visibleSlidesCount + 1);
    }

    /** @hidden Initialize config for Carousel service */
    private _initializeServiceConfig(): void {
        this._config.vertical = this.vertical;
        this._config.elementsAtOnce = this.visibleSlidesCount;
        this._config.gestureSupport = this.swipeEnabled;
        this._config.infinite = this.loop;
        this._config.transition = this.slideTransitionDuration;
    }

    /** @hidden Handles navigation button visibility */
    private _initializeButtonVisibility(): void {
        if (!this.loop) {
            // Navigation will be disabled if carousel has only one element
            if (this.slides.length === 1) {
                this.leftButtonDisabled = true;
                this.rightButtonDisabled = true;
            }

            if (this.currentActiveSlidesStartIndex === 0) {
                this.leftButtonDisabled = true;
            } else if (this.currentActiveSlidesStartIndex === this.slides.length - 1) {
                this.rightButtonDisabled = true;
            }

            // Disables right navigation button
            if (this.visibleSlidesCount > 1) {
                if (this.currentActiveSlidesStartIndex + this.visibleSlidesCount >= this.slides.length - 1) {
                    this.rightButtonDisabled = true;
                }
            }
        }
    }

    /** @hidden Handles notification on visible slide change */
    private _notifySlideChange(slideDirection: SlideDirection): void {
        const activeSlides: CarouselItemComponent[] = new Array();
        const slides = this.slides.toArray();

        for (let activeSlideIndex = 0; activeSlideIndex < this.visibleSlidesCount; activeSlideIndex++) {
            activeSlides.push(slides[this.currentActiveSlidesStartIndex + activeSlideIndex]);
        }

        const direction = slideDirection === SlideDirection.NEXT ? 'Next' : 'Previous';
        this.onSlideChange.emit(new CarouselActiveSlides(activeSlides, direction));
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe((isRtl: boolean) => {
            this.dir = isRtl ? 'rtl' : 'ltr';
            this._changeDetectorRef.detectChanges();
        });
    }
}
