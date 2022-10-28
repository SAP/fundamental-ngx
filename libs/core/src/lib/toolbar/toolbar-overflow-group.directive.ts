import { Directive, Input } from '@angular/core';

import { ToolbarItemDirective } from './toolbar-item.directive';

/** Child elements can be grouped so that they can "overflow" together.
 * Setting the attribute directive `fdOverflowGroup` to the same number will allow child elements to be grouped.
 * Child elements which are grouped, will enter (or leave) the overflow menu together.
 * Child elements grouped in this manner cannot have the `fdOverflowPriority` values of `always` or `never`.
 * When the value of the property is 0, the element does not belong to any group.
 * */
@Directive({
    selector: '[fdOverflowGroup]'
})
export class ToolbarOverflowGroupDirective extends ToolbarItemDirective {
    /** The group number of the item. */
    @Input()
    fdOverflowGroup = 0;
}
