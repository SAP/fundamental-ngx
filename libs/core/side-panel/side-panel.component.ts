import {
    Component,
    computed,
    contentChildren,
    ElementRef,
    inject,
    input,
    linkedSignal,
    model,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { SidePanelItemComponent } from './side-panel-item.component';

/** Edge the side panel is anchored to. */
export type SidePanelSide = 'left' | 'right';

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
    imports: [IconComponent],
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

    /** @hidden Projected side panel items (content groups). */
    protected readonly items = contentChildren(SidePanelItemComponent);

    /** @hidden */
    protected readonly hostClasses = computed(() => {
        const classes = [`fd-side-panel`, `fd-side-panel--${this.side()}`];
        if (this.open()) {
            classes.push('fd-side-panel--open');
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
        if (this.open()) {
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

    /** @hidden Action button elements, in projection order. */
    private readonly _actionButtons = viewChildren<ElementRef<HTMLButtonElement>>('actionButton');

    private readonly _rtlService = inject(RtlService, { optional: true });
    private readonly _isRtl = computed(() => this._rtlService?.rtl() ?? false);

    /** @hidden Toggle the content panel open/closed. */
    protected toggleOpen(): void {
        this.open.update((v) => !v);
    }

    /** @hidden Activate (or toggle off) the group behind an action button. */
    protected activate(item: SidePanelItemComponent, index: number): void {
        if (item.disabled()) {
            return;
        }
        this._focusItem(index);
        const id = item.id();
        this.activeItem.set(this.activeItem() === id ? null : id);
    }

    /** @hidden Vertical roving-tabindex navigation across the action bar. */
    protected onKeydown(event: KeyboardEvent): void {
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
