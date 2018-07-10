import { Directive } from '@angular/core';

@Directive({
    selector: '[fd-form-set]',
    host: {
        class: 'fd-form__set'
    }
})
export class FormSetDirective {}
