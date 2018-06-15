import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-dropdown-control]',
    host: {
        class: 'fd-dropdown__control'
    }
})
export class DropdownControlDirective {}
