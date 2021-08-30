import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    OnInit,
    OnDestroy,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';
import { ContentDensityService, RtlService } from '@fundamental-ngx/core/utils';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { MicroProcessFlowItemComponent } from '../micro-process-flow-item/micro-process-flow-item.component';

@Component({
    selector: 'fd-micro-process-flow',
    templateUrl: './micro-process-flow.component.html',
    styleUrls: ['./micro-process-flow.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-micro-process-flow',
        '[class.fd-micro-process-flow--independent-steps]': 'independentSteps === true',
        '[class.fd-micro-process-flow--compact]': 'compact === true'
    }
})
export class MicroProcessFlowComponent implements OnInit, OnDestroy, AfterViewInit {

    /** Should connector between items be hidden. */
    @Input()
    independentSteps = false;

    /** Whether to apply compact mode to the micro process flow. */
    @Input()
    compact: boolean;

    /** Pagination transition speed */
    @Input()
    transitionSpeed = 0.3;

    /** Pagination transition effect */
    @Input()
    transitionTimingFunction = 'ease';

    /** Micro process flow items. */
    @ContentChildren(MicroProcessFlowItemComponent)
    items: QueryList<MicroProcessFlowItemComponent>;

    /** Previous items outside the viewport. */
    _previousItemsCount = 0;

    /** Next items outside the viewport. */
    _nextItemsCount = 0;

    /** Should show next button. */
    get _showNextButton(): boolean {
        return this._nextItemsCount > 0;
    }

    /** Should show previous button. */
    get _showPreviousButton(): boolean {
        return this._previousItemsCount > 0;
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
    private _currentOffset = 0;

    /** @hidden */
    private _isRtl = false;

    /** @hidden */
    private get _paginationDirection(): number {
        return this._isRtl ? 1 : -1;
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _rtl: RtlService,
        @Optional() private _contentDensityService: ContentDensityService
    ) { }

    /** @hidden */
    ngOnInit(): void {
        if (this._rtl) {
            this._subscriptions.add(this._rtl.rtl.subscribe((value) => {
                this._isRtl = value;

                if (this._showPreviousButton) {
                    this._paginate(0);
                }
            }));
        }

        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener
                .subscribe(density => {
                    this.compact = density !== 'cozy';
                    this._paginate(0);
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

    /** Listens on items change and checks if navigation buttons should be visible. */
    listenOnItemsChange(): void {
        this._subscriptions.add(this.items.changes.pipe(startWith(0)).subscribe(() => {
            this.items.forEach((item) => {
                item.setFinalStep(false);
            });

            this.items.last?.setFinalStep(true);
            this._setNavigationButtons();
            this._paginate(0);
        }));
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
        const nextButtonWidth = this._goNextButton?.nativeElement.offsetWidth;

        if (itemsWidth < containerWidth) {
            return;
        }

        // Skip previously shown items out of the calculation.
        const itemsToDisplay = this.items
            .toArray()
            .slice(this._previousItemsCount)
            .map((i) => i.elRef);

        // Check if all items can be fitted inside the container if we remove 'next' button.
        if (this._previousItemsCount > 0) {
            const remainingWidth = itemsToDisplay.reduce((width, elm) => elm.nativeElement.offsetWidth + width, 0);

            if (remainingWidth <= nextButtonWidth + containerWidth) {
                this._nextItemsCount = 0;
                this._cd.detectChanges();
                return;
            }
        }

        this._setNextItemsCount(itemsToDisplay, containerWidth);
        this._cd.detectChanges();
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
                this._nextItemsCount = itemsToDisplay.length - index;
                break;
            }
        }
    }

    /**
     * Performs scrolling to the defined element based on the offset argument.
     * @param offset How much items needs to be scrolled relatively to the hidden previous items.
     */
    private _paginate(offset: number = 1): void {
        if (this.items === undefined || this.items.length === 0) {
            return;
        }

        this._previousItemsCount = this._previousItemsCount + offset;

        this._setNavigationButtons();

        const currentItem = this.items.get(this._previousItemsCount);

        if (!currentItem) {
            return;
        }

        const elmOffset = currentItem.elRef.nativeElement.offsetWidth;
        this._currentOffset = this._currentOffset + (elmOffset * offset);
        this._wrapperContainer.nativeElement.style.transform = `translateX(${this._currentOffset * this._paginationDirection}px)`;

        this._setNavigationButtons();
    }
}
