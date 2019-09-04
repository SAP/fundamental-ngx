import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';

/**
 * Product tile is used to display product information.
 * ```html
 * <fd-product-tile>
 *     <fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 *     </fd-product-tile-media>
 *     <fd-product-tile-content>
 *         <h2 fd-product-tile-title>Default Product Tile</h2>
 *     </fd-product-tile-content>
 * </fd-product-tile>
 * ```
 */
@Component({
    selector: 'fd-product-tile',
    host: {
        '[attr.role]': '(this.isButton === true ? "button" : "")',
        '[class.fd-product-tile-custom]': 'true'
    },
    templateUrl: './product-tile.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .fd-product-tile-custom {
            display: block;
        }
    `]
})
export class ProductTileComponent extends AbstractFdNgxClass {
    /** Whether the product tile is disabled. */
    @Input() disabled: boolean = false;

    /** Whether the product tile is rendered as a button. */
    @Input() isButton: boolean = false;

    /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        super(elementRef);
    }
}
