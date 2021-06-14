import {
    AfterContentInit,
    AfterViewChecked,
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
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FdCarouselResourceStrings, CarouselResourceStringsEN } from './i18n/carousel-resources';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import {
    CarouselService,
    CarouselConfig,
    PanEndOutput,
    CarouselItemInterface
} from './carousel.service';
import { RtlService } from '@fundamental-ngx/core/utils';

/** Page limit to switch to numerical indicator */
const ICON_PAGE_INDICATOR_LIMIT = 8;

export type PageIndicatorsOrientation = 'bottom' | 'top';

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
    encapsulation: ViewEncapsulation.None,
    providers: [CarouselService]
})
export class CarouselComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {
    /** Id for the Carousel. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-${carouselUniqueId++}`;

    /** Sets aria-label attribute for carousel */
    @Input()
    ariaLabel = null;

    /** Sets aria-labelledby attribute for carousel */
    @Input()
    ariaLabelledBy: string;

    /** Sets aria-describedby attribute for carousel */
    @Input()
    ariaDescribedBy: string;

    /** Sets position of page indicator container. Default position is bottom. */
    @Input()
    pageIndicatorsOrientation: PageIndicatorsOrientation = 'bottom';

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

    /** Sets sliding duration in millie seconds. Default is 150 */
    @Input()
    slideTransitionDuration = 150;

    /** Is swipe enabled */
    @Input()
    swipeEnabled = true;

    /** Is carousel is vertical. Default value is false. */
    @Input()
    vertical = false;

    /** Number of items to be visible at a time */
    @Input()
    visibleSlidesCount = 1;

    /** An event that is emitted after a slide transition has happened */
    @Output()
    readonly slideChange: EventEmitter<CarouselActiveSlides> = new EventEmitter<CarouselActiveSlides>();

    /**
     * @hidden Returns the `role` attribute of the carousel.
     */
    @HostBinding('attr.role')
    role = 'region';

    /**
     * @hidden Returns the `tabIndex` of the carousel component.
     */
    @HostBinding('attr.tabindex')
    get tabIndex(): number {
        return 0;
    }

    /**
     * @hidden Sets the overflow to auto value.
     */
    @HostBinding('style.overflow')
    overflow = 'auto';

    /** @hidden */
    @ContentChildren(CarouselItemComponent, { descendants: true })
    slides: QueryList<CarouselItemComponent>;

    /** @hidden */
    @ViewChild('slideContainer')
    slideContainer: ElementRef;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden handles rtl service */
    dir = 'ltr';

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;

    /** @hidden Fake array for counting number of page indicator */
    pageIndicatorsCountArray: number[] = [];

    private _resourceStrings = CarouselResourceStringsEN;

    private _config: CarouselConfig = {};

    private _slidesCopy = [];

    private _previousVisibleSlidesCount: number;

    private _slideSwiped = false;

