import { Component, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomStyleManager } from '../utils/abstract-custom-style-manager';

@Component({
    selector: 'fd-label',
    templateUrl: './badge-label.component.html'
})
export class LabelComponent extends AbstractCustomStyleManager {
    @Input() status;

    _setProperties() {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
