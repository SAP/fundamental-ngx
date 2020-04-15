import { NestedItemInterface } from '../nested-item/nested-item.interface';

export interface NestedListPopoverInterface {
    parentItemElement: NestedItemInterface;
    open: boolean;
    handleOpenChange: (boolean) => void;
}
