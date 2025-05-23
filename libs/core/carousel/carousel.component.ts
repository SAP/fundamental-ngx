import { Direction } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    NgZone,
    OnChanges,
    Output,
    QueryList,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, RtlService, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { merge } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselConfig, CarouselItemInterface, CarouselService, PanEndOutput } from './carousel.service';
import { CarouselResourceStringsEN, FdCarouselResourceStrings } from './i18n/carousel-resources';

/** Page limit to switch to numerical indicator */
const ICON_PAGE_INDICATOR_LIMIT = 8;
export type PageIndicatorsOrientation = 'bottom' | 'top';

export type CarouselBackgroundOptions = 'translucent' | 'transparent' | 'solid';

export enum SlideDirection {
    None,
    NEXT,
    PREVIOUS
}
export interface FittingSlidesAndWidth {
    width: number;
    slides: number;
}
let carouselCounter = 0;

class CarouselActiveSlides {
    constructor(
        public readonly activeItems: CarouselItemComponent[],
        public readonly slideDirection: string
    ) {}
}

@Component({
    selector: 'fd-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CarouselService],
    host: {
        '[style.width]': 'width'
    },
    imports: [NgTemplateOutlet, NgClass, ButtonComponent, FdTranslatePipe]
})
export class CarouselComponent implements AfterContentInit, AfterViewInit, AfterViewChecked, OnChanges {
    /** ID for the Carousel. */
    @Input()
    @HostBinding('attr.id')
    id = `fd-carousel-${carouselCounter++}`;

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
    width = '100%';

    /** If carousel is in circular loop */
    @Input()
    loop = false;

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

    /** Whether to hide top border of the Pagination Container. */
    @Input()
    noPaginationContainerBorder = false;

    /** Background configuration for the Content container. */
    @Input()
    contentBackground: CarouselBackgroundOptions = 'translucent';

    /** Background configuration for the Pagination container */
    @Input()
    pageIndicatorBackground: CarouselBackgroundOptions = 'solid';

    /** Number of items to be visible at a time */
    @Input()
    set visibleSlidesCount(value: number | 'auto') {
        this._visibleSlidesCount = value;
        this._visibleSlidesNumericCount = this._getVisibleSlidesCount();
    }

    get visibleSlidesCount(): number | 'auto' {
        return this._visibleSlidesCount;
    }

    /** An event that is emitted after a slide transition has happened */
    @Output()
    readonly slideChange: EventEmitter<CarouselActiveSlides> = new EventEmitter<CarouselActiveSlides>();

    /** @hidden */
    @ContentChildren(CarouselItemComponent, {
        descendants: true
    })
    slides: QueryList<CarouselItemComponent>;

    /** @hidden */
    @ViewChild('slideContainer')
    slideContainer: ElementRef;

    /** Carousel container element. */
    @ViewChild('carouselContainer')
    carouselContainer: ElementRef;

    /** @hidden Start index of currently active items */
    currentActiveSlidesStartIndex = 0;

    /** @hidden End index of currently active items */
    currentActiveSlidesEndIndex = 0;

    /** @hidden an array of id(s) of currently active item(s) */
    currentActiveSlidesIds: string[] = [];

    /** @hidden the total number of slides in the carousel */
    totalSlides = 0;

    /** @hidden handles rtl service */
    readonly _dir$ = computed<Direction>(() => (this._rtl$() ? 'rtl' : 'ltr'));

    /** @hidden Make left navigation button disabled */
    leftButtonDisabled = false;

    /** @hidden Make right navigation button disabled */
    rightButtonDisabled = false;

    /** @hidden Fake array for counting number of page indicator */
    pageIndicatorsCountArray: number[] = [];

    /** @hidden */
    _slidesWrapperSize = 0;

    /** @hidden A string containing the id(s) of the active item(s) */
    ariaActivedescendant: string;

    /** @hidden */
    get _contentSizePx(): string {
        return this._slidesWrapperSize ? `${this._slidesWrapperSize}px` : this.width;
    }

    /** @hidden */
    private _visibleSlidesCount: number | 'auto' = 1;

    /** @hidden */
    private _visibleSlidesNumericCount = 1;

    /** @hidden */
    private _resourceStrings = CarouselResourceStringsEN;

