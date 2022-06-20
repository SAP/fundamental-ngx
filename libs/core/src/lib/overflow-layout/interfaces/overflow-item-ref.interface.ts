import { ElementRef, TemplateRef } from '@angular/core';
import { OverflowItem } from './overflow-item.interface';

export type OverflowItemDirectiveContext = { $implicit: boolean; index: number };

export interface OverflowItemRef {
    /**
     * Element reference.
     */
    elementRef: ElementRef<HTMLElement>;
    /**
     * Overflow item directive instance.
     */
    overflowItem: OverflowItem;
    /**
     * Whether the item is hidden.
     */
    hidden: boolean;
    /**
     * The index of the item in the array of items.
     */
    index: number;
    /**
     * Template reference of the directive.
     */
    templateRef: TemplateRef<OverflowItemDirectiveContext>;

    /**
     * Sets the element reference of the directive.
     * @param elmRef Element reference.
     */
    setElementRef(elmRef: ElementRef): void;

    /**
     * Sets the overflow item directive.
     * @param item Overflow item directive.
     */
    setOverflowItem(item: OverflowItem): void;
}
