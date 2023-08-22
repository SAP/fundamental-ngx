import { Directive } from '@angular/core';
import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-toolbar-form-label]',
    host: {
        class: 'fd-form-label fd-toolbar__overflow-form-label fd-toolbar__overflow-form-label--text'
    },
    standalone: true
})
export class ToolbarFormLabelDirective extends ToolbarItemDirective {}
