import { NestedListInterface } from '../nested-list/nested-list.interface';
import { NestedListPopoverInterface } from '../nested-list-popover/nested-list-popover.interface';

/** Contains references to popover or list nested components, that are placed as direct children of item component */
export class NestedItemService {
    list: NestedListInterface;
    popover?: NestedListPopoverInterface;
}
