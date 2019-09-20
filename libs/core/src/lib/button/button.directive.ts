import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';


export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative';
export type ButtonOptions = 'light' | 'emphasized';

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
@Directive({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: '[fd-button]'
})
export class ButtonDirective extends AbstractFdNgxClass {

    /** Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input() glyph: string;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() fdType: ButtonType;

    /** @hidden */
    @Input() semantic: string; // TODO: deprecated, leaving for backwards compatibility

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: ButtonOptions | ButtonOptions[];

    /** @hidden */
    @Input() size: string; // TODO: deprecated, leaving for backwards compatibility

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.compact) {
            this._addClassToElement('fd-button--compact');
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.fdType) {
            this._addClassToElement('fd-button--' + this.fdType);
        }
        if (this.options) {
            if (typeof this.options === 'string') {
                this._addClassToElement('fd-button--' + this.options);
            } else if (Array.isArray(this.options)) {
                this.options.forEach(option => {
                    if (typeof option === 'string') {
                        this._addClassToElement('fd-button--' + option);
                    }
                });
            }
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}


