import { Directive, Inject, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    selector: '[fd-form-item]'
})
export class FormItemComponent extends AbstractFdNgxClass {
    @Input() isCheck: boolean = false;
    @Input() isInline: boolean = false;

    _setProperties() {
        this._addClassToElement('fd-form__item');
        if (this.isCheck) {
            this._addClassToElement('fd-form__item--check');
        }
        if (this.isInline) {
            this._addClassToElement('fd-form__item--inline');
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
