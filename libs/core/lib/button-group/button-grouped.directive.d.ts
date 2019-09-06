import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Directive to be applied to buttons that are members of a button group.
 *
 * ```html
 * <button fd-button-grouped>Button</button>
 * ```
 */
export declare class ButtonGroupedDirective extends AbstractFdNgxClass {
    private elementRef;
    /** Size of the button. Can be `xs`, `s`, or left blank for large size. */
    size: string;
    /** Glyph (icon) of the button. */
    glyph: string;
    /** State of the button. Can be `selected` or `disabled`. */
    state: string;
    /** Whether the button should be in compact form. */
    compact: boolean;
    /** @hidden */
    fdButtonGroupedClass: boolean;
    /** @hidden */
    constructor(elementRef: ElementRef);
    /** @hidden */
    _setProperties(): void;
}
