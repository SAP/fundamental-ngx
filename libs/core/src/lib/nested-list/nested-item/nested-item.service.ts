import { NestedListInterface } from '../nested-list/nested-list.interface';
import { NestedListPopoverInterface } from '../nested-list-popover/nested-list-popover.interface';

export class NestedItemService {
    public list: NestedListInterface;
    public popover?: NestedListPopoverInterface;
}
