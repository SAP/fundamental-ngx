import { Directive } from '@angular/core';

@Directive({
    selector: 'fd-list-action',
    host: {
        class: 'fd-list-group__action'
    }
})
export class ListActionDirective {}
