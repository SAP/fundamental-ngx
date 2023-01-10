import { NestedListInterface } from '../nested-list/nested-list.interface';
import { NestedListPopoverInterface } from '../nested-list-popover/nested-list-popover.interface';
import { Subject } from 'rxjs';

/** Contains references to popover or list nested components, that are placed as direct children of item component */
export class NestedItemService {
    /** @hidden */
    list: NestedListInterface;
    /** @hidden */
    popover?: NestedListPopoverInterface;

    /** Subject fired when expand icon is clicked */
    toggle: Subject<boolean> = new Subject<boolean>();

    /** Subject fired, when child elements are focused */
    focus: Subject<void> = new Subject<void>();

    /** Subject fired, when content or link is clicked */
    click: Subject<void> = new Subject<void>();

    /** KeyDown handler, it is triggered from link, content and item elements */
    keyDown: Subject<KeyboardEvent> = new Subject<KeyboardEvent>();
}
