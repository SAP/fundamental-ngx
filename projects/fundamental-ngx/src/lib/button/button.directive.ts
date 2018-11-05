import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    selector: '[fd-button]'
})
export class ButtonDirective extends AbstractFdNgxClass {
    @Input() size;

    @Input() glyph;

    @Input() fdType;

    @Input() semantic;

    @Input() state;

    @Input() options;

    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.fdType) {
            this._addClassToElement('fd-button--' + this.fdType);
        }
        if (this.semantic) {
            this._addClassToElement('fd-button--' + this.semantic);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
        if (this.options) {
            this._addClassToElement('fd-button--' + this.options);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
