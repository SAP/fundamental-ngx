import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-button-grouped]'
})
export class ButtonGroupedDirective extends AbstractFdNgxClass {
    @Input() id: string;

    @Input() size: string;

    @Input() glyph: string;

    @Input() state: string;

    @Input() compact: boolean = false;

    _setProperties() {
        this._addClassToElement('fd-button--grouped');
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.compact) {
            this._addClassToElement('fd-button--compact');
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }

    constructor(@Inject(ElementRef) elementRef: ElementRef) {
        super(elementRef);
    }
}
