import { Directive, inject } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Directive({
    selector: '[fd-button][fdbToolHeaderButton]',
    host: {
        class: 'fd-button--tool-header'
    },
    standalone: true
})
export class ToolHeaderButtonDirective {
    /** @hidden */
    constructor() {
        inject(ButtonComponent, { host: true }).fdType = 'transparent';
    }
}
