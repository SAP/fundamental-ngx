import { TemplateRef } from '@angular/core';
import { OverflowItem } from './overflow-item.interface';

export type OverflowItemDirectiveContext<T = any> = {
    $implicit: boolean;
    index: number;
    globalIndex: number;
    first: boolean;
    last: boolean;
    item: T;
};

export interface OverflowItemRef<T = any> {
    /**
     * Overflow item directive instance.
     */
    overflowItem: OverflowItem;
    /**
     * Whether the item is hidden.
     */
    hidden: boolean;

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
    softHidden: boolean;
    /**
     * Template reference of the directive.
     */
    templateRef: TemplateRef<OverflowItemDirectiveContext<T>>;

    /** Item instance. Used for correct autocomplete. */
    item: T;

    /**
     * Sets the overflow item directive.
     * @param item Overflow item directive.
     */
    setOverflowItem(item: OverflowItem): void;
}
