import { Directive, effect, inject, Injector, signal } from '@angular/core';
import { FocusableItem } from '../focusable-item/focusable.item';
import { FocusableListDirective } from './focusable-list.directive';
import { FDK_FOCUSABLE_LIST_DIRECTIVE } from './focusable-list.tokens';

@Directive({
    selector: '[fdkIndirectFocusableList]',
    exportAs: 'fdkIndirectFocusableList',
    standalone: true
})
export class IndirectFocusableListDirective {
    /** @hidden */
    injector = inject(Injector);
    /** @hidden */
    _focusableList = inject<FocusableListDirective>(FDK_FOCUSABLE_LIST_DIRECTIVE, { optional: true });
    /** @hidden */
    _indirectChildren = signal<ReadonlyArray<FocusableItem>>([], {
        equal: (a, b) => {
            // Deep equality: only trigger updates if array contents actually change
            if (a.length !== b.length) {
                return false;
            }
            return a.every((item, index) => item === b[index]);
        }
    });
    /** @hidden */
    _indirectChildrenMap = new Map<FocusableItem, number | (() => number)>();
    /** @hidden */
    private _updateTimeout?: ReturnType<typeof setTimeout>;

    /** @hidden */
    constructor() {
        if (this._focusableList) {
            effect(() => {
                this._focusableList?.setItems(this._indirectChildren());
            });
        }
    }

    /** @hidden */
    register(item: FocusableItem, itemOrder: number | (() => number)): void {
        this._indirectChildrenMap.set(item, itemOrder);
        this._updateIndirectChildren();
    }

    /** @hidden */
    unregister(item: FocusableItem): void {
        this._indirectChildrenMap.delete(item);
        this._updateIndirectChildren();
    }

    /** @hidden */
    protected _updateIndirectChildren(): void {
        // Debounce updates by 100ms (matches original RxJS debounceTime)
        clearTimeout(this._updateTimeout);
        this._updateTimeout = setTimeout(() => {
            this._indirectChildren.set(
                Array.from(this._indirectChildrenMap.entries())
                    .sort(([, orderA], [, orderB]) => {
                        const orderAValue = typeof orderA === 'function' ? orderA() : orderA;
                        const orderBValue = typeof orderB === 'function' ? orderB() : orderB;
                        return orderAValue - orderBValue;
                    })
                    .map(([focusableItem]) => focusableItem)
            );
        }, 100);
    }
}
