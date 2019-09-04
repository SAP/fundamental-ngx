import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Directive to be applied to buttons that are members of a button group.
 *
 * ```html
 * <button fd-button-grouped>Button</button>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-button-grouped]'
})
export class ButtonGroupedDirective extends AbstractFdNgxClass {

    /** Size of the button. Can be `xs`, `s`, or left blank for large size. */
    @Input()
    size: string;

    /** Glyph (icon) of the button. */
    @Input()
    glyph: string;

    /** State of the button. Can be `selected` or `disabled`. */
    @Input()
    state: string;

    /** Whether the button should be in compact form. */
    @Input()
    @HostBinding('class.fd-button--compact')
    compact: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-button--grouped')
    fdButtonGroupedClass: boolean = true;

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }

    /** @hidden */
    _setProperties() {
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }
}
