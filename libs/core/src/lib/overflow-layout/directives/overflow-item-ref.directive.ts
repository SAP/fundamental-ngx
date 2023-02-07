import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { OverflowItemDirectiveContext, OverflowItemRef } from '../interfaces/overflow-item-ref.interface';
import { OverflowItem } from '../interfaces/overflow-item.interface';
import { FD_OVERFLOW_ITEM_REF } from '../tokens/overflow-item-ref.token';

/**
 * Structural directive which is used to pass the context of the item to the template engine.
 */
@Directive({
    selector: '[fdOverflowItemRef]',
    providers: [
        {
            provide: FD_OVERFLOW_ITEM_REF,
            useExisting: OverflowItemRefDirective
        }
    ]
})
export class OverflowItemRefDirective<T = any> implements OverflowItemRef<T> {
    /**
     * Element ref of the `fdOverflowLayoutItem` directive.
     */
    elementRef: ElementRef<HTMLElement>;
    /**
     * `fdOverflowLayoutItem` directive.
     */
    overflowItem: OverflowItem;

    /**
     * Whether the item is hidden.
     */
    set hidden(value: boolean) {
        this._hidden = value;
        this.overflowItem.hiddenChange.emit(value);
    }
    get hidden(): boolean {
        return this._hidden;
    }

    /** @hidden */
    _hidden = false;

    /** Index of the item in the visible or hidden array of Overflow Layout Component's items. */
    index: number;

    /**
     * The index of the item in the array of items.
     */
    globalIndex: number;

    /** Whether this item is last in the array. */
    first: boolean;

    /** Whether this item is first in the array. */
    last: boolean;

    /** Whether the item is softly hidden. */
    softHidden = true;

    /** Item instance. Used for correct autocomplete. */
    @Input('fdOverflowItemRef')
    item: T;

    /** @hidden */
    static ngTemplateContextGuard(
        dir: OverflowItemRefDirective,
        ctx: OverflowItemDirectiveContext
    ): ctx is OverflowItemDirectiveContext {
        return true;
    }

    /** @hidden */
    constructor(public templateRef: TemplateRef<OverflowItemDirectiveContext<T>>) {}

    /**
     * Sets the `fdOverflowLayoutItem` directive.
     * @param item
     */
    setOverflowItem(item: OverflowItem): void {
        this.overflowItem = item;
    }
}
