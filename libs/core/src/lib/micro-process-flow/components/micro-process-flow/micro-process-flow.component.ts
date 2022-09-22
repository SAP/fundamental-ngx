import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyUtil, RtlService } from '@fundamental-ngx/core/utils';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, startWith } from 'rxjs/operators';
import { MicroProcessFlowFocusableItemDirective } from '../../micro-process-flow-focusable-item.directive';
import { MicroProcessFlowItemComponent } from '../micro-process-flow-item/micro-process-flow-item.component';
import { MICRO_PROCESS_FLOW } from '../../injection-tokens';
import {
    ContentDensityObserver,
    contentDensityObserverProviders,
    ContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-micro-process-flow',
    templateUrl: './micro-process-flow.component.html',
    styleUrls: ['./micro-process-flow.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-micro-process-flow',
        '[class.fd-micro-process-flow--independent-steps]': 'independentSteps'
    },
    providers: [
        {
            provide: MICRO_PROCESS_FLOW,
            useExisting: MicroProcessFlowComponent
        },
        contentDensityObserverProviders({
            modifiers: { [ContentDensityMode.COMPACT]: 'fd-micro-process-flow--compact' }
        }),
        skeletonConsumerProviders({ width: '60%', height: '2.25rem' })
    ]
})
export class MicroProcessFlowComponent implements OnInit, OnDestroy, AfterViewInit {
    /** Should connector between items be hidden. */
    @Input()
    independentSteps = false;

    /** Pagination transition speed in milliseconds */
    @Input()
    transitionSpeed = 300;

    /** Pagination transition effect */
    @Input()
    transitionTimingFunction = 'ease';

    /** Micro process flow items. */
    @ContentChildren(MicroProcessFlowItemComponent)
    items: QueryList<MicroProcessFlowItemComponent>;

    /** Micro process flow items. */
    @ContentChildren(MicroProcessFlowFocusableItemDirective, { descendants: true })
    focusableItems: QueryList<MicroProcessFlowFocusableItemDirective>;

    /**
     * Previous items outside the viewport.
     */
    previousItemsCount = 0;

    /**
     * Next items outside the viewport.
     */
    nextItemsCount = 0;

    /** Indicating whether or not any element is focused */
    canItemsReceiveFocus = new Subject<boolean>();

    /** Should show next button. */
    get showNextButton(): boolean {
        return this.nextItemsCount > 0;
    }

    /** Should show previous button. */
    get showPreviousButton(): boolean {
        return this.previousItemsCount > 0;
    }

    /** @hidden */
    @ViewChild('wrapperContainer')
    private _wrapperContainer: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('container')
    private _container: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild('goNextButton')
    private _goNextButton: ElementRef<HTMLElement>;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private get _paginationDirection(): number {
        return this._isRtl ? 1 : -1;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _navigationKeys = [LEFT_ARROW, RIGHT_ARROW];

    private _actionKeys = [SPACE, ENTER];

    /** @hidden */
    private _focusedElementIndex = -1;

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _rtl: RtlService,
        private _contentDensityObserver: ContentDensityObserver,
        private readonly _skeletonConsumer: SkeletonConsumerDirective
    ) {
        _contentDensityObserver.subscribe();
        _skeletonConsumer.consume();
    }

