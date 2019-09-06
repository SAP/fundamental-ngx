import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Button directive, used to enhance standard HTML buttons.
 *
 * ```html
 * <button fd-button>Button Text</button>
 * ```
 */
export declare class ButtonDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Whether to apply compact mode to the button. */
    compact: boolean;
    /** The icon to include in the button. See the icon page for the list of icons. */
    glyph: string;
    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    fdType: string;
    /** @hidden */
    semantic: string;
    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    options: string | string[];
    /** @hidden */
    size: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
