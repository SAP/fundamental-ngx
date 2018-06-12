import { Directive } from '@angular/core';

@Directive({
    selector: 'fd-dropdown-header',
    host: {
        class: 'fd-dropdown__title',
        role: 'separator'
    }
})
export class DropdownGroupHeaderDirective {}
