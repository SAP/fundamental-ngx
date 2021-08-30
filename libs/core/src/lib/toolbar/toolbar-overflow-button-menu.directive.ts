import { Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    selector: '[fdToolbarOverflowButtonMenu]',
    host: {
        class: 'fd-toolbar__overflow-button--menu'
    }
})
export class ToolbarOverflowButtonMenuDirective extends ToolbarItemDirective {}
