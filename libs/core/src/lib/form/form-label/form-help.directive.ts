import { Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-help]',
    host: {
        class: 'fd-form__inline-help'
    }
})
export class FormHelpDirective {}
