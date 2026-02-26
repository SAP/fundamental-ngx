import { Directive, inject, Injector } from '@angular/core';
import { deepEqual } from 'fast-equals';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { FocusableItem } from '../focusable-item/focusable.item';
import { FocusableListDirective, ItemsQueryList } from './focusable-list.directive';
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
    _indirectChildren = new BehaviorSubject<FocusableItem[]>([]);
    /** @hidden */
    _indirectChildrenMap = new Map<FocusableItem, number | (() => number)>();

    /** @hidden */
    constructor() {
        if (this._focusableList) {
            const queryList: ItemsQueryList<FocusableItem> = {
                toArray: () => this._indirectChildren.value,
                get: (index: number) => this._indirectChildren.value[index],
                [Symbol.iterator]: () => this._indirectChildren.value[Symbol.iterator](),
                forEach: (
                    callback: (value: FocusableItem, index: number, array: FocusableItem[]) => void,
                    thisArg?: any
                ) => this._indirectChildren.value.forEach(callback, thisArg)
            } as any;
            queryList['changes'] = this._indirectChildren.pipe(
                debounceTime(100),
                distinctUntilChanged(deepEqual),
                map(() => queryList)
            );
            this._focusableList.setItems(queryList);
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
        this._indirectChildren.next(
            Array.from(this._indirectChildrenMap.entries())
                .sort(([, orderA], [, orderB]) => {
                    const orderAValue = typeof orderA === 'function' ? orderA() : orderA;
                    const orderBValue = typeof orderB === 'function' ? orderB() : orderB;
                    return orderAValue - orderBValue;
                })
                .map(([focusableItem]) => focusableItem)
        );
    }
}
