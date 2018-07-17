import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractCustomStyleManager } from '../utils/abstract-custom-style-manager';

@Directive({
    selector: '[fd-button]'
})
export class ButtonDirective extends AbstractCustomStyleManager {
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
