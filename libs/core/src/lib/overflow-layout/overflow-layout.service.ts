import { FocusKeyManager } from '@angular/cdk/a11y';
import { ElementRef, Injectable, OnDestroy, Optional, QueryList } from '@angular/core';
import { resizeObservable, RtlService } from '@fundamental-ngx/core/utils';
import { debounceTime, distinctUntilChanged, filter, Observable, skip, Subject, Subscription } from 'rxjs';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowItemRef } from './interfaces/overflow-item-ref.interface';
import { OverflowItem } from './interfaces/overflow-item.interface';

export interface OverflowLayoutConfig {
    items: QueryList<OverflowItemRef>;
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
    showMore = false;
    items: OverflowItemRef[] = [];
    hiddenItems: OverflowItemRef[] = [];
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
    _keyboardEventsManager: FocusKeyManager<OverflowItem>;

    /** @hidden */
    private _listenToItemResize = true;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private _allItems: OverflowItemRef[] = [];

    /** @hidden */
    private _hiddenItems: OverflowItemRef[] = [];

    /** @hidden */
    private _overflowItems: OverflowItem[] = [];

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

    startListening(config: OverflowLayoutConfig): void {
        this.setConfig(config);
        this.fitVisibleItems();
        this._setFocusKeyManager();
        this._listenToChanges();
        this._subscribeToRtl();
    }

    setConfig(config: OverflowLayoutConfig): void {
        this.config = config;
    }

    private _emitResult(): void {
        this._result$.next(this.result);
    }

    /** @hidden */
    private _listenToChanges(): void {
        this._subscription.add(
            this.config.items.changes.subscribe(() => {
                setTimeout(() => {
                    this.fitVisibleItems();
                });
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

    /** @hidden */
    fitVisibleItems(): void {
        this._listenToItemResize = false;
        this._allItems = this.config.items.toArray();

        let allItems = this.config.items.toArray();
        let visibleContainerItems = this.config.visibleItems.toArray();

        allItems.forEach((item, index) => {
            // Softly hide previously completely hidden item in order to correctly calculate it's size.
            item.softHidden = true;
            item.hidden = false;
            item.index = index;
            item.first = index === 0;
            item.last = index === allItems.length - 1;
            visibleContainerItems[index].containerRef.hidden = false;
        });

        this._detectChanges$.next();

        allItems = this.config.direction === 'right' ? allItems : allItems.reverse();
        visibleContainerItems =
            this.config.direction === 'right' ? visibleContainerItems : visibleContainerItems.reverse();

        this.result.showMore = false;
        this._emitResult();
        const containerWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        const itemsContainerWidth = this.config.itemsWrapper.getBoundingClientRect().width;

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
            return;
        }
        this.result.showMore = true;
        this._emitResult();
        let fittingElmCount = 0;
        let fittingElmsWidth = 0;
        let shouldHideItems = false;

        const showMoreContainerWidth = Math.ceil(this.config.showMoreContainer.getBoundingClientRect().width);
        let layoutWidth = Math.ceil(this.config.layoutContainerElement.getBoundingClientRect().width);

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
                fittingElmCount < this.config.maxVisibleItems;

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
        hiddenItems = !this.config.reverseHiddenItems ? hiddenItems.reverse() : hiddenItems;
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

        this._listenToItemResize = true;
    }

    /** @hidden */
    private _setFocusKeyManager(): void {
        if (!this.config.enableKeyboardNavigation) {
            return;
        }
        this._dir = this._rtlService?.rtl.value ? 'rtl' : 'ltr';
        this._keyboardEventsManager = new FocusKeyManager(this._overflowItems)
            .withWrap()
            .withHorizontalOrientation(this._dir)
            .skipPredicate((item) => !item.focusable || item.hidden);
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
