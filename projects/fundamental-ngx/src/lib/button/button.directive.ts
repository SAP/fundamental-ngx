import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Directive({
    selector: '[fd-button]'
})
export class ButtonDirective extends CustomClassBaseComponent {
    @Input() size;

    @Input() glyph;

    @Input() type;

    @Input() semantic;

    @Input() state;

    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.type) {
            this._addClassToElement('fd-button--' + this.type);
        }
        if (this.semantic) {
            this._addClassToElement('fd-button--' + this.semantic);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
