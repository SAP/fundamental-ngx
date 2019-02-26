import { Directive, Inject, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-form-item]'
})
export class FormItemDirective extends AbstractFdNgxClass {
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
