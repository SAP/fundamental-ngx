import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fd-form-item]',
    host: {
      '[class]': '"fd-form__item" + (isCheck ? " fd-form__item--check" : "") + (isInline ? " fd-form__item--inline" : "")'
    }

})
export class FormItemComponent {
    @Input() isCheck: boolean = false;
    @Input() isInline: boolean = false;
}
