import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';


export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative' | 'half';
export type ButtonOptions = 'light' | 'emphasized';

/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: `button[fd-button], a[fd-button]`,
    exportAs: 'fd-button',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends AbstractFdNgxClass {

    /** Defines if there will be added fd-button class. Enabled by default. */
    @Input() fdButtonClass: boolean = true;

    /** Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input() glyph: string;

    /** The type of the button. Types include 'standard', 'positive', 'medium', 'negative', 'half'.
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
        if (this.fdButtonClass) {
            this._addClassToElement('fd-button');
        }
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


