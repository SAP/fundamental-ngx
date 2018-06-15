import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-dropdown-control-no-border]',
    host: {
        class: 'fd-dropdown__control--no-border'
    }
})
export class DropdownControlNoBorderDirective {}
