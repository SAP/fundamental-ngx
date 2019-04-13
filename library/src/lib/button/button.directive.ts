import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

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

    /** @Input Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** @Input The icon to include in the button. See the icon page for the list of icons. */
    @Input() glyph: string;

    /** @Input The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() fdType: string;

    /** @hidden */
    @Input() semantic: string; // TODO: deprecated, leaving for backwards compatibility

    /** @Input The state of the button. Options include 'normal', 'selected', and 'disabled'. Leave empty for normal. */
    @Input() state: string;

    /** @Input Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: string | string[];

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
        if (this.state) {
            this._addClassToElement('is-' + this.state);
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
