import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    ChangeDetectorRef,
    ContentChild,
    HostBinding,
    ViewChild,
    ElementRef,
    NgZone,
    Output,
    EventEmitter,
    HostListener,
    Optional,
    TemplateRef,
    ViewChildren,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';
import { KeyUtil, resizeObservable, RtlService } from '@fundamental-ngx/core/utils';
import { debounceTime, distinctUntilChanged, filter, skip, Subject, Subscription } from 'rxjs';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowContainer } from './interfaces/overflow-container.interface';
import { OverflowExpand } from './interfaces/overflow-expand.interface';
import { OverflowItemRef } from './interfaces/overflow-item-ref.interface';
import { OverflowItem } from './interfaces/overflow-item.interface';
import { OverflowPopoverContent } from './interfaces/overflow-popover-content.interface';
import { FD_OVERFLOW_CONTAINER } from './tokens/overflow-container.token';
import { FD_OVERFLOW_EXPAND } from './tokens/overflow-expand.token';
import { FD_OVERFLOW_ITEM_REF } from './tokens/overflow-item-ref.token';
import { FD_OVERFLOW_ITEM } from './tokens/overflow-item.token';

@Component({
    selector: 'fd-overflow-layout',
    templateUrl: './overflow-layout.component.html',
    styleUrls: ['./overflow-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_OVERFLOW_CONTAINER,
            useExisting: OverflowLayoutComponent
        }
    ]
})
export class OverflowLayoutComponent implements AfterViewInit, OnDestroy, OverflowContainer {
    /**
     * Maximum amount of visible items.
     */
    @Input()
    set maxVisibleItems(value: number) {
        if (value === this._maxVisibleItems) {
            return;
        }
        this._maxVisibleItems = value;
        this.triggerRecalculation();
    }

    get maxVisibleItems(): number {
        return this._maxVisibleItems;
    }

    /**
     * Event, triggered when amount of visible items has been changed.
     */
    @Output()
    visibleItemsCount = new EventEmitter<number>();

    /**
     * Event, triggered when amount of hidden items has been changed.
     */
    @Output()
    hiddenItemsCount = new EventEmitter<number>();

    /**
     * @hidden
     * List of items to display.
     */
    @ContentChildren(FD_OVERFLOW_ITEM_REF)
    _items: QueryList<OverflowItemRef>;

    /**
     * @hidden
     * Template for the custom "More" button.
     */
    @ContentChild(FD_OVERFLOW_EXPAND)
    _moreButton: OverflowExpand;

    /**
     * @hidden
     * List of items that can be focused.
     */
    @ContentChildren(FD_OVERFLOW_ITEM)
    _overflowItems: QueryList<OverflowItem>;

    /**
     * @hidden
     * List of rendered items.
     */
    @ViewChildren(OverflowLayoutItemContainerDirective)
    _visibleItems: QueryList<OverflowLayoutItemContainerDirective>;

    /**
     * @hidden
     * Items wrapper directive.
     */
    @ViewChild('itemsWrapper')
    _itemsWrapper: ElementRef<HTMLElement>;

    /**
     * @hidden
     * Layout container element.
     */
    @ViewChild('layoutContainer')
    _layoutContainer: ElementRef<HTMLDivElement>;

    /**
     * @hidden
     * "More" button container element.
     */
    @ViewChild('showMoreContainer')
    _showMoreContainer: ElementRef<HTMLDivElement>;

    /** @hidden */
    _allItems: OverflowItemRef[] = [];

    /** @hidden */
    _hiddenItems: OverflowItemRef[] = [];

    /** @hidden */
    _showMore = false;

    /** @hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fd-overflow-layout';

    /** @hidden */
    private _keyboardEventsManager: FocusKeyManager<OverflowItem>;

    /** @hidden */
    private _listenToItemResize = true;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private _overflowPopoverContent: OverflowPopoverContent;

    /** @hidden */
    private _fillTrigger$ = new Subject<void>();

    /** @hidden */
    private _dir: 'rtl' | 'ltr' = 'ltr';

    /** @hidden */
    private _maxVisibleItems = Infinity;

    /** @hidden */
    constructor(
        private _cdr: ChangeDetectorRef,
        private _zone: NgZone,
        private _elRef: ElementRef,
        @Optional() private _rtlService: RtlService
    ) {
        this._subscription.add(this._fillTrigger$.pipe(debounceTime(30)).subscribe(() => this._fitVisibleItems()));
    }

