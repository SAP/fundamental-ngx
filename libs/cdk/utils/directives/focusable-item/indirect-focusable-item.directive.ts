import { DestroyRef, Directive, inject, InjectionToken } from '@angular/core';
import { IndirectFocusableListDirective } from '../focusable-list/indirect-focusable-list.directive';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE } from './focusable-item.tokens';
import { FocusableItem } from './focusable.item';

export const FDK_INDIRECT_FOCUSABLE_ITEM_ORDER = new InjectionToken<number | (() => number)>(
    'FDK_INDIRECT_FOCUSABLE_ITEM_ORDER'
);

/**
 * Directive, to mark the focusable item in the focusable list, which
 * is not the direct child of the focusable list.
 *
 * Useful in cases, when you need to make the item focusable, and
 * you do not have the access to the focusable list.
 */
@Directive({
    selector: '[fdkIndirectFocusableItem]',
    standalone: true
})
export class IndirectFocusableItemDirective {
    /** @ignore */
    protected _focusableItem = inject<FocusableItem>(FDK_FOCUSABLE_ITEM_DIRECTIVE, { optional: true });
    /** @ignore */
    protected _indirectFocusableList = inject(IndirectFocusableListDirective, { optional: true });
    /** @ignore */
    protected _order: number | (() => number) | null = inject(FDK_INDIRECT_FOCUSABLE_ITEM_ORDER, { optional: true });
    /** @ignore */
    protected _destroyRef = inject(DestroyRef);

    /** @ignore */
    constructor() {
        if (!this._focusableItem) {
            throw new Error(
                'fdkIndirectFocusableItem directive must be used in conjunction with fdkFocusableItem directive'
            );
        }
        if (this._indirectFocusableList && this._order) {
            const focusableItem = this._focusableItem;
            const indirectFocusableList = this._indirectFocusableList;
            indirectFocusableList.register(this._focusableItem, this._order);
            this._destroyRef.onDestroy(() => indirectFocusableList.unregister(focusableItem));
        }
    }
}
