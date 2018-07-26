import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    selector: '[fd-identifier]',
    host: {
        role: 'presentation'
    }
})
export class IdentifierDirective extends AbstractFdNgxClass {
    @Input() size: string = '';

    @Input() circle: boolean = false;

    @Input() transparent: boolean = false;

    @Input() colorAccent;

    @Input() glyph: string = '';

    _setProperties() {
        if (this.size) {
            this._addClassToElement('fd-identifier--' + this.size);
        }
        if (this.circle) {
            this._addClassToElement('fd-identifier--circle');
        }
        if (this.transparent) {
            this._addClassToElement('fd-identifier--transparent');
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
