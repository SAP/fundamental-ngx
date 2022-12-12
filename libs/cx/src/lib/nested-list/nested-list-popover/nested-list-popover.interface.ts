import { NestedItemInterface } from '../nested-item/nested-item.interface';

/** Interface, to reduce amount of circular dependency warnings */
export interface NestedListPopoverInterface {
    parentItemElement: NestedItemInterface;
    open: boolean;
    handleOpenChange: (boolean) => void;
}
