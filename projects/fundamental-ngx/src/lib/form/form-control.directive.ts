import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fd-form-control]',
    host: {
        '[class]': '"fd-form__control" + (state ? " is-" + state : "")'
    }
})
export class FormControlDirective {
    @Input() state: string = '';
}
