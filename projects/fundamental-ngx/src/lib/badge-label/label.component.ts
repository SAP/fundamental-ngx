import { Component, ElementRef, Inject, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Component({
    selector: 'fd-label',
    templateUrl: './badge-label.component.html'
})
export class LabelComponent extends CustomClassBaseComponent {
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