    private _prevBtnClickedAtStart = true;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing) */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private readonly _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _changeDetectorRef: ChangeDetectorRef,
        private _carouselService: CarouselService,
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

            // Disable swipe when there is no carousel item
            this.swipeEnabled = false;
            this.navigation = false;
        }

        // Keep copy of original slide array, for indicator purpose.
        // In case of looped carousel, original slides array changes.
        this._slidesCopy = this.slides.toArray();

        this._subscribeServiceEvents();

        // Subscribe to dynamic update of slides
        this.slides.changes.pipe(takeUntil(this._onDestroy$)).subscribe(() => this._onSlideUpdates());
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initializeServiceConfig();
        this._carouselService.initialise(this._config, this.slides, this.slideContainer);
        this._previousVisibleSlidesCount = this.visibleSlidesCount;
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        if (this._previousVisibleSlidesCount && this._previousVisibleSlidesCount !== this.visibleSlidesCount) {
            this._initializeCarousel();
            this._initializeServiceConfig();
            this._carouselService.updateConfig(this._config);
            this._previousVisibleSlidesCount = this.visibleSlidesCount;
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    get getPageIndicatorLabel(): string {
        return `${this.currentActiveSlidesStartIndex + 1} ${this.resourceStrings.fd_carousel_of} ${
            this.pageIndicatorsCountArray.length
        }`;
    }

    /** @hidden */
    get screenReaderLabel(): string {
        return `${this.resourceStrings.fd_carousel_reader} ${this.currentActiveSlidesStartIndex + 1} ${
            this.resourceStrings.fd_carousel_of
        } ${this.pageIndicatorsCountArray.length}`;
    }

    /** @hidden */
    _focus(): void {
        const el = this._elementRef.nativeElement;
        if (el !== document.activeElement) {
            el.focus({ preventScroll: true });
        }
    }

    _isRtl(): boolean {
        return this._rtlService?.rtl.getValue();
    }

    /** @hidden */
    @HostListener('keydown.arrowright', ['$event'])
    onKeydownArrowRight(event: KeyboardEvent): void {
        event.preventDefault();
        this._isRtl() ? this.previous() : this.next();
    }

    /** @hidden */
    @HostListener('keydown.arrowleft', ['$event'])
    onKeydownArrowLeft(event: KeyboardEvent): void {
        event.preventDefault();
        this._isRtl() ? this.next() : this.previous();
    }

    /** Transitions to the previous slide in the carousel. */
    previous(): void {
        if (!this.loop && this.currentActiveSlidesStartIndex <= 0) {
            return;
        }
        this.rightButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.PREVIOUS);
        this._preventDefaultBtnFocus();
        this._carouselService.pickPrevious(this.dir);

        /** Handle looped carousel, first click on prev button. */
        if (this.loop && this._prevBtnClickedAtStart) {
            const slidesArray = this.slides.toArray();
            this._carouselService.goToItem(slidesArray[Math.ceil(this.slides.length / 2) - 1], true, this.dir);
            slidesArray[Math.ceil(this.slides.length / 2) - 1].visibility = 'visible';
            this.slideChange.emit(new CarouselActiveSlides([slidesArray[Math.ceil(this.slides.length / 2) - 1]], 'Previous'));
        } else {
            /** Have to refactor the _notifySlideChange to get rid of else condition */
            this._notifySlideChange(SlideDirection.PREVIOUS);
        }
        this._prevBtnClickedAtStart = false;
        this._changeDetectorRef.detectChanges();
    }

    /** Transitions to the next slide in the carousel. */
    next(): void {
        if (!this.loop && this.currentActiveSlidesStartIndex >= this.pageIndicatorsCountArray.length - 1) {
            return;
        }
        // Handles looped carousel, first navigation is prev button.
        this._prevBtnClickedAtStart = false;
        // Moving to next slide
        this.leftButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.NEXT);
        this._preventDefaultBtnFocus();
        this._carouselService.pickNext(this.dir);
        this._notifySlideChange(SlideDirection.NEXT);
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Subscribe to carousel service events */
    private _subscribeServiceEvents(): void {
        this._carouselService.activeChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((event) => this._onSlideSwipe(event));
        this._carouselService.dragStateChange
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((event) => this._onSlideDrag(event));
    }

    /**
     * @hidden Prevent native focus flow related to button, if button will be disable on focus state.
     * It works only if carousel is not in circular loop.
     */
    private _preventDefaultBtnFocus(): void {
        if (this.loop) {
            return;
        }
        const isFirst = this.currentActiveSlidesStartIndex === 0;
        const isLast = this.currentActiveSlidesStartIndex === this.pageIndicatorsCountArray.length - 1;
        if (isFirst || isLast) {
            this._elementRef.nativeElement.focus({ preventScroll: true });
        }
    }

    /** @hidden Adjust position of active item, based on slide direction */
    private _adjustActiveItemPosition(slideDirection: SlideDirection, step: number = 1): void {
        // Move one step in the direction
        const positionAdjustment = slideDirection === SlideDirection.NEXT ? step : -step;
        this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex + positionAdjustment;

        // If carousel set to loop
        if (this.loop) {
            if (this.currentActiveSlidesStartIndex < 0) {
                this.currentActiveSlidesStartIndex = this.slides.length + this.currentActiveSlidesStartIndex;
            } else if (this.currentActiveSlidesStartIndex >= this.slides.length) {
                this.currentActiveSlidesStartIndex = this.currentActiveSlidesStartIndex % this.slides.length;
            }
        } else {
            this._buttonVisibility();
        }
    }

    /** @hidden Handles navigation button visibility */
    private _buttonVisibility(): void {
        if (!this.loop) {
            // Need to disable navigation button if either direction limit has reached.
            if (this.currentActiveSlidesStartIndex === 0) {
                this.leftButtonDisabled = true;
                this.rightButtonDisabled = false;
            } else if (this.slides.length - 1 === this.currentActiveSlidesStartIndex) {
                this.rightButtonDisabled = true;
                this.leftButtonDisabled = false;
            } else if (
                this.visibleSlidesCount > 1 &&
                this.currentActiveSlidesStartIndex + this.visibleSlidesCount >= this.slides.length
            ) {
                this.rightButtonDisabled = true;
            } else {
                this.leftButtonDisabled = false;
                this.rightButtonDisabled = false;
            }

            if (this.slides.length === 1) {
                this.leftButtonDisabled = true;
                this.rightButtonDisabled = true;
            }
        }
    }

    /** @hidden Handle when slide is added or removed */
    private _onSlideUpdates(): void {
        this._slidesCopy = this.slides.toArray();
        this.currentActiveSlidesStartIndex = 0;
        this._carouselService.initialise(this._config, this.slides, this.slideContainer);
        this._carouselService.active = null;
        if (this.vertical) {
            this._renderer.setStyle(this.slideContainer?.nativeElement, 'transform', 'translateY(0px)');
        } else {
            this._renderer.setStyle(this.slideContainer?.nativeElement, 'transform', 'translateX(0px)');
        }
        this._initializeCarousel();
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Initialize carousel with visible items */
    private _initializeCarousel(): void {
        // Handles navigator button enabled/disabled state
        this._buttonVisibility();

        // set page indicator count with fake array, to use in template
        if (this.loop && this.visibleSlidesCount > 1) {
            // If loop with multi item visible.
            this.pageIndicatorsCountArray = new Array(this.slides.length);
        } else {
            this.pageIndicatorsCountArray = new Array(this.slides.length - this.visibleSlidesCount + 1);
        }

        this.slides.forEach((_slide, index) => {
            if (
                index >= this.currentActiveSlidesStartIndex &&
                index < this.currentActiveSlidesStartIndex + this.visibleSlidesCount
            ) {
                _slide.visibility = 'visible';
            } else {
                _slide.visibility = 'hidden';
            }
        });
    }

    /** @hidden Initialize config for Carousel service */
    private _initializeServiceConfig(): void {
        this._config.vertical = this.vertical;
        this._config.elementsAtOnce = this.visibleSlidesCount;
        this._config.gestureSupport = this.swipeEnabled;
        this._config.infinite = this.loop;
        this._config.transition = String(this.slideTransitionDuration) + 'ms';
        // Carousel service expects transition in string format with unit.
    }

    /**
     * @hidden Returns the slide swapping steps
     */
    private _getStepTaken(event: PanEndOutput, actualActiveSlideIndex: number): number {
        let stepsCalculated: number;

        if (event.after) {
            if (actualActiveSlideIndex === 0 && this.currentActiveSlidesStartIndex === 0) {
                stepsCalculated = 0;
            } else if (actualActiveSlideIndex > this.currentActiveSlidesStartIndex) {
                stepsCalculated = actualActiveSlideIndex - this.currentActiveSlidesStartIndex;
            } else {
                stepsCalculated = this.slides.length - this.currentActiveSlidesStartIndex + actualActiveSlideIndex;
            }
        } else {
            // Special case, when first left swipe before slides are rotated in carousel service
            if (actualActiveSlideIndex === 0 && this.currentActiveSlidesStartIndex === 0) {
                stepsCalculated = 0;
            } else if (actualActiveSlideIndex < this.currentActiveSlidesStartIndex) {
                stepsCalculated = this.currentActiveSlidesStartIndex - actualActiveSlideIndex;
            } else {
                stepsCalculated = this.currentActiveSlidesStartIndex + this.slides.length - actualActiveSlideIndex;
            }
        }
        return stepsCalculated;
    }

    /** @hidden Handles notification on visible slide change */
    private _notifySlideChange(slideDirection: SlideDirection, firstActiveSlide?: CarouselItemInterface): void {
        const activeSlides: CarouselItemComponent[] = new Array();
        const slides = this.slides.toArray();
        let firstActiveSlideIndex: number;

        if (this.loop) {
            firstActiveSlide = this._carouselService.active;
        }

        if (firstActiveSlide) {
            firstActiveSlideIndex = this.slides.toArray().findIndex((_item) => _item === firstActiveSlide);
        } else {
            firstActiveSlideIndex = this.currentActiveSlidesStartIndex;
        }

        for (let activeSlideIndex = 0; activeSlideIndex < this.visibleSlidesCount; activeSlideIndex++) {
            activeSlides.push(slides[firstActiveSlideIndex + activeSlideIndex]);
            this.slides.toArray()[firstActiveSlideIndex + activeSlideIndex].visibility = 'visible';
        }

        this._manageSlideVisibility(firstActiveSlideIndex);
        const direction = slideDirection === SlideDirection.NEXT ? 'Next' : 'Previous';
        this.slideChange.emit(new CarouselActiveSlides(activeSlides, direction));
    }

    /** @hidden Manages visibility for slides. Useful in managing tab order */
    private _manageSlideVisibility(firstActiveSlideIndex: number): void {
        setTimeout(() => {
            this.slides.forEach((_slides, index) => {
                if (index >= firstActiveSlideIndex && index < firstActiveSlideIndex + this.visibleSlidesCount) {
                    if (_slides.visibility === 'hidden') {
                        _slides.visibility = 'visible';
                    }
                } else {
                    if (_slides.visibility === 'visible') {
                        _slides.visibility = 'hidden';
                    }
                }
            });
            this._changeDetectorRef.markForCheck();
        }, this.slideTransitionDuration);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        const refreshDirection = () => {
            this.dir = this._rtlService?.rtl.getValue() ? 'rtl' : 'ltr';
            if (this._carouselService.items) {
                this._carouselService.goToItem(this._carouselService.active, false, this.dir);
            }
            this._changeDetectorRef.detectChanges();
        };
        refreshDirection();
        this._rtlService?.rtl.pipe(takeUntil(this._onDestroy$)).subscribe(() => refreshDirection());
    }

    /** @hidden On Swiping of slide, manage page indicator */
    private _onSlideSwipe(event: PanEndOutput): void {
        this._slideSwiped = true;
        const firstActiveSlide = event.item;
        const actualActiveSlideIndex = this._slidesCopy.findIndex((_slide) => _slide === firstActiveSlide);
        const stepTaken = this._getStepTaken(event, actualActiveSlideIndex);
        if (stepTaken > 0) {
            const slideDirection: SlideDirection = event.after ? SlideDirection.NEXT : SlideDirection.PREVIOUS;

            this._adjustActiveItemPosition(slideDirection, stepTaken);
            this._notifySlideChange(slideDirection, firstActiveSlide);
            this._changeDetectorRef.detectChanges();
        }
    }

    /**
     * @hidden Making slides visible when slides are dragged. Otherwise it looses the effect.
     */
    private _onSlideDrag(isDragging: boolean): void {
        if (isDragging) {
            this.slides.forEach((_slide) => {
                _slide.visibility = 'visible';
            });
            this._slideSwiped = false;
            this._changeDetectorRef.markForCheck();
        } else {
            // After slide limit reached, if dragging starts then revert visibility
            if (!this._slideSwiped && !this.loop) {
                this._manageSlideVisibility(this.currentActiveSlidesStartIndex);
            }
        }
    }
}
