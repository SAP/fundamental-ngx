import { Directive, ElementRef, TemplateRef } from '@angular/core';
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
export class OverflowItemRefDirective implements OverflowItemRef {
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
    hidden = false;
    /**
     * Index of the item in the array of Overflow Layout Component's items.
     */
    index: number;

    /** @hidden */
    static ngTemplateContextGuard(
        dir: OverflowItemRefDirective,
        ctx: OverflowItemDirectiveContext
    ): ctx is OverflowItemDirectiveContext {
        return true;
    }

    /** @hidden */
    constructor(public templateRef: TemplateRef<OverflowItemDirectiveContext>) {}

    /**
     * Sets the element reference of the `fdOverflowLayoutItem` directive.`
     * @param elmRef
     */
    setElementRef(elmRef: ElementRef): void {
        if (this.elementRef) {
            return;
        }
        this.elementRef = elmRef;
    }

    /**
     * Sets the `fdOverflowLayoutItem` directive.
     * @param item
     */
    setOverflowItem(item: OverflowItem): void {
        this.overflowItem = item;
    }
}
