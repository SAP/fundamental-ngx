import { QueryList } from '@angular/core';
import { NestedItemInterface } from '../nested-item/nested-item.interface';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedListInterface {
    nestedItems: QueryList<NestedItemInterface>;
    hidden: boolean;
    detectChanges: () => void;
}
