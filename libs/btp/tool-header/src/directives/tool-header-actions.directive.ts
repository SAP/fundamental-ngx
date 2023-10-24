/* eslint-disable @angular-eslint/no-input-rename */
import { ContentChildren, Directive, QueryList } from '@angular/core';
import { ToolHeaderActionClass } from '../tool-header-action.class';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdb-tool-header-actions',
    standalone: true
})
export class ToolHeaderActionsDirective {
    /** @hidden */
    @ContentChildren(ToolHeaderActionClass)
    contentActions: QueryList<ToolHeaderActionClass>;
}
