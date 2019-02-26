import { Directive } from '@angular/core';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-set]',
    host: {
        class: 'fd-form__set'
    }
})
export class FormSetDirective {}
