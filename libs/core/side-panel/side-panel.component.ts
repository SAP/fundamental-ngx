import {
    Component,
    computed,
    contentChildren,
    ElementRef,
    input,
    linkedSignal,
    model,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
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
    host: {
        '[class]': '_hostClasses()'
    }
})
export class SidePanelComponent {
    /** Edge the panel is anchored to. Defaults to `right`. */
    readonly side = input<SidePanelSide>('right');

    /** Accessible label for the action bar (`toolbar`). */
    readonly ariaLabel = input<Nullable<string>>();

    /**
     * Identifier of the currently active group, or `null` when none is active.
     * Two-way bindable; emits `activeItemChange` when it changes.
     */
    readonly activeItem = model<string | null>(null);

    /** @hidden Projected side panel items (content groups). */
    protected readonly _items = contentChildren(SidePanelItemComponent);

    /** @hidden */
    protected readonly _hostClasses = computed(() => `fd-side-panel fd-side-panel--${this.side()}`);

    /** @hidden Index of the roving-tabindex focus target; resets to the active item. */
    protected readonly _focusedIndex = linkedSignal<number>(() => {
        const activeId = this.activeItem();
        const index = this._items().findIndex((item) => item.id() === activeId);
        return index > -1 ? index : 0;
    });

    /** @hidden Action button elements, in projection order. */
    private readonly _actionButtons = viewChildren<ElementRef<HTMLButtonElement>>('actionButton');

    /** @hidden Activate (or toggle off) the group behind an action button. */
    protected _activate(item: SidePanelItemComponent, index: number): void {
        if (item.disabled()) {
            return;
        }
        this._focusedIndex.set(index);
        const id = item.id();
        this.activeItem.set(this.activeItem() === id ? null : id);
    }

    /** @hidden Vertical roving-tabindex navigation across the action bar. */
    protected _onKeydown(event: KeyboardEvent): void {
        const count = this._items().length;
        if (count === 0) {
            return;
        }
        let nextIndex: number;
        switch (event.key) {
            case 'ArrowDown':
                nextIndex = this._nextEnabledIndex(this._focusedIndex(), 1);
                break;
            case 'ArrowUp':
                nextIndex = this._nextEnabledIndex(this._focusedIndex(), -1);
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
        const items = this._items();
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
        this._focusedIndex.set(index);
        this._actionButtons()[index]?.nativeElement.focus();
    }
}