    /** @hidden */
    private _config: CarouselConfig = {};

    /** @hidden */
    private _slidesCopy: CarouselItemComponent[] = [];

    /** @hidden */
    private _previousVisibleSlidesCount: number;

    /** @hidden */
    private _slideSwiped = false;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _carouselService: CarouselService,
        private readonly _zone: NgZone
    ) {
        effect(() => {
            const isRtl = this._rtl$();
            this._carouselService.isRtl = isRtl;
            if (this._carouselService.items && this._carouselService.active) {
                this._carouselService.goToItem(this._carouselService.active, false);
            }
        });
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (
            KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW]) ||
            (this.vertical && KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]))
        ) {
            event.preventDefault();

            if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
                this._rtl$() ? this.next() : this.previous();
            }
            if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
                this._rtl$() ? this.previous() : this.next();
            }
            if (KeyUtil.isKeyCode(event, UP_ARROW)) {
                this.previous();
            }
            if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
                this.next();
            }
            this.carouselContainer.nativeElement.focus();
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.visibleSlidesCount && this.slides?.length > 0) {
            this._notifySlideChange(SlideDirection.None);
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        // On carousel load, display first slide + number of slide visible
        this.currentActiveSlidesStartIndex = 0;
        this.currentActiveSlidesEndIndex = this._visibleSlidesNumericCount - 1;
        this.currentActiveSlidesIds = [];
        this.totalSlides = this.slides.length;

        this.slides.forEach((slide, index) => {
            const isActive = index >= this.currentActiveSlidesStartIndex && index <= this.currentActiveSlidesEndIndex;

            slide.ariaSetsize.set(this.totalSlides);
            slide.ariaPosinset.set(index + 1);
            slide.ariaHidden.set(!isActive);
            slide.ariaSelected.set(isActive);

            if (isActive) {
                this.currentActiveSlidesIds.push(slide.id);
            }
        });

        this.ariaActivedescendant = this.currentActiveSlidesIds.join(' ');

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
        this.slides.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._onSlideUpdates());
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initializeServiceConfig();
        this._carouselService.initialise(this._config, this.slides, this.slideContainer);
        this._previousVisibleSlidesCount = this._visibleSlidesNumericCount;
        this._resizeContentContainer();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        if (this._previousVisibleSlidesCount && this._previousVisibleSlidesCount !== this._visibleSlidesNumericCount) {
            this._initializeCarousel();
            this._initializeServiceConfig();
            this._carouselService.updateConfig(this._config);
            this._previousVisibleSlidesCount = this._visibleSlidesNumericCount;
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    get _showNavigationButtonInPageIndicatorContainer(): boolean {
        return this.navigatorInPageIndicator && this.pageIndicatorsCountArray.length > 1;
    }

    /** @hidden */
    get _showNavigationButtonInContent(): boolean {
        return !this.navigatorInPageIndicator && this.pageIndicatorsCountArray.length > 1;
    }

    /** @hidden */
    get _showPageIndicatorContainer(): boolean {
        return this.pageIndicatorContainer && (this.pageIndicatorsCountArray.length > 0 || this.numericIndicator);
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
            el.focus({
                preventScroll: true
            });
        }
    }

    /** Transitions to the previous slide in the carousel. */
    previous(): void {
        if (!this.loop && this.currentActiveSlidesStartIndex <= 0) {
            return;
        }
        this.rightButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.PREVIOUS);
        this._preventDefaultBtnFocus();
        this._carouselService.pickPrevious();
        this._notifySlideChange(SlideDirection.PREVIOUS);
        this._changeDetectorRef.detectChanges();
    }

    /** Transitions to the next slide in the carousel. */
    next(): void {
        if (!this.loop && this.currentActiveSlidesStartIndex >= this.pageIndicatorsCountArray.length - 1) {
            return;
        }

        // Moving to next slide
        this.leftButtonDisabled = false;
        this._adjustActiveItemPosition(SlideDirection.NEXT);
        this._preventDefaultBtnFocus();
        this._carouselService.pickNext();
        this._notifySlideChange(SlideDirection.NEXT);
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden Subscribe to carousel service events */
    private _subscribeServiceEvents(): void {
        this._carouselService.activeChange$.subscribe((event) => this._onSlideSwipe(event));
        this._carouselService.dragStateChange$.subscribe((event) => this._onSlideDrag(event));
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
            this._elementRef.nativeElement.focus({
                preventScroll: true
            });
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
                this._visibleSlidesNumericCount > 1 &&
                this.currentActiveSlidesStartIndex + this._visibleSlidesNumericCount >= this.slides.length
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
        this._zone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            // Handles navigator button enabled/disabled state
            this._buttonVisibility();
            let arrayLength: number;
            // set page indicator count with fake array, to use in template
            if (this.loop && this._visibleSlidesNumericCount > 1) {
                // If loop with multi item visible.
                arrayLength = this.slides.length;
            } else {
                arrayLength = this.slides.length - this._visibleSlidesNumericCount + 1;
            }
            const pageIndicatorsIfZeroCount = this.slides.length === 0 ? 0 : 1;
            this.pageIndicatorsCountArray = new Array(arrayLength > 0 ? arrayLength : pageIndicatorsIfZeroCount);
            this._goToFirstItem();
            this.slides.forEach((_slide, index) => {
                if (
                    index >= this.currentActiveSlidesStartIndex &&
                    index < this.currentActiveSlidesStartIndex + this._visibleSlidesNumericCount
                ) {
                    _slide.visibility = 'visible';
                } else {
                    _slide.visibility = 'hidden';
                }
            });
            this._changeDetectorRef.detectChanges();
        });
    }

    /** @hidden */
    private _goToFirstItem(): void {
        if (
            this.pageIndicatorsCountArray.length === 0 &&
            this._carouselService.currentTransitionPx !== 0 &&
            this.slides.length > 1
        ) {
            this.currentActiveSlidesStartIndex = 0;
            this._carouselService.goToItem(this.slides.first);
        }
    }

    /** @hidden Initialize config for Carousel service */
    private _initializeServiceConfig(): void {
        this._config.vertical = this.vertical;
        this._config.elementsAtOnce = this._visibleSlidesNumericCount;
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
        if (
            (!this._rtl$() && event.after) ||
            (this._rtl$() && !event.after && !this.vertical) ||
            (this.vertical && event.after)
        ) {
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
    private _notifySlideChange(slideDirection: SlideDirection, firstActiveSlide?: CarouselItemInterface | null): void {
        const activeSlides: CarouselItemComponent[] = [];
        let firstActiveSlideIndex: number;
        if (this.loop) {
            firstActiveSlide = this._carouselService.active;
        }
        if (firstActiveSlide) {
            firstActiveSlideIndex = this.slides.toArray().findIndex((_item) => _item === firstActiveSlide);
        } else {
            firstActiveSlideIndex = this.currentActiveSlidesStartIndex;
        }
        for (let activeSlideIndex = 0; activeSlideIndex < this._visibleSlidesNumericCount; activeSlideIndex++) {
            const index = firstActiveSlideIndex + activeSlideIndex;
            const slide = this.slides.get(index);
            if (slide) {
                activeSlides.push(slide);
                slide.visibility = 'visible';
            }
        }
        this._manageSlideVisibility(firstActiveSlideIndex);
        const direction = slideDirection === SlideDirection.NEXT ? 'Next' : 'Previous';
        this.slideChange.emit(new CarouselActiveSlides(activeSlides, direction));
    }

    /** @hidden Manages visibility for slides. Useful in managing tab order */
    private _manageSlideVisibility(firstActiveSlideIndex: number): void {
        setTimeout(() => {
            const lastActiveSlideIndex = firstActiveSlideIndex + this._visibleSlidesNumericCount;

            this.currentActiveSlidesIds = [];

            this.slides.forEach((slide, index) => {
                const isVisible = index >= firstActiveSlideIndex && index < lastActiveSlideIndex;

                // Only update visibility if it has changed
                if (slide.visibility !== (isVisible ? 'visible' : 'hidden')) {
                    slide.visibility = isVisible ? 'visible' : 'hidden';
                }

                if (isVisible) {
                    this.currentActiveSlidesIds.push(slide.id);
                }

                slide.ariaHidden.set(!isVisible);
                slide.ariaSelected.set(isVisible);
            });

            this.ariaActivedescendant = this.currentActiveSlidesIds.join(' ');

            this._changeDetectorRef.markForCheck();
        }, this.slideTransitionDuration);
    }

    /** @hidden On Swiping of slide, manage page indicator */
    private _onSlideSwipe(event: PanEndOutput): void {
        this._slideSwiped = true;
        const firstActiveSlide = event.item;
        const actualActiveSlideIndex = this._slidesCopy.findIndex((_slide) => _slide === firstActiveSlide);
        const stepTaken = this._getStepTaken(event, actualActiveSlideIndex);
        if (stepTaken > 0) {
            let slideDirection: SlideDirection;
            if (!this._rtl$()) {
                slideDirection = event.after ? SlideDirection.NEXT : SlideDirection.PREVIOUS;
            } else {
                // vertical carousel slide direction is same in ltr and rtl
                if (this.vertical) {
                    slideDirection = event.after ? SlideDirection.NEXT : SlideDirection.PREVIOUS;
                } else {
                    slideDirection = event.after ? SlideDirection.PREVIOUS : SlideDirection.NEXT;
                }
            }
            this._adjustActiveItemPosition(slideDirection, stepTaken);
            this._notifySlideChange(slideDirection, firstActiveSlide);
            this._changeDetectorRef.detectChanges();
        }
    }

    /**
     * @hidden Making slides visible when slides are dragged. Otherwise, it looses the effect.
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

    /**
     * @hidden
     * Resizes inner carousel container to fit all items in the viewport and hide those which are not fully in it.
     */
    private _resizeContentContainer(): void {
        merge(
            resizeObservable(this.slideContainer.nativeElement),
            resizeObservable(this.carouselContainer.nativeElement)
        )
            .pipe(debounceTime(100), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                const { width, slides } = this._getFittingSlidesAndWidth();

                if (this.visibleSlidesCount === 'auto') {
                    this._visibleSlidesNumericCount = slides;
                    const totalSlides = this.slides.length;

                    let needleSlideIndex = this.currentActiveSlidesStartIndex;

                    // If amount of slides insufficient to fill whole carousel, slide back a bit.
                    if (this.currentActiveSlidesStartIndex + slides > totalSlides) {
                        needleSlideIndex =
                            this.currentActiveSlidesStartIndex -
                            (this.currentActiveSlidesStartIndex + slides - totalSlides);
                    }

                    const needleSlide = this.slides.get(needleSlideIndex);

                    this.currentActiveSlidesStartIndex = needleSlideIndex;

                    this._carouselService.active = needleSlide;

                    // Refresh carousel config and transition to the current slide.
                    this._initializeCarousel();

                    needleSlide && this._carouselService.goToItem(needleSlide);
                    this._notifySlideChange(SlideDirection.None);
                }

                if (this._slidesWrapperSize !== width) {
                    this._slidesWrapperSize = width;
                }

                this._changeDetectorRef.detectChanges();
            });
    }

    /**
     * @hidden
     * Calculates how many slides can be shown within current carousel viewport.
     * @returns Object containing fitting slides count and total width of those slides.
     */
    private _getFittingSlidesAndWidth(): FittingSlidesAndWidth {
        if (!this.carouselContainer) {
            return {
                width: 0,
                slides: 1
            };
        }
        const { width } = this.carouselContainer.nativeElement.getBoundingClientRect();
        let maxSize = 0;
        let slidesCount = 0;
        const carouselSlides = this.slides.toArray();
        const previousSlides = carouselSlides.splice(0, this.currentActiveSlidesStartIndex);
        const getSlides = (slides: CarouselItemComponent[]): void => {
            for (const slide of slides) {
                const slideWidth = slide.getWidth();
                if (!slideWidth) {
                    break;
                }
                const newSize = maxSize + slideWidth;
                if (newSize > width) {
                    break;
                }
                maxSize = newSize;
                slidesCount++;
            }
        };
        getSlides(carouselSlides);

        // If with of the rest of the slides is lesser than carouse's viewport, add previous slides to it.
        if (maxSize < width) {
            getSlides(previousSlides);
        }
        return {
            width: maxSize,
            slides: slidesCount
        };
    }

    /** @hidden */
    private _getVisibleSlidesCount(): number {
        if (this._visibleSlidesCount !== 'auto') {
            return this._visibleSlidesCount;
        }
        const { slides } = this._getFittingSlidesAndWidth();
        return slides;
    }
}