    /** @hidden */
    ngOnInit(): void {
        // If any element is currently focused, disable ability to navigate bentween items with tab.
        this._subscriptions.add(
            this.canItemsReceiveFocus.pipe(debounceTime(10)).subscribe((value) => {
                if (value) {
                    this._setFocusableVisibleItems();
                } else {
                    this._disableFocusableItems();
                }
            })
        );

        if (this._rtl) {
            this._subscriptions.add(
                this._rtl.rtl.subscribe((value) => {
                    this._isRtl = value;

                    if (this.showPreviousButton) {
                        this._paginate(0);
                    }
                })
            );
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.listenOnItemsChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, this._navigationKeys)) {
            const isRightKey = KeyUtil.isKeyCode(event, RIGHT_ARROW);
            const direction = isRightKey ? 1 : -1;
            event.stopImmediatePropagation();

            const elementIndexToScroll = this._getPreviousItemsCount() + direction;
            const elementExists = this.items.get(elementIndexToScroll);

            if (!elementExists) {
                return;
            }

            this.previousItemsCount = 0;

            this._paginate(elementIndexToScroll);

            // Force browset not to scroll to the element since it's done with pagination function.
            this.items.get(this._getPreviousItemsCount())?.focusableElement?.focus({
                preventScroll: true
            });
        }
    }

    /** Listens on items change and checks if navigation buttons should be visible. */
    listenOnItemsChange(): void {
        this._subscriptions.add(
            this.items.changes.pipe(startWith(0)).subscribe(() => {
                this.items.forEach((item) => {
                    item.setLastItem(false);
                });

                this.items.last?.setLastItem(true);
                this._setNavigationButtons();
                this._paginate(0);
            })
        );
    }

    /** Scrolls to the next item. */
    goNext(): void {
        this._paginate();
    }

    /** Scrolls to the previous item. */
    goBack(): void {
        this._paginate(-1);
    }

    /**
     * Checks if navigation buttons should be visible depending on the amount of items
     * and current pagination offset.
     */
    private _setNavigationButtons(): void {
        if (this._container === undefined) {
            return;
        }

        const containerWidth = this._container.nativeElement.offsetWidth;
        const itemsWidth = this._wrapperContainer.nativeElement.offsetWidth;
        const nextButtonWidth = this._goNextButton?.nativeElement.offsetWidth || 0;

        if (itemsWidth < containerWidth) {
            return;
        }

        // Skip previously shown items out of the calculation.
        const itemsToDisplay = this.items
            .toArray()
            .slice(this.previousItemsCount)
            .map((i) => i.elRef);

        // Check if all items can be fitted inside the container if we remove 'next' button.
        if (this.previousItemsCount > 0) {
            const remainingWidth = itemsToDisplay.reduce((width, elm) => elm.nativeElement.offsetWidth + width, 0);

            if (remainingWidth <= nextButtonWidth + containerWidth) {
                this.nextItemsCount = 0;
                this._cd.detectChanges();
                return;
            }
        }

        this._setNextItemsCount(itemsToDisplay, containerWidth);
        this._cd.detectChanges();
    }

    /**
     * Sets last focused element index.
     * @param elm Focused HTML element.
     */
    setFocusedElementIndex(elm: HTMLElement): void {
        this._focusedElementIndex = this.focusableItems.toArray().findIndex((item) => item.elRef.nativeElement === elm);
    }

    /**
     * Navigates to a specific page when the user presses 'Space' or 'Enter' key.
     * @param offset How much items needs to be scrolled relatively to the hidden previous items.
     * @param event The keyboard event.
     */
    onKeypressHandler(offset: number, event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, this._actionKeys)) {
            event.preventDefault();
            this._paginate(offset);
        }
    }

    /**
     * Calculate how many items are out of the viewport.
     * @param itemsToDisplay Array of html elements that needs to be shown.
     * @param containerWidth Width of the parent container to calculate amount of items possible to fit.
     */
    private _setNextItemsCount(itemsToDisplay: ElementRef<HTMLElement>[], containerWidth: number): void {
        let visibleItemsWidth = 0;
        let newVisibleItemsWidth = 0;

        for (const [index, item] of itemsToDisplay.entries()) {
            newVisibleItemsWidth = visibleItemsWidth + item.nativeElement.offsetWidth;

            if (newVisibleItemsWidth <= containerWidth) {
                visibleItemsWidth = newVisibleItemsWidth;
            } else {
                this.nextItemsCount = itemsToDisplay.length - index;
                break;
            }
        }
    }

    /**
     * @hidden
     * Performs scrolling to the defined element based on the offset argument.
     * @param offset How much items needs to be scrolled relatively to the hidden previous items.
     */
    private _paginate(offset: number = 1): void {
        if (this.items === undefined || this.items.length === 0) {
            return;
        }

        this.previousItemsCount = this._focusedElementIndex = this.previousItemsCount + offset;

        // We need to set prev button first.
        this._setNavigationButtons();
        this._setFocusableVisibleItems();

        const currentItem = this.items.get(this.previousItemsCount);
        const containerWidth = this._container.nativeElement.offsetWidth;
        const wrapperContainerWidth = this._wrapperContainer.nativeElement.offsetWidth;

        if (!currentItem || containerWidth >= wrapperContainerWidth) {
            // Cancel pagination and revert previous items count back.
            this.previousItemsCount = this.previousItemsCount - offset;
        }

        const elmOffset = this._getPreviousItemsWidth();

        this._wrapperContainer.nativeElement.style.transform = `translateX(${elmOffset * this._paginationDirection}px)`;

        this._setNavigationButtons();
        this._setFocusableVisibleItems();
    }

    /**
     * @hidden
     * Calculates total width of previously shown items.
     * @returns {Number} total width of previously shown items.
     */
    private _getPreviousItemsWidth(): number {
        return this.items
            .toArray()
            .slice(0, this.previousItemsCount)
            .reduce((width, item) => item.elRef.nativeElement.offsetWidth + width, 0);
    }

    private _disableFocusableItems(): void {
        this.items.forEach((item) => item.focusableElement?.setFocusable(false));
    }

    /** @hidden */
    private _setFocusableVisibleItems(): void {
        this._disableFocusableItems();

        const containerWidth = this._container.nativeElement.offsetWidth;

        const itemsToDisplay = this.items.toArray().slice(this.previousItemsCount);

        let visibleItemsWidth = 0;
        let newVisibleItemsWidth = 0;

        for (const item of itemsToDisplay) {
            newVisibleItemsWidth = visibleItemsWidth + item.elRef.nativeElement.offsetWidth;

            if (newVisibleItemsWidth <= containerWidth) {
                visibleItemsWidth = newVisibleItemsWidth;
                item.focusableElement?.setFocusable(true);
            } else {
                break;
            }
        }
    }

    /** @hidden */
    private _getPreviousItemsCount(): number {
        return this._focusedElementIndex === -1 ? this.previousItemsCount : this._focusedElementIndex;
    }
}
