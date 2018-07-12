import { Directive, Inject, ElementRef, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Directive({
    selector: '[fd-form-item]'
})
export class FormItemComponent extends CustomClassBaseComponent {
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
