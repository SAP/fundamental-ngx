import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    selector: '[fd-button]'
})
export class ButtonDirective extends AbstractFdNgxClass {
    @Input() compact: boolean;

    @Input() glyph: string;

    @Input() fdType: string;

    @Input() semantic: string; // TODO: deprecated, leaving for backwards compatibility

    @Input() state: string;

    @Input() options: string | string[];

    @Input() size: string; // TODO: deprecated, leaving for backwards compatibility

    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.compact) {
            this._addClassToElement('fd-button--compact');
        }
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
            if (typeof this.options === 'string') {
                this._addClassToElement('fd-button--' + this.options);
            } else if (Array.isArray(this.options)) {
                this.options.forEach((option) => {
                    if (typeof option === 'string') {
                        this._addClassToElement('fd-button--' + option);
                    }
                });
            }
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
