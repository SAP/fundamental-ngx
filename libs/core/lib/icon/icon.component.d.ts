import { ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 * ```
 */
export declare class IconComponent extends AbstractFdNgxClass {
    private elementRef;
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    glyph: any;
    /**
     * The size of the icon
     * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
     * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
     */
    size: string;
    /** @hidden */
    _setProperties(): void;
    /** @hidden */
    constructor(elementRef: ElementRef);
}
