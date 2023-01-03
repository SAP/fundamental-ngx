import { Directive, Input } from '@angular/core';

import { ToolbarItemDirective } from './toolbar-item.directive';
import { OverflowPriority } from '@fundamental-ngx/cdk/utils';

/** Individual child elements can be "prioritized" for the overflow behavior using the `fdOverflowPriority` attribute directive.
 * The values for prioritization are as follows:
 * `always` - This element will always be positioned in the overflow menu.
 * `never` - This element will never be added to the overflow. It will always be visible in the toolbar.
 * `low` - The element has low priority and will be consider first for moving to overflow menu.
 * `high` (default) - This element has high priority and will be considered last for moving to overflow menu.
 * `disappear` - This element is not important and will be removed from the toolbar, and will not be added to the overflow menu.
 * */
@Directive({
    selector: '[fdOverflowPriority]'
})
export class ToolbarOverflowPriorityDirective extends ToolbarItemDirective {
    /** The priority of the item. */
    @Input()
    fdOverflowPriority: OverflowPriority = 'high';
}
