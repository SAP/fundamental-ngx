import { FocusKeyManager } from '@angular/cdk/a11y';
import { ElementRef, Injectable, OnDestroy, Optional, QueryList } from '@angular/core';
import { resizeObservable, RtlService } from '@fundamental-ngx/core/utils';
import { debounceTime, distinctUntilChanged, filter, Observable, skip, Subject, Subscription } from 'rxjs';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowLayoutFocusableItem } from './interfaces/overflow-focusable-item.interface';
import { OverflowItemRef } from './interfaces/overflow-item-ref.interface';

export interface OverflowLayoutConfig {
    items: QueryList<OverflowItemRef>;
    focusableItems: QueryList<OverflowLayoutFocusableItem>;
    visibleItems: QueryList<OverflowLayoutItemContainerDirective>;
    itemsWrapper: HTMLElement;
    showMoreContainer: HTMLElement;
    layoutContainerElement: HTMLElement;
    maxVisibleItems: number;
    direction: 'left' | 'right';
    enableKeyboardNavigation: boolean;
    reverseHiddenItems: boolean;
}

export class OverflowLayoutListeningResult {
    /** Whether to show more button */
    showMore = false;

    /** Overflow item s */
    items: OverflowItemRef[] = [];

    /** Hidden overflow items */
    hiddenItems: OverflowItemRef[] = [];

    /** Visible overflow items */
    visibleItems: OverflowItemRef[] = [];
}

@Injectable()
export class OverflowLayoutService implements OnDestroy {
    /**
     * Overflow Layout config.
     */
    config: OverflowLayoutConfig;

    /**
     * Overflow Layout calculation result.
     */
    result = new OverflowLayoutListeningResult();

    /** @hidden */
    _keyboardEventsManager: FocusKeyManager<OverflowLayoutFocusableItem>;

    /** @hidden */
    private _listenToItemResize = true;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private _allItems: OverflowItemRef[] = [];

    /** @hidden */
    private _hiddenItems: OverflowItemRef[] = [];

    /** @hidden */
    private _detectChanges$ = new Subject<void>();

    /** @hidden */
    private _result$ = new Subject<OverflowLayoutListeningResult>();

    /** @hidden */
    private _dir: 'rtl' | 'ltr' = 'ltr';

    /**
     * Observable which emits when changes detection is required.
     */
    get detectChanges(): Observable<void> {
        return this._detectChanges$.asObservable();
    }

    /**
     * Observable which emits when new calculation result is available.
     */
    get onResult(): Observable<OverflowLayoutListeningResult> {
        return this._result$.asObservable();
    }

    /** @hidden */
    constructor(private _elRef: ElementRef<HTMLElement>, @Optional() private _rtlService: RtlService | null) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    startListening(config: OverflowLayoutConfig): void {
        this.setConfig(config);
        this.fitVisibleItems();
        this._setFocusKeyManager();
        this._listenToChanges();
        this._subscribeToRtl();
    }

    /** @hidden */
    setConfig(config: OverflowLayoutConfig): void {
        this.config = config;
    }

    /** @hidden */
    private _emitResult(): void {
        this._result$.next(this.result);
    }

