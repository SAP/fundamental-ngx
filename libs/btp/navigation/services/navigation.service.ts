import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { Subject, of } from 'rxjs';
import { FdbNavigationListItem } from '../models/navigation-list-item.class';

@Injectable()
export class NavigationService {
    /** Stream to close all popovers except provided one. */
    readonly closePopoverExcept$ = new Subject<FdbNavigationListItem>();
    /** Currently active list item. */
    readonly currentItem$ = new Subject<FdbNavigationListItem>();

    /** Items that are currently are hidden under "More" button */
    readonly hiddenItems$ = signal<FdbNavigationListItem[]>([]);

    /** List of all navigation items. */
    readonly allItems$ = signal<FdbNavigationListItem[]>([]);

    /** @hidden */
    readonly horizontal$ = signal(false);

    /** @hidden */
    readonly isSnapped$ = signal(false);

    /** Stream emitted when recalculation of visible items was requested. */
    readonly recalculateVisibleItems$ = new Subject<void>();

    /** @hidden */
    _recalculationInProgress = false;

    /** @hidden */
    private readonly _rtl$ = toSignal(inject(RtlService, { optional: true })?.rtl || of(false));

    /** @hidden */
    private _overflowKeyManager: FocusKeyManager<FdbNavigationListItem>;

    /** @hidden */
    private _rootKeyManager: FocusKeyManager<FdbNavigationListItem>;

    /** @hidden */
    constructor() {
        effect(() => {
            const hiddenItems = this.hiddenItems$();
            this._overflowKeyManager?.destroy();
            this._overflowKeyManager = new FocusKeyManager(hiddenItems).withVerticalOrientation();
        });

        effect(() => {
            this._updateKeyManager(this.allItems$(), this.horizontal$(), this._rtl$() || false);
        });
    }

    /** Request visible items recalculation. */
    recalculateVisibleItems(): void {
        if (this._recalculationInProgress) {
            return;
        }
        this.recalculateVisibleItems$.next();
    }

    /** Get currently active item on the root level. */
    getRootActiveItem(): FdbNavigationListItem | null {
        return this._rootKeyManager.activeItem;
    }

    /** Set currently active item on the root level. */
    setRootActiveItem(item: FdbNavigationListItem): void {
        this._rootKeyManager.setActiveItem(item);
        this.closePopoverExcept$.next(item);
    }

    /** Set currently active item on the overflow level. */
    setActiveOverflowItem(item: FdbNavigationListItem): void {
        this._overflowKeyManager.setActiveItem(item);
    }

    /** Callback function for keyboard navigation of the root level items. */
    onRootKeyDown(event: KeyboardEvent): void {
        const navigationKeys = this.horizontal$() ? [LEFT_ARROW, RIGHT_ARROW] : [UP_ARROW, DOWN_ARROW];
        if (!KeyUtil.isKeyCode(event, navigationKeys)) {
            return;
        }

        event.preventDefault();

        this._rootKeyManager.onKeydown(event);
    }

    /** @hidden */
    handleArrowNavOnRoot(event: KeyboardEvent, item: FdbNavigationListItem): void {
        if (item.normalizedLevel$() !== 2 || !item.hasChildren$() || !KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            return;
        }

        event.preventDefault();

        item.popoverOpen$.set(true);
        setTimeout(() => {
            item.firstChildList?.setActiveItemIndex(0);
        });
    }

