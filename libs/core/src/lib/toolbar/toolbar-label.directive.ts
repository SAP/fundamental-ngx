import { Directive } from '@angular/core';

import { ToolbarItemDirective } from './toolbar-item.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-toolbar-label]',
    host: {
        class: 'fd-label fd-toolbar__overflow-label'
    }
})
export class ToolbarLabelDirective extends ToolbarItemDirective {}
