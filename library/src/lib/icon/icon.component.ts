import { Directive, Input, ElementRef, Inject, AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/** 
 * @hidden
 * The base class for the icon component 
 */
const BASE_ICON_CLASS = 'sap-icon';

/** 
 * @hidden
 * Prefix for icon prop classes 
 */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';

/**
 * The Component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 // * ```
 // * Or
 // * ```html
 // * <fd-icon [size]="'l'">cart-approval</fd-icon>
 // * ```
 */
@Component({
    // TODO to be discussed
    // tslint:disable-next-line:directive-selector
    selector: 'fd-icon',
    template: ``,
    host: {
        role: 'presentation'
    }
})
export class IconComponent extends AbstractFdNgxClass {

    /** The glyph name */
    @Input() glyph;

    /** 
     * The size of the icon
     * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
     * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
     */
    @Input() size: string = '';

    /** @hidden */
    _setProperties() {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }

        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