    /** @hidden */
    overflowMenuKeydown(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW])) {
            return;
        }
        event.stopImmediatePropagation();
        this._overflowKeyManager.onKeydown(event);
    }

    /** @hidden */
    linkKeydownHandler(event: KeyboardEvent, inPopover: boolean, listItem: Nullable<FdbNavigationListItem>): void {
        if (this.horizontal$() || !listItem) {
            return;
        }
        if (inPopover && KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            listItem?.popoverLinkArrowDown();
            return;
        }
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }

        const expansionKey = !this._rtl$() ? RIGHT_ARROW : LEFT_ARROW;

        this._onItemKeyboardExpansion(KeyUtil.isKeyCode(event, expansionKey), listItem);
    }

    /** @hidden */
    overflowButtonKeydownHandler(event: KeyboardEvent, item: FdbNavigationListItem): void {
        if (!this.horizontal$()) {
            this._overflowButtonVerticalNavKeydownPopoverToggle(event, item);
        } else {
            this._overflowButtonHorizontalNavKeydownPopoverToggle(event, item);
        }
    }

    /** @hidden */
    private _overflowButtonVerticalNavKeydownPopoverToggle(event: KeyboardEvent, item: FdbNavigationListItem): void {
        if (!KeyUtil.isKeyCode(event, [LEFT_ARROW, RIGHT_ARROW])) {
            return;
        }
        const isRtl = this._rtl$();

        const isOpenAction = KeyUtil.isKeyCode(event, isRtl ? LEFT_ARROW : RIGHT_ARROW);

        // If user clicked on popover opener button, and then tried to use keyboard, simply shift focus to the first item in the popover menu.
        if (isOpenAction && item.popoverOpen$()) {
            item.listItems.find((i) => !i.separator && !i.spacer)?.focus();
            return;
        }

        item.popoverOpen$.set(isOpenAction);
    }

    /** @hidden */
    private _overflowButtonHorizontalNavKeydownPopoverToggle(event: KeyboardEvent, item: FdbNavigationListItem): void {
        if (!KeyUtil.isKeyCode(event, [ENTER, SPACE, DOWN_ARROW])) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW) && item.popoverOpen$()) {
            item.listItems.find((i) => !i.separator && !i.spacer)?.focus();
            return;
        }

        item.togglePopover();
    }

    /** @hidden */
    private _onItemKeyboardExpansion(shouldExpand: boolean, item: FdbNavigationListItem): void {
        if (item.isOverflow$()) {
            this._overflowItemKeyboardExpandedHandler(shouldExpand, item);
        } else if (this.isSnapped$()) {
            this._snappedItemKeyboardExpandedHandler(shouldExpand, item);
        } else {
            this._visibleItemKeyboardExpandedHandler(shouldExpand, item);
        }
    }

    private _overflowItemKeyboardExpandedHandler(shouldExpand: boolean, item: FdbNavigationListItem): void {
        if (shouldExpand && item.childLists.length > 0) {
            item.firstChildList?.setActiveItemIndex(0);
        }
        if (shouldExpand && !item.popoverOpen$()) {
            item.popoverOpen$.set(true);
        }
        if (!shouldExpand && item.popoverOpen$()) {
            item.popoverOpen$.set(false);
            item.link$()?.focus();
        }
    }

    /** @hidden */
    private _snappedItemKeyboardExpandedHandler(shouldExpand: boolean, item: FdbNavigationListItem): void {
        if (!item.hasChildren$()) {
            return;
        }
        if (shouldExpand && !item.popoverOpen$()) {
            item.popoverOpen$.set(true);
        }
        if (!shouldExpand && item.popoverOpen$()) {
            item.popoverOpen$.set(false);
            item.link$()?.focus();
        }
    }

    /** @hidden */
    private _visibleItemKeyboardExpandedHandler(shouldExpand: boolean, item: FdbNavigationListItem): void {
        if (!item.hasChildren$()) {
            if (!shouldExpand) {
                item.parentListItem?.focus();
            }
            return;
        }

        if (!shouldExpand) {
            // If item already collapsed, shift focus to parent link
            if (!item.expanded$()) {
                item.parentListItem?.focus();
                return;
            }
            item.expanded$.set(false);
        } else {
            if (item.expanded$()) {
                item.listItems.first?.focus();
                return;
            }
            item.expanded$.set(true);
        }
    }

    /** @hidden */
    private _updateKeyManager(items: FdbNavigationListItem[], horizontal: boolean, rtl: boolean): void {
        const oldActiveIndex = this._rootKeyManager?.activeItemIndex || -1;
        this._rootKeyManager?.destroy();
        this._rootKeyManager = new FocusKeyManager(items)
            .skipPredicate((item) => !item.isVisible$() || item.skipNavigation)
            .withVerticalOrientation(!horizontal)
            .withHorizontalOrientation(!horizontal ? null : !rtl ? 'ltr' : 'rtl');
        this._rootKeyManager.setActiveItem(oldActiveIndex);
    }
}
