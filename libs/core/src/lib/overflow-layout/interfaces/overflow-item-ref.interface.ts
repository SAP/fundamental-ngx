import { ElementRef, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { OverflowItem } from './overflow-item.interface';

export type OverflowItemDirectiveContext<T = any> = {
    $implicit: boolean;
    index: number;
    first$: Observable<boolean>;
    last$: Observable<boolean>;
    first: boolean;
    last: boolean;
    item: T;
};

export interface OverflowItemRef<T = any> {
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

    /** Whether this item is first in the array */
    first$: Observable<boolean>;

    /** Whether this item is last in the array */
    last$: Observable<boolean>;

    first: boolean;
    last: boolean;
    /**
     * Template reference of the directive.
     */
    templateRef: TemplateRef<OverflowItemDirectiveContext<T>>;

    item: T;

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

    setLast(value: boolean): void;

    setFirst(value: boolean): void;
}
