import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Directive to be applied to buttons that are members of a segmented button.
 *
 * ```html
 * <button fd-segmented-button>Button</button>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-segmented-button]'
})
export class SegmentedButtonDirective extends AbstractFdNgxClass {

    /**
     * @deprecated
     * Will be removed in 0.17.0
     */
    @Input()
    size: string;

    /** Defines if there will be added fd-button class. 
     * Enabled by default. 
    */
    @Input() fdButtonClass: boolean = true;

    /** Glyph (icon) of the button. */
    @Input()
    glyph: string;

    /** State of the button. Can be `selected` or `disabled`. */
    @Input()
    state: string;

    /** Whether the button should be in compact form. 
     * Default value is set to false
    */
    @Input()
    @HostBinding('class.fd-button--compact')
    compact: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-segmented-button')
    fdsegmentedButtonClass: boolean = true;

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
        console.warn(`SegmentedButtonDirective is not supported and will be removed in 0.17.0.
        Add styles directly to button instead`);
    }

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-segmented-button');
        if (this.fdButtonClass) {
            this._addClassToElement('fd-button');
        }
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
