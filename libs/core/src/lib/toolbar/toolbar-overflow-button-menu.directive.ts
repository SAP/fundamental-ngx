import { Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-toolbar-overflow-button-menu]',
    host: {
        class: 'fd-toolbar__overflow-button--menu'
    }
})
export class ToolbarOverflowButtonMenuDirective extends ToolbarItemDirective {}
