import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { CustomClassBaseComponent } from '../utils/custom-class-base-component';

@Directive({
    selector: '[fd-button-grouped]',
    host: {
        '[class]':
            '"fd-button--grouped" + (size ? " fd-button--" + size : "") + (glyph ? " sap-icon--" + glyph : "") + (compact ? " fd-button--compact" : "") + (state ? " is-" + state : "")'
    }
})
export class ButtonGroupedDirective extends CustomClassBaseComponent {
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
