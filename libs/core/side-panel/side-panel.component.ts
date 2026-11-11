import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
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
import {
    MenuAddonDirective,
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { SidePanelItemComponent } from './side-panel-item.component';

/** Edge the side panel is anchored to. */
export type SidePanelSide = 'left' | 'right';

/** Display mode of the side panel action bar. */
export type SidePanelMode = 'collapsed' | 'expanded';

/**
 * The Side Panel is a container anchored to an edge of the page. It is reached through a
 * vertical action bar — a `toolbar` wrapping a `listbox` of `option` items, one per content group.
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
    imports: [
        IconComponent,
        NgTemplateOutlet,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuAddonDirective,
        MenuTitleDirective,
        MenuTriggerDirective
    ],
    providers: [contentDensityObserverProviders()],
    host: {
        '[class]': 'hostClasses()',
        '[attr.role]': "'region'",
        '[attr.aria-label]': 'sidePanelLabel()',
        '(keydown)': 'onHostKeydown($event)',
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

    /** @hidden Tracks keyboard focus on the overflow toggle button — drives the is-focused container ring. */
    protected readonly overflowToggleFocused = signal(false);

    /** @hidden Preferred placement of the overflow menu relative to the action bar side. */
    protected readonly overflowPlacement = computed(() => {
        // In LTR, a right panel has content to its left; in RTL flex-end shifts the bar to
        // the physical left, so content is to its right.  Mirror the navArrowIcon logic.
        const isContentOnRight = (this.side() === 'right') === this._isRtl();
        return isContentOnRight ? 'right-end' : 'left-end';
    });

    /**
     * @hidden Extra CSS classes applied to the overflow menu body so its edge aligns with the
     * separator line between the action bar and the content area.
     * The trigger button sits centred inside the action-container row (0.75rem cozy / 1rem compact
     * padding on each side); `fd-menu` places the menu body relative to the button's edge, so the
     * body is inset from the separator by one padding unit. `transform: translateX` compensates.
     */
    protected readonly overflowMenuBodyClass = computed(() => {
        const side = this.side();
        const density = this.contentDensityObserver.isCompactSignal() ? 'compact' : 'cozy';
        return `fd-side-panel__overflow-menu-body fd-side-panel__overflow-menu-body--${side} fd-side-panel__overflow-menu-body--${density}`;
    });

    /** @hidden */
    protected readonly navArrowExpandLabel = resolveTranslationSignal('coreSidePanel.navArrowExpand');
    /** @hidden */
    protected readonly navArrowCollapseLabel = resolveTranslationSignal('coreSidePanel.navArrowCollapse');
    /** @hidden */
    protected readonly overflowShowMoreLabel = resolveTranslationSignal('coreSidePanel.overflowShowMore');
    /** @hidden */
    protected readonly overflowShowLessLabel = resolveTranslationSignal('coreSidePanel.overflowShowLess');
    /** @hidden */
    protected readonly closePanelLabel = resolveTranslationSignal('coreSidePanel.closePanel');
    /** @hidden */
    protected readonly closeLabel = resolveTranslationSignal('coreSidePanel.close');
    /** @hidden Accessible name of the side panel region landmark (host). */
    protected readonly sidePanelLabel = resolveTranslationSignal('coreSidePanel.sidePanelLabel');
    /** @hidden */
    protected readonly expandedAnnouncement = resolveTranslationSignal('coreSidePanel.expandedAnnouncement');
    /** @hidden */
    protected readonly collapsedAnnouncement = resolveTranslationSignal('coreSidePanel.collapsedAnnouncement');

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

    /** @hidden Action option (`<li role="option">`) elements, in projection order. */
    private readonly _actionOptions = viewChildren<ElementRef<HTMLLIElement>>('actionOption');

    private readonly _actionBar = viewChild<ElementRef<HTMLDivElement>>('actionBar');
    private readonly _contentPanel = viewChild<ElementRef<HTMLDivElement>>('contentPanel');
    private readonly _contentPanelClose = viewChild<ElementRef<HTMLButtonElement>>('contentPanelClose');
    private readonly _navArrowRef = viewChild<ElementRef<HTMLButtonElement>>('navArrow');
    private readonly _overflowToggleRef = viewChild<ElementRef<HTMLButtonElement>>('overflowToggle');
    private readonly _overflowMenuRef = viewChild<MenuComponent>('overflowMenu');
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _liveAnnouncer = inject(LiveAnnouncer);
    private readonly _document = inject(DOCUMENT);
    private readonly _availBarHeight = signal(0);
    private readonly _navContainerH = signal(0);
    private readonly _itemContainerH = signal(0);
    private readonly _itemGapPx = signal(0);

    private readonly _rtlService = inject(RtlService, { optional: true });
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Whether the content panel was open when the action bar was expanded. */
    private _contentWasOpen = false;
    /**
     * @hidden Guard against a stale keyup activating the first overflow item immediately
     * after the menu opens via Enter.  Enter on the `<button>` fires the native click
     * synchronously (opening the menu), then CDK moves focus to the first `<a>` via
     * requestAnimationFrame before the keyup fires.  MenuService's WCAG
     * activate-on-keyup handler then treats that keyup as a deliberate selection, closing
     * the menu immediately.  This flag causes `activateOverflowItem` to discard the first
     * call after an Enter-driven open.  It is also cleared by the cleanup effect below
     * when the menu closes without a selection (e.g. Escape).
     */
    private _ignoreNextOverflowActivation = false;

    constructor() {
        // Shift+Cmd/Ctrl+P is a global expand/collapse shortcut — it must work regardless of
        // where focus is, so it listens on the document. A host-level listener would only fire
        // when focus is already inside the panel, which is almost never the case for this shortcut.
        const onDocumentKeydown = (event: KeyboardEvent): void => {
            if (event.shiftKey && (event.metaKey || event.ctrlKey) && event.code === 'KeyP') {
                event.preventDefault();
                this.toggleNavArrow();
            }
        };
        this._document.addEventListener('keydown', onDocumentKeydown);
        this._destroyRef.onDestroy(() => this._document.removeEventListener('keydown', onDocumentKeydown));

        // When the overflow menu closes without an item being selected (e.g. Escape or
        // outside click) clear the stale-keyup guard so subsequent Enter presses work.
        effect(() => {
            const menu = this._overflowMenuRef();
            if (menu && !menu.isOpen()) {
                this._ignoreNextOverflowActivation = false;
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
                const barGap = parseFloat(style.gap) || 0;
                this._availBarHeight.set(bar.clientHeight - paddingBlockStart);

                // The nav arrow sits outside the toolbar; the space it consumes before the
                // item list is its own height plus the action-bar gap that follows it.
                const navContainer = bar.querySelector<HTMLElement>('.fd-side-panel__nav-container');
                this._navContainerH.set((navContainer?.offsetHeight ?? 0) + barGap);

                // Item stride is driven by the listbox's own gap and first option height.
                const list = bar.querySelector<HTMLElement>('.fd-side-panel__list');
                this._itemGapPx.set(list ? parseFloat(getComputedStyle(list).gap) || 0 : 0);

                const firstItemContainer = list?.querySelector<HTMLElement>('.fd-side-panel__action-container');
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
            if (newOpen) {
                // Opening hides the action bar (display:none), so the nav arrow would lose
                // focus to <body> — moving it off the host and breaking Esc. Move focus into
                // the content panel (its close button) so keyboard handling stays in the panel.
                requestAnimationFrame(() => {
                    this._contentPanelClose()?.nativeElement.focus();
                });
            } else {
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
        this._liveAnnouncer.announce(
            this.isNavArrowExpanded() ? this.expandedAnnouncement() : this.collapsedAnnouncement()
        );
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
        const options = this._actionOptions();
        const domFocusedIndex = options.findIndex((o) => o.nativeElement === document.activeElement);
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
            case 'Enter':
            case ' ':
                // Options are <li>, not native buttons, so activate them explicitly.
                if (currentSlot < visible) {
                    event.preventDefault();
                    this.activate(this.items()[currentSlot], currentSlot);
                } else if (event.key === 'Enter' && !event.repeat) {
                    // Enter on the overflow <button> fires the native click synchronously on
                    // keydown.  The menu opens; CDK then moves focus to the first item via
                    // requestAnimationFrame — before the keyup fires.  MenuService's
                    // WCAG activate-on-keyup handler then treats that keyup as a deliberate
                    // selection, immediately closing the menu.
                    // Guard the next activateOverflowItem call to discard the stale keyup.
                    this._ignoreNextOverflowActivation = true;
                }
                return;
            default:
                return;
        }
        event.preventDefault();
        this._focusSlot(nextIndex);
    }

    /**
     * @hidden Host-level focus navigation (requires focus inside the panel):
     * `F6` / `Shift`+`F6` / `Cmd`/`Ctrl`+`Arrow` move focus between the action bar and the
     * open content panel (multi-action only — in single-action the bar is hidden while open).
     * The global `Shift`+`Cmd`/`Ctrl`+`P` expand/collapse shortcut is handled by a document
     * listener set up in the constructor.
     */
    protected onHostKeydown(event: KeyboardEvent): void {
        const isF6 = event.key === 'F6';
        const isModArrow =
            (event.metaKey || event.ctrlKey) && (event.key === 'ArrowLeft' || event.key === 'ArrowRight');
        if (this.isSingleAction() || !this.open() || (!isF6 && !isModArrow)) {
            return;
        }
        const panel = this._contentPanel()?.nativeElement;
        if (!panel) {
            return;
        }
        event.preventDefault();
        if (panel.contains(document.activeElement)) {
            // Move focus back to the active option (or the overflow toggle when it's hidden).
            const index = this.items().findIndex((item) => item.id() === this.activeItem());
            if (index > -1 && index >= this.visibleItemCount()) {
                this._overflowToggleRef()?.nativeElement.focus();
            } else if (index > -1) {
                this._focusItem(index);
            } else {
                this._navArrowRef()?.nativeElement.focus();
            }
        } else {
            panel.focus();
        }
    }

    /**
     * @hidden Activate the group behind an overflow menu item.
     * Closes the overflow menu and — when focusing the item's `<li>` would be wrong (it is
     * hidden while overflowed) — leaves focus to be restored by the menu's restoreFocusOnClose.
     */
    protected activateOverflowItem(item: SidePanelItemComponent): void {
        if (item.disabled()) {
            return;
        }
        if (this._ignoreNextOverflowActivation) {
            this._ignoreNextOverflowActivation = false;
            return;
        }
        const id = item.id();
        const newActiveId = this.activeItem() === id ? null : id;
        this.activeItem.set(newActiveId);
        this.open.set(newActiveId !== null);
        if (this.mode() === 'expanded' && newActiveId !== null) {
            this.mode.set('collapsed');
        }
        this._overflowMenuRef()?.close();
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
        this._actionOptions()[index]?.nativeElement.focus();
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