    /** @hidden */
    private _listenToChanges(): void {
        this._subscription.add(
            this.config.items.changes.subscribe(() => {
                this.fitVisibleItems();
            })
        );

        this._listenToSizeChanges(this._elRef.nativeElement, this.config.itemsWrapper);
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
                            this.fitVisibleItems();
                        });
                    })
            )
        );
    }

    /**
     * Calculates available space for items and hides items that are not fitting into the container.
     */
    fitVisibleItems(): void {
        this._listenToItemResize = false;
        this._allItems = this.config.items.toArray();

        let allItems = this.config.items.toArray();
        let visibleContainerItems = this.config.visibleItems.toArray();

        this._elRef.nativeElement.style.height = `${this._elRef.nativeElement.clientHeight}px`;

        allItems.forEach((item, index) => {
            // Softly hide previously completely hidden item in order to correctly calculate it's size.
            item.softHidden = true;
            item.hidden = false;
            item.index = index;
            item.first = index === 0;
            item.last = index === allItems.length - 1;
            item.globalIndex = index;
            visibleContainerItems[index].containerRef.hidden = false;
        });

        this._detectChanges$.next();

        allItems = this.config.direction === 'right' ? allItems : allItems.reverse();
        visibleContainerItems =
            this.config.direction === 'right' ? visibleContainerItems : visibleContainerItems.reverse();

        this.result.showMore = false;
        this._emitResult();
        const containerWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        const itemsContainerWidth = allItems.reduce(
            (total, item) => total + this._getElementWidth(item.elementRef.nativeElement) || 0,
            0
        );

        if (
            containerWidth >= itemsContainerWidth &&
            this.config.visibleItems.length <= this.config.maxVisibleItems &&
            this._hiddenItems.length === 0
        ) {
            // Make all items fully visible.
            allItems.forEach((item) => {
                item.softHidden = false;
            });
            this.result.showMore = false;
            this.result.hiddenItems = this._hiddenItems;
            this._emitResult();
            this._listenToItemResize = true;
            this._elRef.nativeElement.style.height = '';
            return;
        }
        this.result.showMore = true;
        this._emitResult();
        let fittingElmCount = 0;
        let fittingElmsWidth = 0;
        let shouldHideItems = false;

        const showMoreContainerWidth = Math.ceil(this._getElementWidth(this.config.showMoreContainer));
        let layoutWidth = containerWidth - showMoreContainerWidth;

        // Try to find all forced visible items
        const forcedItemsIndexes = this._getForcedItemsIndexes();

        forcedItemsIndexes.forEach((itemIndex) => {
            const container = this.config.visibleItems.get(itemIndex);
            if (!container) {
                return;
            }
            const elementSize = this._getElementWidth(container.elementRef.nativeElement);

            layoutWidth -= elementSize;
        });

        const maxVisibleItems =
            this.config.maxVisibleItems -
            forcedItemsIndexes.filter((index) => index >= this.config.maxVisibleItems).length;

        if (layoutWidth < 0 && forcedItemsIndexes.length > 0) {
            console.warn(
                'There is no enough space to fit all forced visible items into the container. Please adjust their visibility accordingly.'
            );
        }

        this._detectChanges$.next();

        visibleContainerItems.forEach((item, index) => {
            const itemRef = allItems[index];
            if (shouldHideItems && !itemRef.overflowItem.forceVisibility) {
                item.containerRef.hidden = true;
                item.softHidden = false;
                itemRef.hidden = true;
                return;
            }

            const elementSize = this._getElementWidth(item.elementRef.nativeElement);
            const combinedWidth = fittingElmsWidth + elementSize;

            const condition =
                (combinedWidth <= layoutWidth ||
                    (item === this.config.visibleItems.last &&
                        combinedWidth <= layoutWidth + showMoreContainerWidth)) &&
                fittingElmCount < maxVisibleItems;

            if (condition) {
                fittingElmsWidth += elementSize;
                fittingElmCount++;
            } else if (!itemRef.overflowItem.forceVisibility) {
                shouldHideItems = true;
                item.softHidden = false;
                item.containerRef.hidden = true;
                itemRef.hidden = true;
            }
        });

        // Reverse original order back.
        allItems = this.config.direction === 'right' ? allItems : allItems.reverse();

        allItems.forEach((item) => {
            item.softHidden = false;
        });

        let hiddenItems = allItems.filter((i) => i.hidden);
        hiddenItems = this.config.reverseHiddenItems ? hiddenItems.reverse() : hiddenItems;
        const visibleItems = allItems.filter((i) => !i.hidden);

        visibleItems.forEach((item, index) => {
            item.index = index;
            item.first = index === 0;
            item.last = index === visibleItems.length - 1;
        });

        this._hiddenItems = hiddenItems.map((item, index) => {
            item.first = index === 0;
            item.last = index === hiddenItems.length - 1;
            item.index = index;
            return item;
        });

        this.result.showMore = this._hiddenItems.length > 0;
        this.result.hiddenItems = this._hiddenItems;
        this._emitResult();
        this._elRef.nativeElement.style.height = '';

        this._listenToItemResize = true;
    }

    /** @hidden */
    private _setFocusKeyManager(): void {
        if (!this.config.enableKeyboardNavigation) {
            return;
        }
        this._dir = this._rtlService?.rtl.value ? 'rtl' : 'ltr';
        this._keyboardEventsManager = new FocusKeyManager(this.config.focusableItems)
            .withWrap()
            .withHorizontalOrientation(this._dir)
            .withVerticalOrientation()
            .skipPredicate((item) => !item.navigable || item.hidden);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService || !this.config.enableKeyboardNavigation) {
            return;
        }

        this._subscription.add(
            this._rtlService.rtl.subscribe((isRtl) => {
                this._dir = isRtl ? 'rtl' : 'ltr';

                this._keyboardEventsManager = this._keyboardEventsManager.withHorizontalOrientation(this._dir);
            })
        );
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

        return Math.ceil(elementSize);
    }
}