    /**
     * Triggers layout recalculation of the items.
     */
    triggerRecalculation(): void {
        this._fillTrigger$.next();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    private _keyUpHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB)) {
            const index = this._allItems.findIndex(
                (item) => item.overflowItem?.focusable && item.elementRef.nativeElement === event.target
            );
            if (index !== -1) {
                this._keyboardEventsManager.setActiveItem(index);
            }
        }

        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            event.preventDefault();

            // passing the event to key manager so, we get a change fired
            this._keyboardEventsManager.onKeydown(event);
        }
    }

    /**
     * Sets current focused element.
     * @param element Element that needs to be focused.
     */
    setFocusedElement(element: OverflowItem): void {
        const index = this._overflowItems.toArray().findIndex((item) => item === element);

        if (index !== -1) {
            this._keyboardEventsManager.setActiveItem(index);
        }
    }

    /**
     * Registers popover content directive for main component.
     * @param content {OverflowPopoverContent} directive
     */
    registerPopoverContent(content: OverflowPopoverContent): void {
        this._overflowPopoverContent = content;
    }

    /** @hidden */
    _itemsTrackFn(_: number, item: OverflowItemRef): TemplateRef<any> {
        return item.templateRef;
    }

    /** @hidden */
    _onPopoverStateChange(opened: boolean): void {
        if (opened) {
            this._overflowPopoverContent?.focusFirstTabbableElement();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._fitVisibleItems();
        this._setFocusKeyManager();
        this._listenToChanges();
        this._subscribeToRtl();
    }

    /** @hidden */
    private _listenToChanges(): void {
        this._subscription.add(
            this._items.changes.subscribe(() => {
                setTimeout(() => {
                    this._fitVisibleItems();
                });
            })
        );

        this._listenToSizeChanges(this._elRef.nativeElement, this._itemsWrapper.nativeElement);
    }

    /** @hidden */
    private _listenToSizeChanges(...elements: HTMLElement[]): void {
        elements.forEach((element) =>
            this._subscription.add(
                resizeObservable(element)
                    .pipe(
                        skip(1),
                        filter(() => this._listenToItemResize),
                        distinctUntilChanged(),
                        debounceTime(30)
                    )
                    .subscribe(() => {
                        setTimeout(() => {
                            this._fitVisibleItems();
                        });
                    })
            )
        );
    }

    /** @hidden */
    private _fitVisibleItems(): void {
        this._listenToItemResize = false;
        this._allItems = this._items.toArray();
        this._visibleItems.forEach((i) => (i.containerRef.hidden = false));
        this._allItems.forEach((item, index) => {
            item.hidden = false;
            item.index = index;
        });
        this._cdr.detectChanges();
        const containerWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        const itemsContainerWidth = this._itemsWrapper.nativeElement.getBoundingClientRect().width;

        if (
            containerWidth >= itemsContainerWidth &&
            this._visibleItems.length <= this.maxVisibleItems &&
            this._hiddenItems.length === 0
        ) {
            this._showMore = false;
            this._cdr.detectChanges();
            this._listenToItemResize = true;
            return;
        }
        this._showMore = true;
        let fittingElmCount = 0;
        let fittingElmsWidth = 0;
        let shouldHideItems = false;
        this._cdr.detectChanges();

        const showMoreContainerWidth = this._showMoreContainer.nativeElement.getBoundingClientRect().width;
        let layoutWidth = this._layoutContainer.nativeElement.getBoundingClientRect().width;

        // Try to find all forced visible items
        const forcedItemsIndexes = this._getForcedItemsIndexes();

        forcedItemsIndexes.forEach((itemIndex) => {
            const container = this._visibleItems.get(itemIndex);
            if (!container) {
                return;
            }
            const elementSize = this._getElementWidth(container.elementRef.nativeElement);

            layoutWidth -= elementSize;
        });

        this._visibleItems.forEach((item, index) => {
            const itemRef = this._allItems[index];
            if (shouldHideItems && !itemRef.overflowItem.forceVisibility) {
                item.containerRef.hidden = true;
                itemRef.hidden = true;
                return;
            }

            const elementSize = this._getElementWidth(item.elementRef.nativeElement);
            const combinedWidth = fittingElmsWidth + elementSize;

            if (
                (combinedWidth <= layoutWidth ||
                    (item === this._visibleItems.last && combinedWidth <= layoutWidth + showMoreContainerWidth)) &&
                fittingElmCount < this.maxVisibleItems
            ) {
                fittingElmsWidth += elementSize;
                fittingElmCount++;
            } else if (!itemRef.overflowItem.forceVisibility) {
                shouldHideItems = true;
                item.containerRef.hidden = true;
                itemRef.hidden = true;
            }
        });

        this._hiddenItems = this._allItems.filter((i) => i.hidden);
        this.visibleItemsCount.emit(this._allItems.filter((i) => !i.hidden).length);
        this.hiddenItemsCount.emit(this._hiddenItems.length);

        this._showMore = this._hiddenItems.length > 0;

        this._cdr.detectChanges();

        this._listenToItemResize = true;
    }

    /** @hidden */
    private _setFocusKeyManager(): void {
        this._dir = this._rtlService?.rtl.value ? 'rtl' : 'ltr';
        this._keyboardEventsManager = new FocusKeyManager(this._overflowItems)
            .withWrap()
            .withHorizontalOrientation(this._dir)
            .skipPredicate((item) => !item.focusable || item.hidden);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            return;
        }

        const rtlSub = this._rtlService.rtl.subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';

            this._keyboardEventsManager = this._keyboardEventsManager.withHorizontalOrientation(isRtl ? 'rtl' : 'ltr');
        });

        this._subscription.add(rtlSub);
    }

    /** @hidden */
    private _getForcedItemsIndexes(): number[] {
        return this._allItems
            .map((item, index) => (item.overflowItem.forceVisibility ? index : -1))
            .filter((i) => i > -1);
    }

    /**
     * @hidden
     * Returns combined width of the element including margins.
     * @param element Element to calculate width of.
     */
    private _getElementWidth(element: HTMLElement): number {
        const elementStyle = getComputedStyle(element);
        const elementWidth = element.getBoundingClientRect().width;
        const elementSize = elementWidth + parseFloat(elementStyle.marginLeft) + parseFloat(elementStyle.marginRight);

        return elementSize;
    }
}
