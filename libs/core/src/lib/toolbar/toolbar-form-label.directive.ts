import { Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-toolbar-form-label]',
    host: {
        class: 'fd-form-label fd-toolbar__overflow-form-label fd-toolbar__overflow-form-label--text'
    }
})
export class ToolbarFormLabelDirective extends ToolbarItemDirective { }
