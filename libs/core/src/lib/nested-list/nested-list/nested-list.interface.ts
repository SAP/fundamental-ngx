import { NestedItemInterface } from '../nested-item/nested-item.interface';
import { QueryList } from '@angular/core';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedListInterface {
    nestedItems: QueryList<NestedItemInterface>;
    hidden: boolean;
}
