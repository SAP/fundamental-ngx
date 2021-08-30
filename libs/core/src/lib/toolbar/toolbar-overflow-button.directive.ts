import { Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    selector: '[fdToolbarOverflowButton], [fd-toolbar-overflow-button]',
    host: {
        class: 'fd-toolbar__overflow-button'
    }
})
export class ToolbarOverflowButtonDirective extends ToolbarItemDirective {}
