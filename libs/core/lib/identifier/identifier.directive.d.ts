import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * The directive that represents an identifier.
 * Identifier is a way to visually present something using an icon or user initials.
 *
 * ```html
 * <span fd-identifier [size]="'l'" [glyph]="'washing-machine'"></span>
 * ```
 */
export declare class IdentifierDirective extends AbstractFdNgxClass {
    /**
     * The size of the identifier.
     * The predefined values for the size are *xxs*, *xs*, *s*, *m*, *l*, *xl* and *xxl*.
     *  *size* can accept any other string, for example *xxxs*, which will be translated into class *fd-identifier--xxxs*.
     */
    size: string;
    /**
     * Whether to render a circle style for the identifier.
     */
    circle: boolean;
    /**
     * Whether to render a transparent style for the identifier.
     */
    transparent: boolean;
    /** A number specifying the background color of the identifier. */
    colorAccent: number;
    /** The glyph name */
    glyph: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
