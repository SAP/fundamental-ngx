import { NgTemplateOutlet } from '@angular/common';
import {
    afterNextRender,
    Component,
    computed,
    contentChildren,
    DestroyRef,
    effect,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    signal,
    viewChild,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { SidePanelItemComponent } from './side-panel-item.component';

/** Edge the side panel is anchored to. */
export type SidePanelSide = 'left' | 'right';

let _overflowListIdCounter = 0;

/** Display mode of the side panel action bar. */
export type SidePanelMode = 'collapsed' | 'expanded';

/**
 * The Side Panel is a container anchored to an edge of the page. It is reached through a
 * vertical action-button bar where each button represents a content group.
 *
 * Supports collapsed (icons-only) and expanded (icons + labels) action bar modes, a
 * slide-in content panel, automatic overflow into a popover, and full keyboard navigation.
 *
 * ```html
 * <fd-side-panel side="right" [(activeItem)]="activeGroup">
 *     <fd-side-panel-item icon="filter" label="Filter">
 *         <ng-template fdSidePanelContent>...</ng-template>
 *     </fd-side-panel-item>
 *     <fd-side-panel-item icon="menu2" label="Layout">
 *         <ng-template fdSidePanelContent>...</ng-template>
 *     </fd-side-panel-item>
 * </fd-side-panel>
 * ```
 */
@Component({
    selector: 'fd-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrl: './side-panel.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [IconComponent, NgTemplateOutlet, PopoverBodyComponent, PopoverComponent, PopoverControlComponent],
    providers: [contentDensityObserverProviders()],
    host: {
        '[class]': 'hostClasses()',
        '(keydown.escape)': 'onEscape($event)'
    }
})
export class SidePanelComponent {
    /** Edge the panel is anchored to. Defaults to `right`. */
    readonly side = input<SidePanelSide>('right');

    /** Accessible label for the action bar (`toolbar`). */
    readonly ariaLabel = input<string>();

    /**
     * Identifier of the currently active group, or `null` when none is active.
     * Two-way bindable; emits `activeItemChange` when it changes.
     */
    readonly activeItem = model<string | null>(null);

    /** Whether the content panel is open. Two-way bindable. */
    readonly open = model(false);

    /**
     * Default width of the content panel (CSS value, e.g. `'20rem'` or `'300px'`).
     * Effective when the viewport is ≥ 561px.
     */
    readonly defaultWidth = input<string>('20rem');

    /**
     * Minimum width of the content panel (CSS value, e.g. `'15rem'`).
     * The user cannot resize the panel narrower than this.
     */
    readonly minWidth = input<string>('15rem');

    /**
     * Maximum width of the content panel (CSS value, e.g. `'90%'`).
     * The user cannot resize the panel wider than this.
     */
    readonly maxWidth = input<string>('90%');

    /**
     * Display mode of the action bar.
     * - `'collapsed'` (default): icons-only, compact rail.
     * - `'expanded'`: 320px wide rail with labels beside each icon.
     * Two-way bindable; the nav arrow toggles this in multi-action mode.
     */
    readonly mode = model<SidePanelMode>('collapsed');

    /** @hidden Projected side panel items (content groups). */
    protected readonly items = contentChildren(SidePanelItemComponent);

    /** @hidden */
    protected readonly hostClasses = computed(() => {
        const classes = [`fd-side-panel`, `fd-side-panel--${this.side()}`];
        if (this.open()) {
            classes.push('fd-side-panel--open');
        }
        if (this.mode() === 'expanded') {
            classes.push('fd-side-panel--expanded');
        }
        if (this.isSingleAction()) {
            classes.push('fd-side-panel--single-action');
        }
        return classes.join(' ');
    });

    /** @hidden Icon for the navigation arrow toggle button. */
    protected readonly navArrowIcon = computed(() => {
        const isRight = this.side() === 'right';
        const isRtl = this._isRtl();
        // isContentOnRight: content area is to the physical right of the panel bar.
        // right+LTR → content left (false) | right+RTL → content right (true)
        // left+LTR  → content right (true)  | left+RTL  → content left  (false)
        const isContentOnRight = isRight === isRtl;
        if (this.isNavArrowExpanded()) {
            return isContentOnRight ? 'navigation-left-arrow' : 'navigation-right-arrow';
        }
        return isContentOnRight ? 'slim-arrow-right' : 'slim-arrow-left';
    });

    /** @hidden Index of the roving-tabindex focus target; resets to the active item. */
    protected readonly focusedIndex = linkedSignal<number>(() => {
        const activeId = this.activeItem();
        const visible = this.visibleItemCount();
        const index = this.items().findIndex((item) => item.id() === activeId);
        return index > -1 && index < visible ? index : 0;
    });

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden True when only one item is projected; changes the nav arrow behaviour. */
    protected readonly isSingleAction = computed(() => this.items().length === 1);

    /**
     * @hidden Whether the nav arrow should render in its "expanded" state.
     * - Single-action: expanded = content panel open.
     * - Multi-action: expanded = icons+label mode active.
     */
    protected readonly isNavArrowExpanded = computed(() =>
        this.isSingleAction() ? this.open() : this.mode() === 'expanded'
    );

    /** @hidden Index of the action-container that currently shows a focus ring, or -1. */
    protected readonly focusedContainerIndex = signal(-1);

    /** @hidden Label of the currently active group, used as the content panel's accessible name. */
    protected readonly activeGroupLabel = computed(
        () =>
            this.items()
                .find((item) => item.id() === this.activeItem())
                ?.label() ?? ''
    );

    /** @hidden Icon glyph of the currently active group, shown in the content panel header. */
    protected readonly activeGroupIcon = computed(
        () =>
            this.items()
                .find((item) => item.id() === this.activeItem())
                ?.icon() ?? ''
    );

    /** @hidden Whether the overflow popover is open. */
    protected readonly overflowOpen = signal(false);

    /** @hidden Tracks keyboard focus on the overflow toggle button — drives the is-focused container ring. */
    protected readonly overflowToggleFocused = signal(false);

    /** @hidden Preferred placement of the overflow popover relative to the action bar side. */
    protected readonly overflowPlacement = computed(() => (this.side() === 'right' ? 'left-end' : 'right-end'));

    /** @hidden Unique id for the overflow `<ul>` so the open effect can scope its focus query. */
    protected readonly overflowListId = `fd-side-panel-overflow-${++_overflowListIdCounter}`;

    /**
     * @hidden Number of items that fit in the visible action bar without overflowing.
     * Computed from measured heights; returns the total item count when measurements are unavailable.
     */
    protected readonly visibleItemCount = computed(() => {
        const avail = this._availBarHeight();
        const navH = this._navContainerH();
        const itemH = this._itemContainerH();
        const gap = this._itemGapPx();
        const total = this.items().length;

        if (!itemH || !avail) {
            return total;
        }

        const maxFit = Math.floor((avail - navH) / (itemH + gap));

        if (maxFit >= total) {
            return total;
        }
        return Math.max(0, maxFit - 1);
    });

    /** @hidden Items that overflow the visible action bar area. */
    protected readonly overflowItems = computed(() => this.items().slice(this.visibleItemCount()));

    /** @hidden Action button elements, in projection order. */
    private readonly _actionButtons = viewChildren<ElementRef<HTMLButtonElement>>('actionButton');

    private readonly _actionBar = viewChild<ElementRef<HTMLDivElement>>('actionBar');
    private readonly _contentPanelClose = viewChild<ElementRef<HTMLButtonElement>>('contentPanelClose');
    private readonly _navArrowRef = viewChild<ElementRef<HTMLButtonElement>>('navArrow');
    private readonly _overflowToggleRef = viewChild<ElementRef<HTMLButtonElement>>('overflowToggle');
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _availBarHeight = signal(0);
    private readonly _navContainerH = signal(0);
    private readonly _itemContainerH = signal(0);
    private readonly _itemGapPx = signal(0);

    private readonly _rtlService = inject(RtlService, { optional: true });
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Whether the content panel was open when the action bar was expanded. */
    private _contentWasOpen = false;

    constructor() {
        // Focus the first overflow item whenever the popover opens — regardless of trigger.
        // Pressing Enter on the overflow toggle is intercepted by fd-popover's own keydown.enter
        // host binding, which calls preventDefault() (suppressing the button's synthetic click)
        // and opens the overlay directly via the service. That bypasses toggleOverflowOpen(), so
        // overflowOpen stays false until the service's isOpenChange subscription propagates back
        // and calls onOverflowOpenChange(true). By the time the effect sees overflowOpen=true the
        // overlay is already attached, so a single rAF is enough to find the item in the DOM.
        effect(() => {
            if (this.overflowOpen()) {
                requestAnimationFrame(() => {
                    if (this.overflowOpen()) {
                        document
                            .getElementById(this.overflowListId)
                            ?.querySelector<HTMLElement>('.fd-side-panel__overflow-item')
                            ?.focus();
                    }
                });
            }
        });

        afterNextRender(() => {
            const bar = this._actionBar()?.nativeElement;
            if (!bar) {
                return;
            }

            const measure = (): void => {
                const style = getComputedStyle(bar);
                const paddingBlockStart = parseFloat(style.paddingBlockStart) || 0;
                this._availBarHeight.set(bar.clientHeight - paddingBlockStart);
                this._itemGapPx.set(parseFloat(style.gap) || 0);

                const navContainer = bar.querySelector<HTMLElement>('.fd-side-panel__action-container');
                this._navContainerH.set(navContainer?.offsetHeight ?? 0);

                const firstItemContainer = bar.querySelectorAll<HTMLElement>('.fd-side-panel__action-container')[1];
                this._itemContainerH.set(firstItemContainer?.offsetHeight ?? 0);
            };

            const observer = new ResizeObserver(measure);
            observer.observe(bar);
            measure();

            this._destroyRef.onDestroy(() => observer.disconnect());
        });
    }

    /**
     * @hidden Handle nav arrow click.
     * - Multi-action: toggles `mode` between `'collapsed'` and `'expanded'`.
     *   When expanding, the content panel is closed (and its open state is saved);
     *   when collapsing, the content panel is restored if it was open before expanding.
     * - Single-action: toggles `open` and sets `activeItem` to the single item (or clears it).
     */
    protected toggleNavArrow(): void {
        if (this.isSingleAction()) {
            const item = this.items()[0];
            if (!item || item.disabled()) {
                return;
            }
            const newOpen = !this.open();
            this.open.set(newOpen);
            this.activeItem.set(newOpen ? item.id() : null);
            if (!newOpen) {
                // Focus returns to the action bar nav arrow after the panel closes.
                // rAF waits for the CSS display:none on the action bar to be cleared.
                requestAnimationFrame(() => {
                    this._navArrowRef()?.nativeElement.focus();
                });
            }
        } else {
            if (this.mode() === 'collapsed') {
                this._contentWasOpen = this.open();
                this.open.set(false);
                this.mode.set('expanded');
            } else {
                this.mode.set('collapsed');
                if (this._contentWasOpen) {
                    this.open.set(true);
                    this._contentWasOpen = false;
                }
            }
        }
    }

    /** @hidden Activate (or toggle off) the group behind an action button. */
    protected activate(item: SidePanelItemComponent, index: number): void {
        if (item.disabled()) {
            return;
        }
        this._focusItem(index);
        const id = item.id();
        const newActiveId = this.activeItem() === id ? null : id;
        this.activeItem.set(newActiveId);
        this.open.set(newActiveId !== null);
        // Selecting an item while expanded collapses the action bar so the
        // content panel and the bar together occupy the same footprint as
        // the expanded bar.
        if (this.mode() === 'expanded' && newActiveId !== null) {
            this.mode.set('collapsed');
        }
    }

    /** @hidden Close the content panel and return focus to the item's action button (or overflow toggle). */
    protected closeContentPanel(): void {
        const index = this.items().findIndex((item) => item.id() === this.activeItem());
        this.open.set(false);
        this.activeItem.set(null);
        if (index > -1) {
            if (index >= this.visibleItemCount()) {
                this._overflowToggleRef()?.nativeElement.focus();
            } else {
                this._focusItem(index);
            }
        }
    }

    /** @hidden Track focus for the full-row focus ring. */
    protected onActionFocus(index: number): void {
        this.focusedContainerIndex.set(index);
    }

    /** @hidden Clear the full-row focus ring on blur. */
    protected onActionBlur(): void {
        this.focusedContainerIndex.set(-1);
    }

    /** @hidden Vertical roving-tabindex navigation across the action bar. */
    protected onKeydown(event: KeyboardEvent): void {
        if (this.isSingleAction()) {
            return;
        }
        const visible = this.visibleItemCount();
        if (visible === 0) {
            return;
        }
        const hasOverflow = this.overflowItems().length > 0;

        // Derive current slot from DOM focus so stale focusedIndex() (reset by ResizeObserver)
        // never causes navigation to jump back to item 0 mid-sequence.
        const buttons = this._actionButtons();
        const domFocusedIndex = buttons.findIndex((b) => b.nativeElement === document.activeElement);
        const currentSlot =
            hasOverflow && document.activeElement === this._overflowToggleRef()?.nativeElement
                ? visible
                : domFocusedIndex >= 0
                  ? domFocusedIndex
                  : this.focusedIndex();

        let nextIndex: number;
        switch (event.key) {
            case 'ArrowDown':
                nextIndex = this._nextNavSlot(currentSlot, 1);
                break;
            case 'ArrowUp':
                nextIndex = this._nextNavSlot(currentSlot, -1);
                break;
            case 'Home':
                nextIndex = this._nextEnabledIndex(-1, 1);
                break;
            case 'End':
                // Land on the overflow toggle (last slot) when it exists.
                nextIndex = hasOverflow ? visible : this._nextEnabledIndex(visible, -1);
                break;
            default:
                return;
        }
        event.preventDefault();
        this._focusSlot(nextIndex);
    }

    /** @hidden Open or close the overflow popover. */
    protected toggleOverflowOpen(): void {
        this.overflowOpen.set(!this.overflowOpen());
    }

    /**
     * @hidden Syncs the overflowOpen signal when the popover closes itself
     * (click-outside, service-initiated close).
     */
    protected onOverflowOpenChange(isOpen: boolean): void {
        this.overflowOpen.set(isOpen);
    }

    /** @hidden Close the overflow popover and activate the selected overflow item. */
    protected activateOverflowItem(item: SidePanelItemComponent): void {
        this.overflowOpen.set(false);
        const index = this.items().indexOf(item);
        this.activate(item, index);
        // After activation the @if(open()) block renders the content panel.
        // One rAF is enough for Angular's CD to stamp it so the viewChild resolves.
        requestAnimationFrame(() => {
            this._contentPanelClose()?.nativeElement.focus();
        });
    }

    /** @hidden Keyboard navigation inside the overflow popover. */
    protected onOverflowKeydown(event: KeyboardEvent): void {
        // Escape closes the overflow regardless of whether items are present.
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.overflowOpen.set(false);
            this._overflowToggleRef()?.nativeElement.focus();
            return;
        }

        // event.currentTarget is the <ul> itself — scoped even when the popover body
        // lives in the CDK overlay container outside this component's host element.
        const list = event.currentTarget as HTMLElement;
        const items = Array.from(list.querySelectorAll<HTMLElement>('.fd-side-panel__overflow-item'));
        if (!items.length) {
            return;
        }

        const currentIndex = items.indexOf(document.activeElement as HTMLElement);
        const safeIndex = currentIndex < 0 ? 0 : currentIndex;

        switch (event.key) {
            case 'ArrowDown': {
                event.preventDefault();
                items[(currentIndex + 1) % items.length].focus();
                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                items[(safeIndex - 1 + items.length) % items.length].focus();
                break;
            }
            case 'Enter':
            case ' ': {
                event.preventDefault();
                items[currentIndex]?.click();
                break;
            }
        }
    }

    /** @hidden Escape key handler (host-level): close content panel when open, or collapse expanded mode. */
    protected onEscape(event: Event): void {
        if (this.open()) {
            event.preventDefault();
            if (this.isSingleAction()) {
                this.toggleNavArrow();
            } else {
                this.closeContentPanel();
            }
        } else if (this.mode() === 'expanded') {
            event.preventDefault();
            this.mode.set('collapsed');
            if (this._contentWasOpen) {
                this.open.set(true);
                this._contentWasOpen = false;
            }
        }
    }

    /** @hidden Find the next non-disabled item index within the visible range, wrapping around. */
    private _nextEnabledIndex(from: number, step: number): number {
        const items = this.items();
        const count = this.visibleItemCount(); // only navigate within visible items
        let index = from;
        for (let i = 0; i < count; i++) {
            index = (index + step + count) % count;
            if (!items[index].disabled()) {
                return index;
            }
        }
        return Math.max(0, Math.min(from, count - 1));
    }

    /**
     * @hidden Find the next keyboard-navigable slot, including the overflow toggle.
     * Slot indices 0..(visibleItemCount-1) are action buttons; slot `visibleItemCount` is the toggle.
     */
    private _nextNavSlot(current: number, step: number): number {
        const visible = this.visibleItemCount();
        const hasOverflow = this.overflowItems().length > 0;
        const navCount = visible + (hasOverflow ? 1 : 0);
        const items = this.items();
        let index = current;
        for (let i = 0; i < navCount; i++) {
            index = (index + step + navCount) % navCount;
            if (index === visible) {
                return index; // overflow toggle is always enabled
            }
            if (!items[index].disabled()) {
                return index;
            }
        }
        return current;
    }

    /** @hidden Move roving focus to the given index. */
    private _focusItem(index: number): void {
        this.focusedIndex.set(index);
        this._actionButtons()[index]?.nativeElement.focus();
    }

    /**
     * @hidden Focus either an action button (index < visibleItemCount) or the overflow toggle
     * (index === visibleItemCount). Does not update focusedIndex when focusing the toggle, so
     * the roving-tabindex target among action buttons is preserved.
     */
    private _focusSlot(index: number): void {
        if (index === this.visibleItemCount()) {
            this._overflowToggleRef()?.nativeElement.focus();
        } else {
            this._focusItem(index);
        }
    }
}
