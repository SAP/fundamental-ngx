import { NgTemplateOutlet } from '@angular/common';
import {
    Component,
    computed,
    contentChildren,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    signal,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { SidePanelItemComponent } from './side-panel-item.component';

/** Edge the side panel is anchored to. */
export type SidePanelSide = 'left' | 'right';

/** Display mode of the side panel action bar. */
export type SidePanelMode = 'collapsed' | 'expanded';

/**
 * The Side Panel is a container anchored to an edge of the page. It is reached through a
 * vertical action-button bar where each button represents a content group.
 *
 * This component renders the **icons-only** action bar (the default display mode) and tracks
 * the active group. Opening the content panel, icons+label mode, overflow, resizing and mobile
 * behaviour are added in later issues.
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
    imports: [IconComponent, NgTemplateOutlet],
    providers: [contentDensityObserverProviders()],
    host: {
        '[class]': 'hostClasses()'
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
        const index = this.items().findIndex((item) => item.id() === activeId);
        return index > -1 ? index : 0;
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

    /** @hidden Action button elements, in projection order. */
    private readonly _actionButtons = viewChildren<ElementRef<HTMLButtonElement>>('actionButton');

    private readonly _rtlService = inject(RtlService, { optional: true });
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Whether the content panel was open when the action bar was expanded. */
    private _contentWasOpen = false;

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

    /** @hidden Close the content panel and return focus to the item's action button. */
    protected closeContentPanel(): void {
        const index = this.items().findIndex((item) => item.id() === this.activeItem());
        this.open.set(false);
        this.activeItem.set(null);
        if (index > -1) {
            this._focusItem(index);
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
        const count = this.items().length;
        if (count === 0) {
            return;
        }
        let nextIndex: number;
        switch (event.key) {
            case 'ArrowDown':
                nextIndex = this._nextEnabledIndex(this.focusedIndex(), 1);
                break;
            case 'ArrowUp':
                nextIndex = this._nextEnabledIndex(this.focusedIndex(), -1);
                break;
            case 'Home':
                nextIndex = this._nextEnabledIndex(-1, 1);
                break;
            case 'End':
                nextIndex = this._nextEnabledIndex(count, -1);
                break;
            default:
                return;
        }
        event.preventDefault();
        this._focusItem(nextIndex);
    }

    /** @hidden Find the next non-disabled item index, wrapping around. */
    private _nextEnabledIndex(from: number, step: number): number {
        const items = this.items();
        const count = items.length;
        let index = from;
        for (let i = 0; i < count; i++) {
            index = (index + step + count) % count;
            if (!items[index].disabled()) {
                return index;
            }
        }
        return Math.max(0, Math.min(from, count - 1));
    }

    /** @hidden Move roving focus to the given index. */
    private _focusItem(index: number): void {
        this.focusedIndex.set(index);
        this._actionButtons()[index]?.nativeElement.focus();
    }
}
