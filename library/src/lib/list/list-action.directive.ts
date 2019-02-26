import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-list-action',
    host: {
        class: 'fd-list-group__action'
    }
})
export class ListActionDirective {}
