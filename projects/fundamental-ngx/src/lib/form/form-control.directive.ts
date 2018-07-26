import { Directive, Input, ElementRef, Inject } from '@angular/core';
import { AbstractCustomClassManager } from '../utils/AbstractCustomClassManager';

@Directive({
    selector: '[fd-form-control]'
})
export class FormControlDirective extends AbstractCustomClassManager {
    @Input() state: string = '';

    _setProperties() {
        this._addClassToElement('fd-form__control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
